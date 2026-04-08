"use client";

import { createContext, startTransition, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
  isPremium: boolean;
  loading: boolean;
  notificationsEnabled: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  setNotificationsEnabled: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfileState(userId: string) {
  const { isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return { isPremium: false, notificationsEnabled: false };
  }

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("is_premium, notifications_enabled")
      .eq("id", userId)
      .single();

    return {
      isPremium: Boolean(data?.is_premium),
      notificationsEnabled: Boolean(data?.notifications_enabled),
    };
  } catch {
    return { isPremium: false, notificationsEnabled: false };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const refreshProfile = async () => {
    if (!user) {
      setIsPremium(false);
      setNotificationsEnabled(false);
      return;
    }

    const state = await fetchProfileState(user.id);
    setIsPremium(state.isPremium);
    setNotificationsEnabled(state.notificationsEnabled);
  };

  const updateNotificationPreference = (value: boolean) => {
    setNotificationsEnabled(value);

    const { isConfigured } = getSupabaseConfig();

    if (!isConfigured || !user) {
      return;
    }

    const supabase = createClient();
    void (async () => {
      const result = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          notifications_enabled: value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (result.error) {
        setNotificationsEnabled((previous) => !previous);
      }
    })();
  };

  useEffect(() => {
    const { isConfigured } = getSupabaseConfig();

    if (!isConfigured) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    void (async () => {
      const sessionResult = await supabase.auth.getSession();
      const nextSession = sessionResult.data.session;
      const nextUser = nextSession?.user ?? null;

      setSession(nextSession);
      setUser(nextUser);

      if (nextUser) {
        const state = await fetchProfileState(nextUser.id);
        setIsPremium(state.isPremium);
        setNotificationsEnabled(state.notificationsEnabled);
      }

      setLoading(false);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, nextSession: Session | null) => {
      startTransition(() => {
        setSession(nextSession);
        setUser(nextSession?.user ?? null);
      });

      if (nextSession?.user) {
        void fetchProfileState(nextSession.user.id).then((state) => {
          setIsPremium(state.isPremium);
          setNotificationsEnabled(state.notificationsEnabled);
          setLoading(false);
        });
      } else {
        setIsPremium(false);
        setNotificationsEnabled(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    isLoggedIn: Boolean(user),
    isPremium,
    loading,
    notificationsEnabled,
    refreshProfile,
    signOut: async () => {
      const { isConfigured } = getSupabaseConfig();

      if (!isConfigured) {
        return;
      }

      const supabase = createClient();
      await supabase.auth.signOut();
    },
    setNotificationsEnabled: updateNotificationPreference,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Mail, UserRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { syncProfileToSupabase } from "@/lib/supabase/profileSync";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserProfileStore } from "@/stores/userProfileStore";

interface AuthCardProps {
  mode: "login" | "signup";
}

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const profile = useUserProfileStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isConfigured = getSupabaseConfig().isConfigured;

  const handleSuccess = async () => {
    if (profile.wizardCompleted) {
      await syncProfileToSupabase(profile);
      router.push("/profile");
      router.refresh();
      return;
    }

    router.push("/wizard");
    router.refresh();
  };

  const handleEmailAuth = async () => {
    if (!isConfigured) {
      setError("Supabase auth is not configured yet. Add env keys to activate login.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();

      const result =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({ email, password });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      await handleSuccess();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (!isConfigured) {
      setError("Supabase auth is not configured yet. Add env keys to activate Google login.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });

      if (googleError) {
        setError(googleError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full rounded-[2rem] border-border/80 bg-card/94 shadow-[0_24px_70px_rgba(45,52,54,0.1)]">
      <CardHeader className="space-y-3">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </p>
        <CardTitle className="text-4xl">
          {mode === "login" ? "Log in and keep your move in sync." : "Save your relocation progress."}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`${mode}-email`}>Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={`${mode}-email`}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-2xl pl-11"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-password`}>Password</Label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={`${mode}-password`}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-2xl pl-11"
            />
          </div>
        </div>

        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

        <Button
          type="button"
          size="lg"
          onClick={() => {
            void handleEmailAuth();
          }}
          disabled={loading}
          className="h-12 w-full rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
        >
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {mode === "login" ? "Log in" : "Create account"}
        </Button>

        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => {
            void handleGoogle();
          }}
          disabled={loading}
          className="h-12 w-full rounded-2xl"
        >
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}

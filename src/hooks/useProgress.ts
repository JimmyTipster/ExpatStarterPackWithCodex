"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { useAuth } from "@/hooks/useAuth";

const STORAGE_KEY = "expat-starter-pack-progress";

export interface TaskProgressMap {
  [taskId: string]: boolean;
}

interface ProgressRow {
  task_id: string;
  completed: boolean | null;
}

function readLocalProgress(countrySlug: string): TaskProgressMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const data = raw ? (JSON.parse(raw) as Record<string, TaskProgressMap>) : {};
    return data[countrySlug] ?? {};
  } catch {
    return {};
  }
}

function writeLocalProgress(countrySlug: string, progress: TaskProgressMap) {
  if (typeof window === "undefined") {
    return;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const data = raw ? (JSON.parse(raw) as Record<string, TaskProgressMap>) : {};
  data[countrySlug] = progress;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress(countrySlug: string) {
  const { user, isLoggedIn } = useAuth();
  const [progress, setProgress] = useState<TaskProgressMap>({});
  const [loading, setLoading] = useState(true);
  const [requiresLogin, setRequiresLogin] = useState(false);

  useEffect(() => {
    setProgress(readLocalProgress(countrySlug));
    setLoading(false);
  }, [countrySlug]);

  useEffect(() => {
    const { isConfigured } = getSupabaseConfig();

    if (!isLoggedIn || !user || !isConfigured) {
      return;
    }

    const supabase = createClient();

    void (async () => {
      const result = await supabase
        .from("user_progress")
        .select("task_id, completed")
        .eq("user_id", user.id)
        .eq("country_slug", countrySlug);

      if (!result.data) {
        return;
      }

      const mapped = Object.fromEntries(
        (result.data as ProgressRow[]).map((entry: ProgressRow) => [
          entry.task_id,
          Boolean(entry.completed),
        ]),
      );
      setProgress(mapped);
      writeLocalProgress(countrySlug, mapped);
    })();
  }, [countrySlug, isLoggedIn, user]);

  const fetchProgress = async () => {
    setProgress(readLocalProgress(countrySlug));
  };

  const toggleTask = async (taskId: string) => {
    const nextValue = !progress[taskId];
    const nextProgress = {
      ...progress,
      [taskId]: nextValue,
    };

    setProgress(nextProgress);
    writeLocalProgress(countrySlug, nextProgress);

    const { isConfigured } = getSupabaseConfig();

    if (!isLoggedIn || !user || !isConfigured) {
      setRequiresLogin(true);
      return;
    }

    const supabase = createClient();
    await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        country_slug: countrySlug,
        task_id: taskId,
        completed: nextValue,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,country_slug,task_id" },
    );
  };

  const getCompletionPercentage = (taskIds: string[]) => {
    if (!taskIds.length) {
      return 0;
    }

    const completed = taskIds.filter((taskId) => progress[taskId]).length;
    return Math.round((completed / taskIds.length) * 100);
  };

  return {
    progress,
    loading,
    requiresLogin,
    setRequiresLogin,
    fetchProgress,
    toggleTask,
    getCompletionPercentage,
  };
}

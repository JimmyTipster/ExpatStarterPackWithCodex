"use client";

import { useAuth } from "@/hooks/useAuth";

export function usePremium() {
  const { isPremium, isLoggedIn, loading } = useAuth();

  return {
    isPremium,
    isLoggedIn,
    loading,
  };
}

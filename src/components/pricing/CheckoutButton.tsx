"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function CheckoutButton() {
  const { isPremium, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout right now.");
        return;
      }

      window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        onClick={() => {
          void handleCheckout();
        }}
        disabled={loading || isPremium}
        className="w-full rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
      >
        {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {isPremium ? "Premium already unlocked" : isLoggedIn ? "Unlock premium for $2" : "Log in and unlock premium"}
      </Button>
      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
    </div>
  );
}

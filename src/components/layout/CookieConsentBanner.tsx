"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "expat-starter-pack-cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    setVisible(saved !== "accepted");
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }

    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-24 left-4 z-50 md:right-6 md:bottom-6 md:left-auto md:max-w-md">
      <div className="rounded-[1.6rem] border border-border/80 bg-card/96 p-5 shadow-[0_24px_60px_rgba(45,52,54,0.16)] backdrop-blur">
        <p className="font-semibold text-foreground">We use essential browser storage.</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Expat Starter Pack stores your wizard answers, theme, and on-device progress so the app
          works properly and remembers your move.
        </p>
        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            onClick={accept}
            className="rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
          >
            Accept
          </Button>
          <Button type="button" variant="outline" className="rounded-full" onClick={accept}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}

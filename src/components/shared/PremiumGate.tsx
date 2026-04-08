"use client";

import Link from "next/link";
import { Lock, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePremium } from "@/hooks/usePremium";

interface PremiumGateProps {
  children: React.ReactNode;
  title: string;
  points: string[];
}

export function PremiumGate({ children, title, points }: PremiumGateProps) {
  const { isPremium } = usePremium();
  const isMobileApp = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

  return (
    <div className="relative">
      <div className={isPremium ? "" : "pointer-events-none blur-[8px] select-none"}>{children}</div>
      {isPremium ? null : (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-[1.75rem] border border-border/80 bg-card/96 p-6 text-center shadow-[0_24px_60px_rgba(45,52,54,0.16)]">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--premium)]/15 text-[color:var(--premium)]">
              {isMobileApp ? <Smartphone className="size-6" /> : <Lock className="size-6" />}
            </div>
            <h3 className="mt-4 font-heading text-2xl text-foreground">{title}</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {points.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-2xl bg-[var(--accent)] px-6 text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
            >
              <Link href={isMobileApp ? "/pricing" : "/pricing"}>
                {isMobileApp ? "Visit expatstarterpack.com/pricing to unlock" : "Unlock premium"}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

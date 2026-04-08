"use client";

import Link from "next/link";
import { Pencil, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { useUserProfileStore } from "@/stores/userProfileStore";

interface ProfileBannerProps {
  countrySlug: string;
}

export function ProfileBanner({ countrySlug }: ProfileBannerProps) {
  const profile = useUserProfileStore();
  const matchesCountry = profile.destinationCountry === countrySlug;
  const hasProfile = profile.wizardCompleted && matchesCountry;

  if (!hasProfile) {
    return (
      <div className="rounded-[1.75rem] border border-primary/10 bg-primary/6 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Personalize your checklist</p>
            <p className="text-sm leading-7 text-muted-foreground">
              Take the quiz so this country page can adapt to your arrival date, visa situation,
              family setup, and work plans.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-[var(--accent)] px-5 text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
          >
            <Link href="/wizard">
              Take the quiz
              <Sparkles className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const familyLabel =
    profile.numberOfChildren > 0
      ? `${profile.situation} (${profile.numberOfChildren} kid${profile.numberOfChildren > 1 ? "s" : ""}, ages ${profile.childrenAges.filter((age) => age >= 0).join(", ")})`
      : profile.situation;

  return (
    <div className="rounded-[1.75rem] border border-border/80 bg-background/86 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-primary">
            <FlagIcon code={profile.nationality || "DE"} />
            {profile.nationality || "Nationality"}
          </span>
          <span className="rounded-full bg-secondary/70 px-3 py-1.5">{familyLabel}</span>
          <span className="rounded-full bg-secondary/70 px-3 py-1.5">
            {profile.employmentSituation}
          </span>
          {profile.hasDriversLicense ? (
            <span className="rounded-full bg-secondary/70 px-3 py-1.5">Has car/driver needs</span>
          ) : null}
          {profile.hasPet ? (
            <span className="rounded-full bg-secondary/70 px-3 py-1.5">
              Has {profile.petType || "pet"}
            </span>
          ) : null}
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/wizard">
            Edit profile
            <Pencil className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

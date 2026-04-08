"use client";

import Link from "next/link";
import { Bell, Gem, LogOut, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfileStore } from "@/stores/userProfileStore";
import { ProgressRing } from "@/components/shared/ProgressRing";

function readStoredProgressSummary(destinationCountry: string) {
  if (typeof window === "undefined" || !destinationCountry) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  try {
    const raw = window.localStorage.getItem("expat-starter-pack-progress");
    const data = raw ? (JSON.parse(raw) as Record<string, Record<string, boolean>>) : {};
    const countryProgress = data[destinationCountry] ?? {};
    const total = Object.keys(countryProgress).length;
    const completed = Object.values(countryProgress).filter(Boolean).length;
    const percentage = total ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  } catch {
    return { completed: 0, total: 0, percentage: 0 };
  }
}

export default function ProfilePage() {
  const profile = useUserProfileStore();
  const { user, isLoggedIn, isPremium, notificationsEnabled, setNotificationsEnabled, signOut } =
    useAuth();
  const summary = readStoredProgressSummary(profile.destinationCountry);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-border/80 bg-card/94">
          <CardHeader className="space-y-3">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">Profile</p>
            <CardTitle className="text-4xl">
              {isLoggedIn ? user?.email ?? "Signed in" : "Guest profile"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Destination:{" "}
              <span className="font-semibold text-foreground">
                {profile.destinationCountry || "No destination selected yet"}
              </span>
            </p>
            <p>
              Situation: <span className="font-semibold text-foreground">{profile.situation}</span>
            </p>
            <p>
              Work:{" "}
              <span className="font-semibold text-foreground">
                {profile.employmentSituation}
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/wizard">Edit profile</Link>
              </Button>
              {!isLoggedIn ? (
                <Button asChild className="rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]">
                  <Link href="/signup">Create account</Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    void signOut();
                  }}
                  className="rounded-full"
                >
                  <LogOut className="size-4" />
                  Log out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/80 bg-card/94">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl">Progress and premium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-[1.4rem] bg-background/85 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Checklist progress</p>
                <p className="mt-1 font-semibold text-foreground">
                  {summary.completed} completed of {summary.total || "current"} tracked tasks
                </p>
              </div>
              <ProgressRing value={summary.percentage} />
            </div>
            <div className="flex items-center justify-between rounded-[1.4rem] bg-background/85 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Premium access</p>
                <p className="mt-1 font-semibold text-foreground">
                  {isPremium ? "Unlocked" : "Free plan"}
                </p>
              </div>
              <Gem className={`size-6 ${isPremium ? "text-[color:var(--premium)]" : "text-muted-foreground"}`} />
            </div>
            <div className="flex items-center justify-between rounded-[1.4rem] bg-background/85 p-4">
              <div>
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="mt-1 font-semibold text-foreground">
                  {notificationsEnabled ? "Enabled" : "Off"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Bell className="size-4 text-primary" />
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
            </div>
            {!isPremium ? (
              <Button asChild className="w-full rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]">
                <Link href="/pricing">
                  Unlock premium
                  <Sparkles className="size-4" />
                </Link>
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CircleUserRound, ListChecks, Printer } from "lucide-react";

import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";
import { TaskCard } from "@/components/country/TaskCard";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { useUserProfileStore } from "@/stores/userProfileStore";

export function ChecklistSection({ country }: { country: Country }) {
  const { tasks, profile } = useChecklist(country);
  const { progress, toggleTask, getCompletionPercentage, requiresLogin, setRequiresLogin } =
    useProgress(country.slug);
  const storedDestination = useUserProfileStore((state) => state.destinationCountry);
  const isPersonalized = profile.wizardCompleted && storedDestination === country.slug;

  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const completion = getCompletionPercentage(taskIds);

  return (
    <CountrySectionShell
      id="checklist"
      title="Personalized checklist"
      description="This list responds to your move profile, so family, driver, study, pet, and EU-status tasks only appear when they matter."
    >
      <div className="mb-6 flex flex-col gap-4 rounded-[1.6rem] bg-background/85 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            {isPersonalized
              ? `Checklist tailored for your ${country.name} move`
              : "A generic checklist is visible until you complete the wizard"}
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            {isPersonalized
              ? "Your progress can be tracked now, and completed tasks will roll into your profile dashboard."
              : "Take the quiz to tighten this list around your exact situation and destination."}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressRing value={completion} />
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => window.print()}
          >
            <Printer className="size-4" />
            Print
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/wizard">Edit answers</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            countryName={country.name}
            task={task}
            arrivalDate={profile.arrivalDate}
            completed={Boolean(progress[task.id])}
            onToggle={() => {
              void toggleTask(task.id);
            }}
          />
        ))}
      </div>

      <Dialog open={requiresLogin} onOpenChange={setRequiresLogin}>
        <DialogContent className="rounded-[1.75rem] border-border/80">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CircleUserRound className="size-5 text-primary" />
              Log in to sync progress
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm leading-7 text-muted-foreground">
            We still saved your latest checkbox state locally on this device, but account sync needs a
            login so your progress can follow you across sessions.
          </p>
          <Button
            asChild
            className="mt-2 rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
          >
            <Link href="/login">
              Continue to login
              <ListChecks className="size-4" />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </CountrySectionShell>
  );
}

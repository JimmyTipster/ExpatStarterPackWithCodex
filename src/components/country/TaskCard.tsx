"use client";

import { useMemo } from "react";
import { Gem, Lock, MapPin, ShieldAlert } from "lucide-react";

import type { ChecklistTask } from "@/data/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { DeadlineBadge } from "@/components/shared/DeadlineBadge";
import { ReportOutdatedButton } from "@/components/shared/ReportOutdatedButton";
import { calculateDeadline } from "@/lib/utils/dates";
import { usePremium } from "@/hooks/usePremium";

interface TaskCardProps {
  countryName: string;
  task: ChecklistTask;
  arrivalDate: string;
  completed: boolean;
  onToggle: () => void;
}

export function TaskCard({ countryName, task, arrivalDate, completed, onToggle }: TaskCardProps) {
  const { isPremium } = usePremium();
  const deadline = useMemo(() => {
    if (!task.deadlineDays) {
      return null;
    }

    return calculateDeadline(arrivalDate, task.deadlineDays);
  }, [arrivalDate, task.deadlineDays]);

  return (
    <Card
      className={`rounded-[1.6rem] border-border/70 bg-background/90 transition-all ${
        completed ? "border-[var(--success)]/40 bg-[var(--success)]/5 shadow-[0_0_0_1px_rgba(107,144,128,0.12)]" : ""
      }`}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={task.category} />
              <DeadlineBadge deadline={deadline} />
              {task.isPremium ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--premium)]/12 px-3 py-1 text-xs font-semibold text-[color:var(--premium)]">
                  <Gem className="size-3.5" />
                  Premium
                </span>
              ) : null}
            </div>
            <CardTitle className="text-xl text-foreground">{task.title}</CardTitle>
          </div>
          <Checkbox
            checked={completed}
            onCheckedChange={onToggle}
            className="mt-1 size-5 rounded-md"
            aria-label={`Mark ${task.title} as completed`}
          />
        </div>
        <p className="text-sm leading-7 text-muted-foreground">{task.description}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        {task.whereToGo ? (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>{task.whereToGo}</p>
          </div>
        ) : null}
        {task.documentsNeeded.length ? (
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Documents needed</p>
            <div className="flex flex-wrap gap-2">
              {task.documentsNeeded.map((document) => (
                <span
                  key={document}
                  className="rounded-full bg-secondary/70 px-3 py-1 text-xs text-foreground"
                >
                  {document}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          {task.estimatedTime ? (
            <div className="rounded-[1.1rem] bg-card p-3">
              <p className="text-xs uppercase tracking-[0.18em]">Estimated time</p>
              <p className="mt-1 font-medium text-foreground">{task.estimatedTime}</p>
            </div>
          ) : null}
          {task.estimatedCost ? (
            <div className="rounded-[1.1rem] bg-card p-3">
              <p className="text-xs uppercase tracking-[0.18em]">Estimated cost</p>
              <p className="mt-1 font-medium text-foreground">{task.estimatedCost}</p>
            </div>
          ) : null}
        </div>
        {task.riskIfMissed ? (
          <div className="flex items-start gap-2 rounded-[1.2rem] bg-[var(--danger)]/8 p-3 text-[var(--danger)]">
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            <p>{task.riskIfMissed}</p>
          </div>
        ) : null}
        {task.isPremium && !isPremium ? (
          <div className="flex items-center gap-2 text-[color:var(--premium)]">
            <Lock className="size-4" />
            <p>Premium task details stay visible, but completion guidance unlocks with premium.</p>
          </div>
        ) : null}
        <div className="flex justify-end">
          <ReportOutdatedButton countryName={countryName} taskTitle={task.title} />
        </div>
      </CardContent>
    </Card>
  );
}

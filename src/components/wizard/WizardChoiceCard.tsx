import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface WizardChoiceCardProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
}

export function WizardChoiceCard({
  label,
  description,
  selected,
  onClick,
  icon: Icon,
}: WizardChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-14 w-full items-start gap-4 rounded-[1.5rem] border px-4 py-4 text-left transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40",
        selected
          ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,white)] shadow-[0_16px_32px_rgba(200,75,49,0.12)]"
          : "border-border/80 bg-background/90 hover:border-primary/30 hover:bg-secondary/40",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border",
          selected
            ? "border-[var(--accent)]/20 bg-[var(--accent)]/12 text-[var(--accent)]"
            : "border-border/80 bg-card text-primary",
        )}
      >
        {Icon ? <Icon className="size-5" /> : <CheckCircle2 className="size-5" />}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-base font-semibold text-foreground">{label}</p>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div
        className={cn(
          "mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
          selected
            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)]"
            : "border-border/80 bg-card text-transparent",
        )}
      >
        <CheckCircle2 className="size-4" />
      </div>
    </button>
  );
}

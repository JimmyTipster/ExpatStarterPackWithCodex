import {
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  House,
  Landmark,
  PawPrint,
  ShieldCheck,
  TramFront,
  Users,
  WalletCards,
} from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const priorityOptions = [
  {
    id: "registration",
    label: "Registration and paperwork",
    description: "The first legal steps, appointments, and documents that unlock everything else.",
    icon: Landmark,
  },
  {
    id: "housing",
    label: "Housing setup",
    description: "Renting, utilities, home internet, and getting comfortably settled.",
    icon: House,
  },
  {
    id: "health",
    label: "Healthcare",
    description: "Insurance, doctors, and the practical health system basics.",
    icon: HeartPulse,
  },
  {
    id: "job-search",
    label: "Finding work",
    description: "Job boards, CV expectations, and public employment support.",
    icon: BriefcaseBusiness,
  },
  {
    id: "taxes",
    label: "Taxes and money",
    description: "Banking, payroll, tax IDs, and self-employment admin.",
    icon: WalletCards,
  },
  {
    id: "education",
    label: "Schools and study",
    description: "Childcare, school enrollment, university admin, and language courses.",
    icon: GraduationCap,
  },
  {
    id: "transport",
    label: "Transport and driving",
    description: "Transit passes, local driving rules, and license conversion.",
    icon: TramFront,
  },
  {
    id: "pets",
    label: "Pet relocation",
    description: "Import checks, vets, dog tax, and pet paperwork.",
    icon: PawPrint,
  },
  {
    id: "legal",
    label: "Residency and legal status",
    description: "Permits, visas, citizenship pathways, and staying compliant.",
    icon: ShieldCheck,
  },
  {
    id: "community",
    label: "Community and daily life",
    description: "Making friends, social norms, supermarkets, and everyday routines.",
    icon: Users,
  },
];

interface StepPrioritiesProps {
  priorities: string[];
  onTogglePriority: (priorityId: string) => void;
}

export function StepPriorities({
  priorities,
  onTogglePriority,
}: StepPrioritiesProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
        <p className="text-sm font-semibold text-foreground">Optional</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Pick the areas you care about most. We can use this later for emphasis and reminder tone,
          but you can also skip this step and still get a full checklist.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {priorityOptions.map((priority) => {
          const isSelected = priorities.includes(priority.id);
          const Icon = priority.icon;

          return (
            <button
              key={priority.id}
              type="button"
              onClick={() => onTogglePriority(priority.id)}
              className={cn(
                "flex min-h-14 items-start gap-4 rounded-[1.5rem] border px-4 py-4 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40",
                isSelected
                  ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_8%,white)]"
                  : "border-border/80 bg-background/90 hover:border-primary/30 hover:bg-secondary/45",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border",
                  isSelected
                    ? "border-[var(--accent)]/20 bg-[var(--accent)]/12 text-[var(--accent)]"
                    : "border-border/80 bg-card text-primary",
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-base font-semibold text-foreground">{priority.label}</p>
                <p className="text-sm leading-6 text-muted-foreground">{priority.description}</p>
              </div>
              <Checkbox
                checked={isSelected}
                className="mt-1 pointer-events-none size-5 rounded-md"
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

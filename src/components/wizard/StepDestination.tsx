import { CalendarDays, MapPinned, PlaneLanding } from "lucide-react";

import { CountrySearchField } from "@/components/wizard/CountrySearchField";
import { WizardChoiceCard } from "@/components/wizard/WizardChoiceCard";
import type { WizardCountryOption } from "@/components/wizard/types";
import { Input } from "@/components/ui/input";

interface StepDestinationProps {
  countries: WizardCountryOption[];
  destinationCountry: string;
  arrivalDate: string;
  hasArrived: boolean;
  onDestinationChange: (slug: string) => void;
  onArrivalDateChange: (value: string) => void;
  onHasArrivedChange: (value: boolean) => void;
}

export function StepDestination({
  countries,
  destinationCountry,
  arrivalDate,
  hasArrived,
  onDestinationChange,
  onArrivalDateChange,
  onHasArrivedChange,
}: StepDestinationProps) {
  const selectedCountry =
    countries.find((country) => country.slug === destinationCountry) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
      <div className="space-y-6">
        <CountrySearchField
          label="Where are you moving?"
          description="Pick a destination we already support so we can build the right local checklist for you."
          placeholder="Search by country name or code"
          emptyState="No supported destination matches that search yet."
          countries={countries}
          selectedValue={destinationCountry}
          valueKey="slug"
          onSelect={(country) => {
            if (country.slug) {
              onDestinationChange(country.slug);
            }
          }}
        />

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">
            {hasArrived ? "When did you arrive?" : "When are you planning to arrive?"}
          </label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="date"
              value={arrivalDate}
              onChange={(event) => onArrivalDateChange(event.target.value)}
              className="h-14 rounded-2xl border-border/80 bg-background pl-11 text-base"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Have you already arrived?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <WizardChoiceCard
              label="Yes, I am already there"
              description="We will phrase deadlines around tasks you should do now."
              selected={hasArrived}
              onClick={() => onHasArrivedChange(true)}
              icon={PlaneLanding}
            />
            <WizardChoiceCard
              label="Not yet"
              description="We will keep this checklist future-facing while you prepare."
              selected={!hasArrived}
              onClick={() => onHasArrivedChange(false)}
              icon={MapPinned}
            />
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-border/80 bg-background/85 p-6 shadow-[0_18px_36px_rgba(45,52,54,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Preview
        </p>
        <div className="mt-4 space-y-4">
          <div className="rounded-[1.35rem] bg-secondary/55 p-5">
            <p className="text-sm text-muted-foreground">Destination</p>
            <p className="mt-2 text-xl font-semibold text-foreground">
              {selectedCountry ? `${selectedCountry.flagEmoji} ${selectedCountry.name}` : "Choose a country"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {selectedCountry
                ? `Capital: ${selectedCountry.capital ?? "Available in the guide"}`
                : "Phase 3 connects the wizard directly to the countries we already support."}
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-card p-5">
            <p className="text-sm text-muted-foreground">Timeline</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {arrivalDate || "Pick your move date"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {hasArrived
                ? "We will prioritize things you should tackle immediately after arrival."
                : "We will line up the first admin steps around your planned move."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

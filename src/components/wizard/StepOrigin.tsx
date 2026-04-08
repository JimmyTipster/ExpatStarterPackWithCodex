import { BadgeCheck, Globe2, Landmark, ShieldCheck } from "lucide-react";

import { CountrySearchField } from "@/components/wizard/CountrySearchField";
import { WizardChoiceCard } from "@/components/wizard/WizardChoiceCard";
import type { WizardCountryOption } from "@/components/wizard/types";

interface StepOriginProps {
  countries: WizardCountryOption[];
  homeCountry: string;
  nationality: string;
  hasDualCitizenship: boolean;
  secondNationality?: string;
  isEuCitizen: boolean;
  onHomeCountryChange: (isoCode: string) => void;
  onNationalityChange: (isoCode: string) => void;
  onDualCitizenshipChange: (value: boolean) => void;
  onSecondNationalityChange: (isoCode: string) => void;
}

export function StepOrigin({
  countries,
  homeCountry,
  nationality,
  hasDualCitizenship,
  secondNationality,
  isEuCitizen,
  onHomeCountryChange,
  onNationalityChange,
  onDualCitizenshipChange,
  onSecondNationalityChange,
}: StepOriginProps) {
  const nationalityCountry =
    countries.find((country) => country.isoCode === nationality) ?? null;
  const secondNationalityCountry =
    countries.find((country) => country.isoCode === secondNationality) ?? null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
      <div className="space-y-6">
        <CountrySearchField
          label="Which country are you moving from?"
          description="This helps us understand your starting point and some likely paperwork."
          placeholder="Search your current home country"
          emptyState="No country match found."
          countries={countries}
          selectedValue={homeCountry}
          valueKey="isoCode"
          onSelect={(country) => onHomeCountryChange(country.isoCode)}
        />

        <CountrySearchField
          label="What is your nationality?"
          description="We use your passport country to decide EU and non-EU checklist branches."
          placeholder="Search your nationality"
          emptyState="No nationality match found."
          countries={countries}
          selectedValue={nationality}
          valueKey="isoCode"
          onSelect={(country) => onNationalityChange(country.isoCode)}
        />

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Do you hold dual citizenship?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <WizardChoiceCard
              label="Yes"
              description="We will take both passports into account for move rights and paperwork."
              selected={hasDualCitizenship}
              onClick={() => onDualCitizenshipChange(true)}
              icon={ShieldCheck}
            />
            <WizardChoiceCard
              label="No"
              description="We will use your main nationality only."
              selected={!hasDualCitizenship}
              onClick={() => onDualCitizenshipChange(false)}
              icon={Landmark}
            />
          </div>
        </div>

        {hasDualCitizenship ? (
          <CountrySearchField
            label="Second nationality"
            description="Optional in the product overall, but required here once dual citizenship is enabled."
            placeholder="Search your second nationality"
            emptyState="No nationality match found."
            countries={countries}
            selectedValue={secondNationality ?? ""}
            valueKey="isoCode"
            onSelect={(country) => onSecondNationalityChange(country.isoCode)}
          />
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="rounded-[1.75rem] border border-border/80 bg-background/85 p-6 shadow-[0_18px_36px_rgba(45,52,54,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BadgeCheck className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">EU citizen status</p>
              <p className="text-sm text-muted-foreground">
                Calculated live from the nationality you select.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-[1.35rem] bg-secondary/60 p-5">
            <p className="text-3xl font-semibold text-foreground">
              {isEuCitizen ? "Yes" : "No"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {isEuCitizen
                ? "Your current answers indicate EU citizenship, so the wizard can surface free-movement tasks where relevant."
                : "We will keep non-EU paperwork visible so you do not miss permit or visa-related steps."}
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border/80 bg-card p-6">
          <div className="flex items-center gap-3">
            <Globe2 className="size-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">Current passport snapshot</p>
          </div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Primary:{" "}
              <span className="font-semibold text-foreground">
                {nationalityCountry
                  ? `${nationalityCountry.flagEmoji} ${nationalityCountry.name}`
                  : "Choose your nationality"}
              </span>
            </p>
            {hasDualCitizenship ? (
              <p>
                Second:{" "}
                <span className="font-semibold text-foreground">
                  {secondNationalityCountry
                    ? `${secondNationalityCountry.flagEmoji} ${secondNationalityCountry.name}`
                    : "Choose the second nationality"}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

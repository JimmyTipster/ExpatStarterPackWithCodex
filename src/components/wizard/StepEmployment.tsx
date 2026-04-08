import {
  BriefcaseBusiness,
  CarFront,
  Dog,
  Laptop2,
  SearchCheck,
  Store,
  UserRoundMinus,
} from "lucide-react";

import { CountrySearchField } from "@/components/wizard/CountrySearchField";
import { WizardChoiceCard } from "@/components/wizard/WizardChoiceCard";
import type { WizardCountryOption } from "@/components/wizard/types";
import type { EmploymentType, PetType } from "@/stores/userProfileStore";

interface StepEmploymentProps {
  countries: WizardCountryOption[];
  employmentSituation: EmploymentType;
  hasDriversLicense: boolean;
  driverLicenseCountry?: string;
  hasPet: boolean;
  petType?: PetType;
  onEmploymentSituationChange: (value: EmploymentType) => void;
  onHasDriversLicenseChange: (value: boolean) => void;
  onDriverLicenseCountryChange: (value: string) => void;
  onHasPetChange: (value: boolean) => void;
  onPetTypeChange: (value: PetType) => void;
}

const employmentOptions = [
  {
    value: "employed" as const,
    label: "Employed locally",
    description: "You already have, or expect to have, a regular job in the new country.",
    icon: BriefcaseBusiness,
  },
  {
    value: "remote-worker" as const,
    label: "Remote worker",
    description: "You are working from abroad for an employer outside your new country.",
    icon: Laptop2,
  },
  {
    value: "freelancer" as const,
    label: "Freelancer",
    description: "You will invoice clients directly as a solo self-employed professional.",
    icon: Store,
  },
  {
    value: "starting-business" as const,
    label: "Starting a business",
    description: "You plan to set up a company or commercial activity after moving.",
    icon: Store,
  },
  {
    value: "job-seeker" as const,
    label: "Looking for work",
    description: "You are moving first and planning to find a job after arrival.",
    icon: SearchCheck,
  },
  {
    value: "student" as const,
    label: "Student work profile",
    description: "Your move is centered on study and the light admin that comes with it.",
    icon: Laptop2,
  },
  {
    value: "retired" as const,
    label: "Retired",
    description: "You are not moving for work and want retirement-specific admin only.",
    icon: UserRoundMinus,
  },
  {
    value: "not-working" as const,
    label: "Not working",
    description: "You are not working right now and want the checklist to reflect that.",
    icon: UserRoundMinus,
  },
];

const petTypeOptions = [
  {
    value: "dog" as const,
    label: "Dog",
    description: "Show dog tax, liability insurance, and dog-specific admin tasks.",
    icon: Dog,
  },
  {
    value: "cat" as const,
    label: "Cat",
    description: "Keep pet import and veterinary admin without dog-only extras.",
    icon: Dog,
  },
  {
    value: "other" as const,
    label: "Other pet",
    description: "Show general pet relocation guidance and local vet setup tasks.",
    icon: Dog,
  },
];

export function StepEmployment({
  countries,
  employmentSituation,
  hasDriversLicense,
  driverLicenseCountry,
  hasPet,
  petType,
  onEmploymentSituationChange,
  onHasDriversLicenseChange,
  onDriverLicenseCountryChange,
  onHasPetChange,
  onPetTypeChange,
}: StepEmploymentProps) {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm font-semibold text-foreground">What is your work situation?</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {employmentOptions.map((option) => (
            <WizardChoiceCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={employmentSituation === option.value}
              onClick={() => onEmploymentSituationChange(option.value)}
              icon={option.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-5 rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Do you have a driver&apos;s license?</p>
          <p className="text-sm leading-6 text-muted-foreground">
            License conversion rules can change your first few months abroad.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <WizardChoiceCard
            label="Yes"
            description="Include license conversion, car registration, and driving-specific steps."
            selected={hasDriversLicense}
            onClick={() => onHasDriversLicenseChange(true)}
            icon={CarFront}
          />
          <WizardChoiceCard
            label="No"
            description="Keep transport advice focused on public transit and walking."
            selected={!hasDriversLicense}
            onClick={() => onHasDriversLicenseChange(false)}
            icon={CarFront}
          />
        </div>
        {hasDriversLicense ? (
          <CountrySearchField
            label="Which country issued your license?"
            description="Some conversion rules depend on where the license was originally issued."
            placeholder="Search issuing country"
            emptyState="No country match found."
            countries={countries}
            selectedValue={driverLicenseCountry ?? ""}
            valueKey="isoCode"
            onSelect={(country) => onDriverLicenseCountryChange(country.isoCode)}
          />
        ) : null}
      </section>

      <section className="space-y-5 rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Are you bringing a pet?</p>
          <p className="text-sm leading-6 text-muted-foreground">
            This adds pet import, vet, and local registration tasks when relevant.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <WizardChoiceCard
            label="Yes"
            description="Show pet relocation and local setup tasks."
            selected={hasPet}
            onClick={() => onHasPetChange(true)}
            icon={Dog}
          />
          <WizardChoiceCard
            label="No"
            description="Keep the checklist free of pet-related admin."
            selected={!hasPet}
            onClick={() => onHasPetChange(false)}
            icon={Dog}
          />
        </div>
        {hasPet ? (
          <div className="grid gap-3 lg:grid-cols-3">
            {petTypeOptions.map((option) => (
              <WizardChoiceCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={petType === option.value}
                onClick={() => onPetTypeChange(option.value)}
                icon={option.icon}
              />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

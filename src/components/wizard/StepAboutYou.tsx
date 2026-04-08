import {
  Baby,
  BookOpenCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  Leaf,
  Users,
} from "lucide-react";

import { WizardChoiceCard } from "@/components/wizard/WizardChoiceCard";
import { Input } from "@/components/ui/input";
import type {
  PensionType,
  SchoolPreference,
  UserSituation,
} from "@/stores/userProfileStore";

interface StepAboutYouProps {
  situation: UserSituation;
  numberOfChildren: number;
  childrenAges: number[];
  schoolPreference: SchoolPreference;
  hasPension: boolean;
  pensionType?: PensionType;
  isUniversityStudent: boolean;
  onSituationChange: (value: UserSituation) => void;
  onNumberOfChildrenChange: (value: number) => void;
  onChildAgeChange: (index: number, value: number | undefined) => void;
  onSchoolPreferenceChange: (value: SchoolPreference) => void;
  onHasPensionChange: (value: boolean) => void;
  onPensionTypeChange: (value: PensionType) => void;
  onUniversityStudentChange: (value: boolean) => void;
}

const situationOptions = [
  {
    value: "single" as const,
    label: "Just me",
    description: "You are moving on your own and want a checklist built for one adult.",
    icon: Leaf,
  },
  {
    value: "couple" as const,
    label: "Couple",
    description: "You are moving with a partner and need the main admin essentials.",
    icon: HeartHandshake,
  },
  {
    value: "family" as const,
    label: "Family",
    description: "You are moving with children and need childcare or school planning.",
    icon: Users,
  },
  {
    value: "single-parent" as const,
    label: "Single parent",
    description: "You are handling the move and the family admin yourself.",
    icon: Home,
  },
  {
    value: "pensioner" as const,
    label: "Pensioner",
    description: "You want us to keep pensions, tax treaties, and healthcare visible.",
    icon: BookOpenCheck,
  },
  {
    value: "student" as const,
    label: "Student",
    description: "We will prioritize enrollment, campus transport, and student insurance.",
    icon: GraduationCap,
  },
  {
    value: "minor" as const,
    label: "Minor",
    description: "A guardian is likely managing the move, but school and residency still matter.",
    icon: Baby,
  },
];

const schoolPreferenceOptions = [
  {
    value: "local" as const,
    label: "Local school system",
    description: "Public local-language schools or standard local daycare options.",
  },
  {
    value: "international" as const,
    label: "International options",
    description: "IB, British, American, bilingual, or other expat-oriented schools.",
  },
  {
    value: "undecided" as const,
    label: "Still deciding",
    description: "Keep both local and international education steps visible for now.",
  },
];

const pensionOptions = [
  {
    value: "state" as const,
    label: "State pension",
    description: "Government pension, social security pension, or a public retirement scheme.",
  },
  {
    value: "private" as const,
    label: "Private pension",
    description: "Private retirement fund, employer pension, or investment-based pension.",
  },
  {
    value: "both" as const,
    label: "Both",
    description: "A mix of state and private retirement income sources.",
  },
];

export function StepAboutYou({
  situation,
  numberOfChildren,
  childrenAges,
  schoolPreference,
  hasPension,
  pensionType,
  isUniversityStudent,
  onSituationChange,
  onNumberOfChildrenChange,
  onChildAgeChange,
  onSchoolPreferenceChange,
  onHasPensionChange,
  onPensionTypeChange,
  onUniversityStudentChange,
}: StepAboutYouProps) {
  const showsFamilyFields = situation === "family" || situation === "single-parent";
  const showsPensionFields = situation === "pensioner";
  const showsStudentFields = situation === "student";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm font-semibold text-foreground">Which description fits you best?</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {situationOptions.map((option) => (
            <WizardChoiceCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={situation === option.value}
              onClick={() => onSituationChange(option.value)}
              icon={option.icon}
            />
          ))}
        </div>
      </section>

      {showsFamilyFields ? (
        <section className="space-y-5 rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Tell us about your children</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Ages drive which childcare and school tasks appear in the checklist.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Number of children</label>
            <Input
              type="number"
              min={0}
              max={8}
              value={numberOfChildren}
              onChange={(event) => onNumberOfChildrenChange(Number(event.target.value))}
              className="h-14 max-w-40 rounded-2xl border-border/80 bg-card text-base"
            />
          </div>

          {numberOfChildren > 0 ? (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Child ages</label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: numberOfChildren }, (_, index) => (
                  <Input
                    key={index}
                    type="number"
                    min={0}
                    max={21}
                    placeholder={`Child ${index + 1} age`}
                    value={childrenAges[index] !== undefined && childrenAges[index] >= 0 ? childrenAges[index] : ""}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      onChildAgeChange(index, nextValue ? Number(nextValue) : undefined);
                    }}
                    className="h-14 rounded-2xl border-border/80 bg-card text-base"
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">School preference</p>
            <div className="grid gap-3 lg:grid-cols-3">
              {schoolPreferenceOptions.map((option) => (
                <WizardChoiceCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  selected={schoolPreference === option.value}
                  onClick={() => onSchoolPreferenceChange(option.value)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {showsPensionFields ? (
        <section className="space-y-5 rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Are you bringing pension income?</p>
            <p className="text-sm leading-6 text-muted-foreground">
              This lets us surface pension and tax-treaty guidance in the next phase.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <WizardChoiceCard
              label="Yes"
              description="Include pension-related reporting and tax guidance."
              selected={hasPension}
              onClick={() => onHasPensionChange(true)}
            />
            <WizardChoiceCard
              label="No"
              description="Hide pension-specific guidance for now."
              selected={!hasPension}
              onClick={() => onHasPensionChange(false)}
            />
          </div>
          {hasPension ? (
            <div className="grid gap-3 lg:grid-cols-3">
              {pensionOptions.map((option) => (
                <WizardChoiceCard
                  key={option.value}
                  label={option.label}
                  description={option.description}
                  selected={pensionType === option.value}
                  onClick={() => onPensionTypeChange(option.value)}
                />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {showsStudentFields ? (
        <section className="space-y-5 rounded-[1.75rem] border border-border/80 bg-background/85 p-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">Are you enrolling at a university?</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Student enrollment and insurance tasks depend on whether this is a university move.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <WizardChoiceCard
              label="Yes, university"
              description="Show matriculation, student transit, and campus admin tasks."
              selected={isUniversityStudent}
              onClick={() => onUniversityStudentChange(true)}
            />
            <WizardChoiceCard
              label="No, another study path"
              description="Keep the profile student-oriented without assuming university-specific steps."
              selected={!isUniversityStudent}
              onClick={() => onUniversityStudentChange(false)}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}

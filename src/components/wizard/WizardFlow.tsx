"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  CircleCheckBig,
  Compass,
  Sparkles,
  UserRoundSearch,
  Users,
} from "lucide-react";

import { StepAboutYou } from "@/components/wizard/StepAboutYou";
import { StepDestination } from "@/components/wizard/StepDestination";
import { StepEmployment } from "@/components/wizard/StepEmployment";
import { StepOrigin } from "@/components/wizard/StepOrigin";
import { StepPriorities } from "@/components/wizard/StepPriorities";
import type { WizardCountryOption } from "@/components/wizard/types";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { isEuCitizen as isEuCountryCode } from "@/lib/utils/eu";
import {
  useUserProfileStore,
  type EmploymentType,
  type PensionType,
  type PetType,
  type SchoolPreference,
  type UserSituation,
} from "@/stores/userProfileStore";

interface WizardFlowProps {
  destinationCountries: WizardCountryOption[];
  referenceCountries: WizardCountryOption[];
}

const stepMeta = [
  {
    title: "Where are you heading?",
    description:
      "We start with the basics: your destination, your timing, and whether you're already on the ground.",
    icon: Compass,
  },
  {
    title: "What passport situation are we working with?",
    description:
      "Your nationality changes which rules apply, so we'll pin that down before building the checklist.",
    icon: UserRoundSearch,
  },
  {
    title: "Tell us a little about your life stage.",
    description:
      "Family, study, and pension details decide which practical tasks matter in the first weeks after the move.",
    icon: Users,
  },
  {
    title: "How are you planning to live and work there?",
    description:
      "Employment, driving, and pets shape a surprising amount of relocation admin, so we tailor for that now.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Anything you want us to emphasize?",
    description:
      "These preferences are optional, but they help us understand where you'd like extra focus later on.",
    icon: Sparkles,
  },
] as const;

function getProfileSnapshot() {
  const state = useUserProfileStore.getState();

  return {
    destinationCountry: state.destinationCountry,
    arrivalDate: state.arrivalDate,
    hasArrived: state.hasArrived,
    homeCountry: state.homeCountry,
    nationality: state.nationality,
    isEuCitizen: state.isEuCitizen,
    hasDualCitizenship: state.hasDualCitizenship,
    secondNationality: state.secondNationality,
    situation: state.situation,
    numberOfChildren: state.numberOfChildren,
    childrenAges: state.childrenAges,
    schoolPreference: state.schoolPreference,
    hasPension: state.hasPension,
    pensionType: state.pensionType,
    isUniversityStudent: state.isUniversityStudent,
    employmentSituation: state.employmentSituation,
    hasDriversLicense: state.hasDriversLicense,
    driverLicenseCountry: state.driverLicenseCountry,
    hasPet: state.hasPet,
    petType: state.petType,
    priorities: state.priorities,
    wizardCompleted: state.wizardCompleted,
    wizardCompletedAt: state.wizardCompletedAt,
  };
}

async function syncProfileToSupabase(profile: ReturnType<typeof getProfileSnapshot>) {
  const { isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return;
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const payload = {
      id: user.id,
      destination_country: profile.destinationCountry || null,
      arrival_date: profile.arrivalDate || null,
      has_arrived: profile.hasArrived,
      home_country: profile.homeCountry || null,
      nationality: profile.nationality || null,
      is_eu_citizen: profile.isEuCitizen,
      has_dual_citizenship: profile.hasDualCitizenship,
      second_nationality: profile.secondNationality || null,
      situation: profile.situation,
      number_of_children: profile.numberOfChildren,
      children_ages: profile.childrenAges,
      school_preference: profile.schoolPreference,
      has_pension: profile.hasPension,
      pension_type: profile.pensionType || null,
      is_university_student: profile.isUniversityStudent,
      employment_situation: profile.employmentSituation,
      has_drivers_license: profile.hasDriversLicense,
      driver_license_country: profile.driverLicenseCountry || null,
      has_pet: profile.hasPet,
      pet_type: profile.petType || null,
      priorities: profile.priorities,
      wizard_completed: profile.wizardCompleted,
      wizard_completed_at: profile.wizardCompletedAt || null,
      profile_data: profile,
    };

    const { error } = await supabase.from("profiles").upsert(payload, {
      onConflict: "id",
    });

    if (error) {
      console.warn("Profile sync will be finalized in Phase 7:", error.message);
    }
  } catch (error) {
    console.warn("Skipping Supabase profile sync during onboarding:", error);
  }
}

export function WizardFlow({
  destinationCountries,
  referenceCountries,
}: WizardFlowProps) {
  const router = useRouter();
  const profileStore = useUserProfileStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    destinationCountry,
    arrivalDate,
    hasArrived,
    homeCountry,
    nationality,
    isEuCitizen,
    hasDualCitizenship,
    secondNationality,
    situation,
    numberOfChildren,
    childrenAges,
    schoolPreference,
    hasPension,
    pensionType,
    isUniversityStudent,
    employmentSituation,
    hasDriversLicense,
    driverLicenseCountry,
    hasPet,
    petType,
    priorities,
    setField,
    setWizardComplete,
  } = profileStore;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedDestination =
    destinationCountries.find((country) => country.slug === destinationCountry) ?? null;

  const updateEuCitizenship = (
    primaryNationality: string,
    dualCitizenship: boolean,
    secondPassport?: string,
  ) => {
    const euMatch =
      isEuCountryCode(primaryNationality) ||
      (dualCitizenship && secondPassport ? isEuCountryCode(secondPassport) : false);

    setField("isEuCitizen", euMatch);
  };

  const setSituation = (value: UserSituation) => {
    setField("situation", value);

    if (value === "student") {
      setField("employmentSituation", "student");
      setField("isUniversityStudent", true);
    }

    if (value === "pensioner") {
      setField("employmentSituation", "retired");
    }

    if (value === "minor") {
      setField("employmentSituation", "not-working");
      setField("hasDriversLicense", false);
      setField("driverLicenseCountry", undefined);
    }

    if (!["family", "single-parent"].includes(value)) {
      setField("numberOfChildren", 0);
      setField("childrenAges", []);
      setField("schoolPreference", "undecided");
    }

    if (value !== "pensioner") {
      setField("hasPension", false);
      setField("pensionType", undefined);
    }

    if (value !== "student") {
      setField("isUniversityStudent", false);
    }
  };

  const setNumberOfChildren = (value: number) => {
    const normalized = Number.isFinite(value) ? Math.max(0, Math.min(8, value)) : 0;
    const nextAges = Array.from(
      { length: normalized },
      (_, index) => childrenAges[index] ?? -1,
    );
    setField("numberOfChildren", normalized);
    setField("childrenAges", nextAges);
  };

  const setChildAge = (index: number, value: number | undefined) => {
    const nextAges = [...childrenAges];

    if (value === undefined || Number.isNaN(value)) {
      nextAges[index] = -1;
    } else {
      nextAges[index] = value;
    }

    setField("childrenAges", nextAges);
  };

  const setDualCitizenship = (value: boolean) => {
    setField("hasDualCitizenship", value);

    if (!value) {
      setField("secondNationality", undefined);
      updateEuCitizenship(nationality, false);
    } else {
      updateEuCitizenship(nationality, true, secondNationality);
    }
  };

  const setHasPension = (value: boolean) => {
    setField("hasPension", value);

    if (!value) {
      setField("pensionType", undefined);
    }
  };

  const setHasDriversLicense = (value: boolean) => {
    setField("hasDriversLicense", value);

    if (!value) {
      setField("driverLicenseCountry", undefined);
    }
  };

  const setHasPet = (value: boolean) => {
    setField("hasPet", value);

    if (!value) {
      setField("petType", undefined);
    }
  };

  const togglePriority = (priorityId: string) => {
    const nextPriorities = priorities.includes(priorityId)
      ? priorities.filter((priority) => priority !== priorityId)
      : [...priorities, priorityId];

    setField("priorities", nextPriorities);
  };

  const goToStep = (nextStep: number) => {
    setDirection(nextStep > currentStep ? 1 : -1);
    setCurrentStep(nextStep);
    setValidationMessage(null);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!destinationCountry) {
          return "Choose a destination so we know which country guide to generate.";
        }

        if (!arrivalDate) {
          return "Add an arrival date so we can order your deadlines properly.";
        }

        return null;
      case 1:
        if (!homeCountry) {
          return "Choose the country you are moving from.";
        }

        if (!nationality) {
          return "Choose your nationality so the checklist can apply the right rules.";
        }

        if (hasDualCitizenship && !secondNationality) {
          return "Add your second nationality or switch off dual citizenship.";
        }

        if (hasDualCitizenship && secondNationality === nationality) {
          return "Your second nationality should be different from your primary nationality.";
        }

        return null;
      case 2:
        if ((situation === "family" || situation === "single-parent") && numberOfChildren < 1) {
          return "Tell us how many children are moving with you.";
        }

        if (
          (situation === "family" || situation === "single-parent") &&
          (childrenAges.length < numberOfChildren ||
            childrenAges.slice(0, numberOfChildren).some((age) => age < 0))
        ) {
          return "Add an age for each child so we can match the right childcare and school tasks.";
        }

        if (hasPension && !pensionType) {
          return "Choose the type of pension income you expect to receive.";
        }

        return null;
      case 3:
        if (!employmentSituation) {
          return "Choose the option that best describes your work situation.";
        }

        if (hasDriversLicense && !driverLicenseCountry) {
          return "Choose the country that issued your driver's license.";
        }

        if (hasPet && !petType) {
          return "Tell us what kind of pet is moving with you.";
        }

        return null;
      default:
        return null;
    }
  };

  const completeWizard = async () => {
    const error = validateStep();

    if (error) {
      setValidationMessage(error);
      return;
    }

    setIsCompleting(true);
    setValidationMessage(null);
    setWizardComplete();

    const latestProfile = getProfileSnapshot();
    await syncProfileToSupabase(latestProfile);

    setShowSuccess(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1200));

    startTransition(() => {
      router.push(
        latestProfile.destinationCountry
          ? `/country/${latestProfile.destinationCountry}`
          : "/countries",
      );
    });
  };

  const handleContinue = async () => {
    const error = validateStep();

    if (error) {
      setValidationMessage(error);
      return;
    }

    if (currentStep === stepMeta.length - 1) {
      await completeWizard();
      return;
    }

    goToStep(currentStep + 1);
  };

  if (!isMounted) {
    return (
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <Card className="flex flex-1 rounded-[2rem] border-border/80 bg-card/92">
          <CardContent className="flex flex-1 animate-pulse flex-col gap-6 p-6 sm:p-8 lg:p-10">
            <div className="h-4 w-32 rounded-full bg-secondary/80" />
            <div className="h-12 w-2/3 rounded-[1rem] bg-secondary/70" />
            <div className="h-6 w-3/4 rounded-full bg-secondary/50" />
            <div className="h-64 rounded-[1.5rem] bg-secondary/35" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="flex flex-1 items-center justify-center rounded-[2rem] border-border/80 bg-card/92 shadow-[0_28px_100px_rgba(45,52,54,0.12)]">
          <CardContent className="flex max-w-2xl flex-col items-center px-8 py-12 text-center sm:px-12">
            <div className="flex size-[4.5rem] items-center justify-center rounded-[2rem] bg-primary text-primary-foreground shadow-[0_16px_40px_rgba(27,67,50,0.25)]">
              <CircleCheckBig className="size-8" />
            </div>
            <Badge className="mt-6 rounded-full bg-secondary px-4 py-1.5 text-primary">
              Profile saved
            </Badge>
            <h1 className="mt-6 text-balance text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
              Your personalized starter pack is ready.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              We&apos;re opening your checklist for{" "}
              <span className="font-semibold text-foreground">
                {selectedDestination
                  ? `${selectedDestination.flagEmoji} ${selectedDestination.name}`
                  : "your destination"}
              </span>
              .
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {nationality ? (
                <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                  Nationality: {nationality}
                </Badge>
              ) : null}
              <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                Situation: {situation}
              </Badge>
              <Badge variant="secondary" className="rounded-full px-4 py-1.5">
                Work: {employmentSituation}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const meta = stepMeta[currentStep];
  const nextLabel = currentStep === stepMeta.length - 1 ? "Create my checklist" : "Continue";

  return (
    <WizardLayout
      currentStep={currentStep + 1}
      totalSteps={stepMeta.length}
      title={meta.title}
      description={meta.description}
      stepKey={`wizard-step-${currentStep}`}
      direction={direction}
      icon={meta.icon}
      nextLabel={nextLabel}
      validationMessage={validationMessage}
      onNext={() => {
        void handleContinue();
      }}
      onBack={currentStep > 0 ? () => goToStep(currentStep - 1) : undefined}
      onSkip={currentStep === stepMeta.length - 1 ? () => void completeWizard() : undefined}
      isSubmitting={isCompleting}
    >
      {currentStep === 0 ? (
        <StepDestination
          countries={destinationCountries}
          destinationCountry={destinationCountry}
          arrivalDate={arrivalDate}
          hasArrived={hasArrived}
          onDestinationChange={(value) => setField("destinationCountry", value)}
          onArrivalDateChange={(value) => setField("arrivalDate", value)}
          onHasArrivedChange={(value) => setField("hasArrived", value)}
        />
      ) : null}

      {currentStep === 1 ? (
        <StepOrigin
          countries={referenceCountries}
          homeCountry={homeCountry}
          nationality={nationality}
          hasDualCitizenship={hasDualCitizenship}
          secondNationality={secondNationality}
          isEuCitizen={isEuCitizen}
          onHomeCountryChange={(value) => setField("homeCountry", value)}
          onNationalityChange={(value) => {
            setField("nationality", value);
            updateEuCitizenship(value, hasDualCitizenship, secondNationality);
          }}
          onDualCitizenshipChange={setDualCitizenship}
          onSecondNationalityChange={(value) => {
            setField("secondNationality", value);
            updateEuCitizenship(nationality, hasDualCitizenship, value);
          }}
        />
      ) : null}

      {currentStep === 2 ? (
        <StepAboutYou
          situation={situation}
          numberOfChildren={numberOfChildren}
          childrenAges={childrenAges}
          schoolPreference={schoolPreference}
          hasPension={hasPension}
          pensionType={pensionType}
          isUniversityStudent={isUniversityStudent}
          onSituationChange={setSituation}
          onNumberOfChildrenChange={setNumberOfChildren}
          onChildAgeChange={setChildAge}
          onSchoolPreferenceChange={(value: SchoolPreference) => setField("schoolPreference", value)}
          onHasPensionChange={setHasPension}
          onPensionTypeChange={(value: PensionType) => setField("pensionType", value)}
          onUniversityStudentChange={(value) => setField("isUniversityStudent", value)}
        />
      ) : null}

      {currentStep === 3 ? (
        <StepEmployment
          countries={referenceCountries}
          employmentSituation={employmentSituation}
          hasDriversLicense={hasDriversLicense}
          driverLicenseCountry={driverLicenseCountry}
          hasPet={hasPet}
          petType={petType}
          onEmploymentSituationChange={(value: EmploymentType) =>
            setField("employmentSituation", value)
          }
          onHasDriversLicenseChange={setHasDriversLicense}
          onDriverLicenseCountryChange={(value) => setField("driverLicenseCountry", value)}
          onHasPetChange={setHasPet}
          onPetTypeChange={(value: PetType) => setField("petType", value)}
        />
      ) : null}

      {currentStep === 4 ? (
        <StepPriorities priorities={priorities} onTogglePriority={togglePriority} />
      ) : null}
    </WizardLayout>
  );
}

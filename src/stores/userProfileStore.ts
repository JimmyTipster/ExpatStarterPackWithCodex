import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserSituation =
  | "single"
  | "couple"
  | "family"
  | "single-parent"
  | "pensioner"
  | "student"
  | "minor";

export type EmploymentType =
  | "employed"
  | "remote-worker"
  | "freelancer"
  | "starting-business"
  | "job-seeker"
  | "student"
  | "retired"
  | "not-working";

export type SchoolPreference = "local" | "international" | "undecided";
export type PensionType = "state" | "private" | "both";
export type PetType = "dog" | "cat" | "other";

export interface UserProfile {
  destinationCountry: string;
  arrivalDate: string;
  hasArrived: boolean;
  homeCountry: string;
  nationality: string;
  isEuCitizen: boolean;
  hasDualCitizenship: boolean;
  secondNationality?: string;
  situation: UserSituation;
  numberOfChildren: number;
  childrenAges: number[];
  schoolPreference: SchoolPreference;
  hasPension: boolean;
  pensionType?: PensionType;
  isUniversityStudent: boolean;
  employmentSituation: EmploymentType;
  hasDriversLicense: boolean;
  driverLicenseCountry?: string;
  hasPet: boolean;
  petType?: PetType;
  priorities: string[];
  wizardCompleted: boolean;
  wizardCompletedAt?: string;
}

interface UserProfileStore extends UserProfile {
  setField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
  setWizardComplete: () => void;
  resetProfile: () => void;
}

function getDefaultProfile(): UserProfile {
  return {
    destinationCountry: "",
    arrivalDate: new Date().toISOString().slice(0, 10),
    hasArrived: false,
    homeCountry: "",
    nationality: "",
    isEuCitizen: false,
    hasDualCitizenship: false,
    secondNationality: undefined,
    situation: "single",
    numberOfChildren: 0,
    childrenAges: [],
    schoolPreference: "undecided",
    hasPension: false,
    pensionType: undefined,
    isUniversityStudent: false,
    employmentSituation: "employed",
    hasDriversLicense: false,
    driverLicenseCountry: undefined,
    hasPet: false,
    petType: undefined,
    priorities: [],
    wizardCompleted: false,
    wizardCompletedAt: undefined,
  };
}

const defaultProfile = getDefaultProfile();

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      ...defaultProfile,
      setField: (key, value) =>
        set(() => ({
          [key]: value,
        }) as Partial<UserProfile>),
      setWizardComplete: () =>
        set(() => ({
          wizardCompleted: true,
          wizardCompletedAt: new Date().toISOString(),
        })),
      resetProfile: () => set(getDefaultProfile()),
    }),
    {
      name: "expat-starter-pack-profile",
      partialize: (state) => ({
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
      }),
    },
  ),
);

export { defaultProfile };

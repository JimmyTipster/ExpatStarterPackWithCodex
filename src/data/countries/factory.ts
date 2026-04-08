import { germany } from "@/data/countries/germany";
import type { ChecklistTask, Country } from "@/data/types";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

interface CountryTaskConfig {
  registrationOffice: string;
  registrationWhere: string;
  permitOffice: string;
  permitCost: string;
  healthProviders: string[];
  taxOffice: string;
  transitPass: string;
  mobileProviders: string[];
  familyBenefit: string;
  childcareLabel: string;
  schoolAuthority: string;
  studentOffice: string;
  driverOffice: string;
  vehicleOffice: string;
  petOffice: string;
  employmentOffice: string;
  jobPlatforms: string[];
  freelancerOffice: string;
  dogTax?: string;
}

export interface CountrySeed {
  overrides: DeepPartial<Country>;
  taskConfig: CountryTaskConfig;
}

function mergeDeep<T>(base: T, overrides: DeepPartial<T>): T {
  const output = structuredClone(base) as T;

  for (const [key, value] of Object.entries(overrides) as [keyof T, DeepPartial<T[keyof T]>][]) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      (output as Record<string, unknown>)[key as string] = value;
      continue;
    }

    if (value && typeof value === "object") {
      const current = (output as Record<string, unknown>)[key as string];
      (output as Record<string, unknown>)[key as string] = mergeDeep(
        (current ?? {}) as object,
        value as object,
      );
      continue;
    }

    (output as Record<string, unknown>)[key as string] = value;
  }

  return output;
}

function buildTasks(country: Country, config: CountryTaskConfig): ChecklistTask[] {
  const slug = country.slug;

  const tasks: ChecklistTask[] = [
    {
      id: `${slug}-register-address`,
      title: "Register your address",
      description: `Complete your local address registration so the rest of your admin can start moving.`,
      localInstitutionName: config.registrationOffice,
      whereToGo: config.registrationWhere,
      documentsNeeded: ["Passport or ID", "Proof of address", "Rental contract if requested"],
      estimatedTime: "30-60 minutes",
      estimatedCost: "Usually free",
      deadlineDescription: "As soon as practical after moving in",
      deadlineDays: 14,
      category: "registration",
      isMandatory: true,
      isPremium: false,
      sortOrder: 1,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-bank-account`,
      title: "Open a local bank account",
      description: "A local account usually makes salary, rent, bills, and identity checks easier.",
      whereToGo: `${country.name} banks or digital banks`,
      documentsNeeded: ["Passport", "Address proof", "Tax number if requested"],
      estimatedTime: "30 minutes to a few days",
      estimatedCost: "Varies by provider",
      category: "banking",
      isMandatory: false,
      isPremium: false,
      sortOrder: 2,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-health-coverage`,
      title: "Set up health coverage",
      description: "Health coverage often unlocks work, study, residency, and local doctor access.",
      whereToGo: config.healthProviders.join(", "),
      documentsNeeded: ["Passport", "Address", "Employment or study details"],
      estimatedTime: "1-5 business days",
      estimatedCost: "Depends on status and provider",
      category: "health",
      isMandatory: true,
      isPremium: false,
      sortOrder: 3,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-tax-number`,
      title: "Get your tax number ready",
      description: "Most newcomers need a tax identifier early for payroll, benefits, or invoicing.",
      localInstitutionName: config.taxOffice,
      documentsNeeded: ["Address registration", "Passport", "Local tax forms if requested"],
      estimatedTime: "A few days to a few weeks",
      estimatedCost: "Free",
      category: "registration",
      isMandatory: true,
      isPremium: false,
      sortOrder: 4,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-sim`,
      title: "Set up a SIM card",
      description: "A local number helps with banking, landlords, employers, and two-factor authentication.",
      whereToGo: config.mobileProviders.join(", "),
      documentsNeeded: ["Passport or ID", "Bank details for contract plans"],
      estimatedTime: "20-40 minutes",
      estimatedCost: "Low monthly cost to mid-tier contract pricing",
      category: "communication",
      isMandatory: false,
      isPremium: false,
      sortOrder: 5,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-transit`,
      title: "Choose your transport pass",
      description: "Most cities have a monthly pass or nationwide product that saves money quickly.",
      whereToGo: config.transitPass,
      documentsNeeded: ["Bank card", "Photo if required"],
      estimatedTime: "10-20 minutes",
      category: "transportation",
      isMandatory: false,
      isPremium: false,
      sortOrder: 6,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-gp`,
      title: "Find a local doctor",
      description: "Find your local GP or first-contact clinic before you need urgent care.",
      documentsNeeded: ["Health card or insurance details"],
      estimatedTime: "30-90 minutes",
      category: "health",
      isMandatory: false,
      isPremium: false,
      sortOrder: 7,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-embassy`,
      title: "Register with your embassy or consulate",
      description: "Embassy registration can help with renewals, voting, and emergency support.",
      documentsNeeded: ["Passport", "Local address"],
      estimatedTime: "10-20 minutes online",
      category: "legal",
      isMandatory: false,
      isPremium: false,
      sortOrder: 8,
      audience: ["everyone"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-permit`,
      title: "Apply for a residence permit",
      description: "Non-EU nationals usually need a residence permit or local status registration after arrival.",
      localInstitutionName: config.permitOffice,
      whereToGo: config.permitOffice,
      documentsNeeded: ["Passport", "Visa or entry basis", "Address registration", "Health coverage proof"],
      estimatedTime: "Several weeks plus card production",
      estimatedCost: config.permitCost,
      deadlineDescription: "Within your entry or visa window",
      deadlineDays: 90,
      category: "registration",
      isMandatory: true,
      isPremium: false,
      sortOrder: 9,
      audience: ["everyone"],
      originRule: { type: "non-eu-only" },
    },
    {
      id: `${slug}-eu-rights`,
      title: "Understand your EU free-movement position",
      description: "EU or EEA arrivals usually have a simpler first-month legal path, but local admin still matters.",
      documentsNeeded: ["Passport or national ID"],
      estimatedTime: "15 minutes",
      category: "legal",
      isMandatory: false,
      isPremium: false,
      sortOrder: 10,
      audience: ["everyone"],
      originRule: { type: "eu-only" },
    },
    {
      id: `${slug}-family-benefit`,
      title: `Check ${config.familyBenefit}`,
      description: "Families should review local child benefit or dependent support as early as possible.",
      localInstitutionName: config.employmentOffice,
      documentsNeeded: ["Child documents", "Tax numbers", "Address registration"],
      estimatedTime: "1-2 hours plus follow-up",
      category: "welfare",
      isMandatory: false,
      isPremium: true,
      sortOrder: 11,
      audience: ["family"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-childcare`,
      title: `Join ${config.childcareLabel} waitlists`,
      description: "Childcare places can be competitive, especially in larger cities.",
      documentsNeeded: ["Child details", "Preferred start date", "Address"],
      estimatedTime: "30-90 minutes",
      category: "education",
      isMandatory: false,
      isPremium: true,
      sortOrder: 12,
      audience: ["family-toddler", "family-preschool"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-school`,
      title: "Arrange school placement",
      description: "School-age children usually need local placement quickly after arrival.",
      localInstitutionName: config.schoolAuthority,
      documentsNeeded: ["School records", "Child passport", "Address registration"],
      estimatedTime: "1-2 appointments",
      category: "education",
      isMandatory: true,
      isPremium: false,
      sortOrder: 13,
      audience: ["family-school", "family-teen"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-student`,
      title: "Complete student registration",
      description: "Students should finalize enrollment, fees, and campus admin quickly after arrival.",
      localInstitutionName: config.studentOffice,
      documentsNeeded: ["Admission letter", "Passport", "Health coverage proof"],
      estimatedTime: "1-3 business days",
      category: "education",
      isMandatory: true,
      isPremium: false,
      sortOrder: 14,
      audience: ["student"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-license`,
      title: "Check driving license recognition",
      description: "License conversion rules vary by origin country and can affect how long you may drive legally.",
      localInstitutionName: config.driverOffice,
      documentsNeeded: ["Driving license", "Passport", "Address registration"],
      estimatedTime: "Several weeks if conversion is needed",
      category: "transportation",
      isMandatory: false,
      isPremium: false,
      sortOrder: 15,
      audience: ["driver"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-vehicle`,
      title: "Register your vehicle locally",
      description: "Imported or newly purchased vehicles usually need local registration and insurance.",
      localInstitutionName: config.vehicleOffice,
      documentsNeeded: ["Vehicle papers", "Insurance proof", "Passport", "Address"],
      estimatedTime: "1-2 hours plus prep",
      category: "transportation",
      isMandatory: true,
      isPremium: false,
      sortOrder: 16,
      audience: ["driver"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-pet`,
      title: "Handle local pet registration",
      description: "Pet owners often need a local registration, vet setup, and insurance check soon after arrival.",
      localInstitutionName: config.petOffice,
      documentsNeeded: ["Vaccination records", "Chip details", "Owner address"],
      estimatedTime: "20-45 minutes",
      category: "legal",
      isMandatory: false,
      isPremium: true,
      sortOrder: 17,
      audience: ["pet-owner"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-employment-office`,
      title: "Register with the employment office",
      description: "If you are job seeking, the public employment service can unlock benefits, coaching, and listings.",
      localInstitutionName: config.employmentOffice,
      whereToGo: config.employmentOffice,
      documentsNeeded: ["Passport", "CV", "Address details"],
      estimatedTime: "1-2 hours",
      category: "employment",
      isMandatory: false,
      isPremium: false,
      sortOrder: 18,
      audience: ["job-seeker"],
      originRule: { type: "all" },
    },
    {
      id: `${slug}-job-platforms`,
      title: "Set up profiles on major job platforms",
      description: "Tailor your CV and local profiles before the first application wave.",
      documentsNeeded: ["CV", "Work history", "Role preferences"],
      estimatedTime: "1-3 hours",
      category: "employment",
      isMandatory: false,
      isPremium: true,
      sortOrder: 19,
      audience: ["job-seeker"],
      tips: config.jobPlatforms.join(", "),
      originRule: { type: "all" },
    },
    {
      id: `${slug}-freelancer`,
      title: "Register your freelance or business activity",
      description: "Self-employed moves often fail when tax and registration are handled too late.",
      localInstitutionName: config.freelancerOffice,
      documentsNeeded: ["Passport", "Address", "Business description", "Tax forms"],
      estimatedTime: "1-2 weeks",
      category: "employment",
      isMandatory: true,
      isPremium: true,
      sortOrder: 20,
      audience: ["freelancer", "starting-business"],
      originRule: { type: "all" },
    },
  ];

  if (config.dogTax) {
    tasks.push({
      id: `${slug}-dog-tax`,
      title: "Register your dog and review local dog tax",
      description: `Dog-owning households should confirm whether ${config.dogTax} applies and how registration works.`,
      localInstitutionName: config.petOffice,
      documentsNeeded: ["Owner ID", "Dog details", "Address registration"],
      estimatedTime: "20-40 minutes",
      estimatedCost: "Varies by municipality",
      category: "legal",
      isMandatory: true,
      isPremium: false,
      sortOrder: 21,
      audience: ["pet-dog"],
      originRule: { type: "all" },
    });
  }

  return tasks;
}

export function createCountryFromSeed(seed: CountrySeed): Country {
  const merged = mergeDeep(germany, seed.overrides);
  const country = {
    ...merged,
    tasks: [] as ChecklistTask[],
  } satisfies Country;

  country.tasks = buildTasks(country, seed.taskConfig);

  return country;
}

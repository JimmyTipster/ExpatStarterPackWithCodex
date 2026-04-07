export type TaskCategory =
  | "registration"
  | "banking"
  | "health"
  | "housing"
  | "communication"
  | "transportation"
  | "employment"
  | "welfare"
  | "education"
  | "legal";

export type TaskAudience =
  | "everyone"
  | "family"
  | "family-toddler"
  | "family-preschool"
  | "family-school"
  | "family-teen"
  | "pensioner"
  | "student"
  | "driver"
  | "pet-owner"
  | "pet-dog"
  | "employed"
  | "remote-worker"
  | "freelancer"
  | "starting-business"
  | "job-seeker"
  | "not-working";

export interface OriginRule {
  type: "eu-only" | "non-eu-only" | "specific-countries" | "all";
  countries?: string[];
  description?: string;
}

export interface ExternalLink {
  label: string;
  url: string;
  provider?: string;
}

export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  localInstitutionName?: string;
  localInstitutionNameTranslation?: string;
  whereToGo?: string;
  documentsNeeded: string[];
  estimatedTime?: string;
  estimatedCost?: string;
  deadlineDescription?: string;
  deadlineDays?: number;
  riskIfMissed?: string;
  category: TaskCategory;
  isMandatory: boolean;
  isPremium: boolean;
  sortOrder: number;
  tips?: string;
  externalLinks?: ExternalLink[];
  notificationText?: string;
  audience: TaskAudience[];
  originRule?: OriginRule;
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  subunit: string;
  paymentCulture: string;
  atmTips: string[];
}

export interface DemographicEntry {
  label: string;
  value: string;
  note?: string;
}

export interface ReligionEntry {
  name: string;
  share: string;
  note?: string;
}

export interface CitizenshipInfo {
  birthrightCitizenship: string;
  naturalizationYears: string;
  permanentResidency: string;
  dualCitizenship: string;
}

export interface FoodItem {
  name: string;
  description: string;
}

export interface BeverageItem {
  name: string;
  description: string;
}

export interface Holiday {
  name: string;
  date: string;
  note?: string;
}

export interface TouristHighlight {
  name: string;
  location: string;
  description: string;
}

export interface SocialCultureInfo {
  communicationStyle: string;
  punctuality: string;
  socialNorms: string[];
  integrationTips: string[];
}

export interface WeekendDoctor {
  name: string;
  localName: string;
  phone: string;
  hours: string;
  accessNotes: string;
}

export interface HotlineInfo {
  name: string;
  phone: string;
  availability?: string;
  notes?: string;
}

export interface UtilityEmergency {
  provider: string;
  phone?: string;
  notes: string;
}

export interface EmergencyServices {
  generalEmergency: string;
  police: string;
  fire: string;
  ambulance: string;
  nonEmergencyPolice?: string;
  poisonControl?: HotlineInfo;
  weekendDoctor: WeekendDoctor;
  mentalHealthHotline?: HotlineInfo;
  domesticViolenceHotline?: HotlineInfo;
  childProtectionHotline?: HotlineInfo;
  roadAssistance?: HotlineInfo;
  electricityEmergency?: UtilityEmergency;
  gasEmergency?: UtilityEmergency;
  waterEmergency?: UtilityEmergency;
  callingInstructions: string[];
}

export interface ServiceProvider {
  name: string;
  category: string;
  websiteUrl?: string;
  phone?: string;
  description: string;
  languages?: string[];
  cities?: string[];
  notes?: string;
}

export interface PublicEmploymentService {
  name: string;
  localName: string;
  websiteUrl: string;
  registrationProcess: string;
  servicesOffered: string[];
  eligibilityForExpats: string;
}

export interface WorkPermitInfo {
  euCitizens: string;
  nonEuCitizens: string;
  blueCardInfo?: string;
  freelancerVisa?: string;
}

export interface WorkCulture {
  typicalHours: string;
  vacationDays: string;
  sickLeave: string;
  trialPeriod: string;
  noticePeriod: string;
  typicalSalaryRange?: string;
  payFrequency: string;
  contractTypes: string[];
}

export interface ApplicationTips {
  cvFormat: string;
  coverLetter: boolean;
  languageRequirements: string;
  interviewCulture: string;
}

export interface JobSearchInfo {
  publicEmploymentService: PublicEmploymentService;
  jobPlatforms: ServiceProvider[];
  expatJobResources: ServiceProvider[];
  workPermitInfo: WorkPermitInfo;
  workCulture: WorkCulture;
  applicationTips: ApplicationTips;
  networkingTips: string[];
}

export interface TaxBracket {
  range: string;
  rate: string;
  notes?: string;
}

export interface SocialContribution {
  name: string;
  employeeShare: string;
  employerShare?: string;
  notes?: string;
}

export interface TaxInfo {
  taxYear: number;
  currency: string;
  incomeTaxBrackets: TaxBracket[];
  socialSecurityContributions: SocialContribution[];
  vatRates: string[];
  specialRegimes: string[];
  doubleTaxationSummary: string;
  foreignAccountReporting: string;
  pensionTaxNotes: string;
  inheritanceNotes: string;
  powerOfAttorneyNotes: string;
}

export interface BusinessTypeInfo {
  name: string;
  localName: string;
  minimumCapital: string;
  liability: string;
  setupCost: string;
  idealFor: string;
  notes?: string;
}

export interface FreelancerGuideStep {
  title: string;
  details: string;
}

export interface FreelancerGuide {
  overview: string;
  registrationAuthority: string;
  taxSetup: string;
  invoicingNotes: string;
  healthInsuranceNotes: string;
  steps: FreelancerGuideStep[];
}

export interface PayslipLineItem {
  label: string;
  amount: string;
}

export interface PayslipExample {
  grossMonthlySalary: string;
  lineItems: PayslipLineItem[];
  netMonthlySalary: string;
  notes: string[];
}

export interface ChildcareInfo {
  localName: string;
  ageRange: string;
  averageCost: string;
  subsidyInfo: string;
  notes: string[];
}

export interface SchoolInfo {
  overview: string;
  enrollmentProcess: string;
  costs: string;
  notes: string[];
}

export interface InternationalSchoolInfo {
  systems: string[];
  annualCostRange: string;
  notes: string[];
}

export interface UniversityInfo {
  tuitionRange: string;
  applicationNotes: string;
  studentVisaNotes: string;
}

export interface LanguageCourseInfo {
  overview: string;
  mandatoryIntegration?: string;
  providers: string[];
}

export interface EducationInfo {
  childcare: ChildcareInfo[];
  primarySchool: SchoolInfo;
  secondarySchool: SchoolInfo;
  internationalSchools: InternationalSchoolInfo;
  university: UniversityInfo;
  adultLanguageCourses: LanguageCourseInfo;
}

export interface TransportModeInfo {
  name: string;
  description: string;
  typicalCost?: string;
}

export interface TransportInfo {
  publicTransitOverview: string;
  localTransitPasses: TransportModeInfo[];
  longDistanceTravel: TransportModeInfo[];
  taxiApps: string[];
  cyclingCulture: string;
  drivingNotes: string[];
}

export interface PriceGuideEntry {
  item: string;
  averagePrice: string;
  notes?: string;
}

export interface PriceGuideSection {
  category: string;
  entries: PriceGuideEntry[];
}

export interface PriceGuide {
  year: number;
  currency: string;
  sections: PriceGuideSection[];
}

export interface VisaTypeInfo {
  name: string;
  idealFor: string;
  duration: string;
  notes: string;
}

export interface VisaInfo {
  overview: string;
  entryRequirements: string;
  visaTypes: VisaTypeInfo[];
  digitalNomadVisa?: string;
  blueCardSummary?: string;
}

export interface PetRelocationInfo {
  overview: string;
  importRequirements: string[];
  breedRestrictions?: string;
  dogTaxNotes?: string;
  vetTips: string[];
}

export interface ProfessionalCategory {
  category: string;
  overview: string;
  providers: ServiceProvider[];
}

export interface ProfessionalServices {
  overview: string;
  categories: ProfessionalCategory[];
}

export interface LeavingCountryInfo {
  overview: string;
  tasks: string[];
  taxClearance: string;
  pensionPortability: string;
  closingTips: string[];
}

export interface DailyLifeInfo {
  supermarketChains: string[];
  recyclingRules: string[];
  openingHours: string;
  paymentHabits: string;
  diningNorms: string[];
  housingTips: string[];
}

export interface CostlyMistake {
  title: string;
  severity: "critical" | "warning" | "info";
  description: string;
  consequence: string;
  deadline?: string;
  howToAvoid: string;
}

export interface Country {
  name: string;
  slug: string;
  isoCode: string;
  isoCode3: string;
  flagEmoji: string;
  capital: string;
  region: string;
  subregion: string;
  officialLanguages: string[];
  currency: CurrencyInfo;
  callingCode: string;
  emergencyNumber: string;
  timezones: string[];
  population: number;
  populationYear: number;
  governmentType: string;
  drivesOn: "left" | "right";
  description: string;
  history: string[];
  climate: string[];
  costOfLivingIndex: number;
  demographics: DemographicEntry[];
  religions: ReligionEntry[];
  citizenship: CitizenshipInfo;
  traditionalFoods: FoodItem[];
  traditionalBeverages: BeverageItem[];
  holidays: Holiday[];
  touristHighlights: TouristHighlight[];
  socialCulture: SocialCultureInfo;
  emergencyServices: EmergencyServices;
  jobSearchInfo: JobSearchInfo;
  taxInfo: TaxInfo;
  businessTypes: BusinessTypeInfo[];
  freelancerGuide: FreelancerGuide;
  payslipExample: PayslipExample;
  educationInfo: EducationInfo;
  transportInfo: TransportInfo;
  priceGuide: PriceGuide;
  visaInfo: VisaInfo;
  petRelocationInfo: PetRelocationInfo;
  professionalServices: ProfessionalServices;
  leavingCountryInfo: LeavingCountryInfo;
  dailyLife: DailyLifeInfo;
  tasks: ChecklistTask[];
  alerts: CostlyMistake[];
}

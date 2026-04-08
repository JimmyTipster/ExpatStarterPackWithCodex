import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlertsSection } from "@/components/country/AlertsSection";
import { ChecklistSection } from "@/components/country/ChecklistSection";
import { CitizenshipSection } from "@/components/country/CitizenshipSection";
import { CommunitySection } from "@/components/country/CommunitySection";
import { CountryHeader } from "@/components/country/CountryHeader";
import { CountryProfileSection } from "@/components/country/CountryProfileSection";
import { CurrencySection } from "@/components/country/CurrencySection";
import { DailyLifeSection } from "@/components/country/DailyLifeSection";
import { DocumentsSection } from "@/components/country/DocumentsSection";
import { EducationSection } from "@/components/country/EducationSection";
import { EmergencySection } from "@/components/country/EmergencySection";
import { HolidaysSection } from "@/components/country/HolidaysSection";
import { JobSearchSection } from "@/components/country/JobSearchSection";
import { LawyersSection } from "@/components/country/LawyersSection";
import { LeavingSection } from "@/components/country/LeavingSection";
import { PetRelocationSection } from "@/components/country/PetRelocationSection";
import { PricesSection } from "@/components/country/PricesSection";
import { ProfileBanner } from "@/components/country/ProfileBanner";
import { SectionTabs, type SectionTabItem } from "@/components/country/SectionTabs";
import { TaxBusinessSection } from "@/components/country/TaxBusinessSection";
import { TransportSection } from "@/components/country/TransportSection";
import { VisaSection } from "@/components/country/VisaSection";
import { getCountryBySlug, getCountrySlugs } from "@/data/countries";
import { PremiumGate } from "@/components/shared/PremiumGate";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig } from "@/lib/supabase/config";

interface CountryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const sections: SectionTabItem[] = [
  { id: "checklist", label: "Checklist", icon: "checklist" },
  { id: "emergency", label: "Emergency", icon: "emergency" },
  { id: "profile", label: "Country", icon: "profile" },
  { id: "holidays", label: "Holidays", icon: "holidays" },
  { id: "currency", label: "Currency", icon: "currency" },
  { id: "documents", label: "Documents", icon: "documents" },
  { id: "transport", label: "Transport", icon: "transport" },
  { id: "daily", label: "Daily life", icon: "daily" },
  { id: "alerts", label: "Alerts", icon: "alerts", isPremium: true },
  { id: "jobs", label: "Jobs", icon: "jobs", isPremium: true },
  { id: "tax", label: "Tax", icon: "tax", isPremium: true },
  { id: "education", label: "Education", icon: "education", isPremium: true },
  { id: "citizenship", label: "Citizenship", icon: "citizenship", isPremium: true },
  { id: "visa", label: "Visas", icon: "visa", isPremium: true },
  { id: "lawyers", label: "Lawyers", icon: "lawyers", isPremium: true },
  { id: "leaving", label: "Leaving", icon: "leaving", isPremium: true },
  { id: "pets", label: "Pets", icon: "pets", isPremium: true },
  { id: "prices", label: "Prices", icon: "prices", isPremium: true },
  { id: "community", label: "Community", icon: "community", isPremium: true },
];

async function getServerPremiumState() {
  const { isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return false;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { data } = await supabase.from("profiles").select("is_premium").eq("id", user.id).single();
    return Boolean(data?.is_premium);
  } catch {
    return false;
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;
  const [country, isPremium] = await Promise.all([
    slug ? getCountryBySlug(slug) : Promise.resolve(null),
    getServerPremiumState(),
  ]);

  if (!country) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Countries",
          item: `${siteUrl}/countries`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: country.name,
          item: `${siteUrl}/country/${country.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Set up your move to ${country.name}`,
      step: country.tasks.slice(0, 5).map((task, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: task.title,
        text: task.description,
      })),
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {structuredData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <CountryHeader country={country} isPremium={isPremium} />
      <ProfileBanner countrySlug={country.slug} />
      <SectionTabs sections={sections} />
      <div className="grid gap-6">
        <ChecklistSection country={country} />
        <EmergencySection country={country} />
        <CountryProfileSection country={country} />
        <HolidaysSection country={country} />
        <CurrencySection country={country} />
        <DocumentsSection country={country} />
        <TransportSection country={country} />
        <DailyLifeSection country={country} />

        <PremiumGate
          title="Deeper relocation guidance lives in premium"
          points={[
            "Costly mistakes and edge-case admin",
            "Job, tax, and business guidance",
            "Education, legal, pet, and leaving-country detail",
          ]}
        >
          <div className="grid gap-6">
            <AlertsSection country={country} />
            <JobSearchSection country={country} />
            <TaxBusinessSection country={country} />
            <EducationSection country={country} />
            <CitizenshipSection country={country} />
            <VisaSection country={country} />
            <LawyersSection country={country} />
            <LeavingSection country={country} />
            <PetRelocationSection country={country} />
            <PricesSection country={country} />
            <CommunitySection country={country} />
          </div>
        </PremiumGate>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getCountrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = slug ? await getCountryBySlug(slug) : null;

  if (!country) {
    return {
      title: "Country guide | Expat Starter Pack",
    };
  }

  return {
    title: `Moving to ${country.name} as an Expat - Complete Guide 2026`,
    description: `${country.description} Get a personalized checklist, emergency numbers, transport guidance, and relocation essentials for ${country.name}.`,
  };
}

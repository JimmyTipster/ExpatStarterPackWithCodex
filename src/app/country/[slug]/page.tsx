import { notFound } from "next/navigation";

import { getCountryBySlug, getCountrySlugs } from "@/data/countries";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

interface CountryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { slug } = await params;

  const country = slug ? await getCountryBySlug(slug) : null;

  if (!country) {
    notFound();
  }

  return (
    <PlaceholderPage
      eyebrow="Country Page"
      title={`${country.name} route scaffolded for Phase 4.`}
      description={`${country.name} is now loaded from the Phase 2 country registry with ${country.tasks.length} checklist tasks, emergency contacts, and structured country data. The fully tabbed country experience still lands in Phase 4.`}
      primaryCtaHref="/countries"
      primaryCtaLabel="Back to countries"
      secondaryCtaHref="/wizard"
      secondaryCtaLabel="Open wizard placeholder"
    />
  );
}

export function generateStaticParams() {
  return getCountrySlugs().map((slug) => ({ slug }));
}

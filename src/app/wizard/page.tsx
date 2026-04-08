import type { Metadata } from "next";

import { WizardFlow } from "@/components/wizard/WizardFlow";
import { getAllCountries } from "@/data/countries";
import { getReferenceCountries } from "@/lib/countries/reference";

export const metadata: Metadata = {
  title: "Onboarding Wizard | Expat Starter Pack",
  description:
    "Answer a few practical questions and get a personalized relocation checklist for your move abroad.",
};

export default async function WizardPage() {
  const [destinationCountries, referenceCountries] = await Promise.all([
    getAllCountries(),
    getReferenceCountries(),
  ]);
  const referenceCountryByIso = new Map(
    referenceCountries.map((country) => [country.isoCode, country]),
  );

  return (
    <WizardFlow
      destinationCountries={destinationCountries.map((country) => ({
        name: country.name,
        slug: country.slug,
        isoCode: country.isoCode,
        isoCode3: country.isoCode3,
        flagEmoji: referenceCountryByIso.get(country.isoCode)?.flagEmoji ?? country.flagEmoji,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
      }))}
      referenceCountries={referenceCountries}
    />
  );
}

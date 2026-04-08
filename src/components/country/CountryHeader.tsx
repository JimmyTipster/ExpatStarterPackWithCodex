import type { Country } from "@/data/types";
import { FlagIcon } from "@/components/shared/FlagIcon";
import { PremiumBadge } from "@/components/shared/PremiumBadge";
import { ShareButton } from "@/components/shared/ShareButton";
import { SOSButton } from "@/components/country/SOSButton";

interface CountryHeaderProps {
  country: Country;
  isPremium: boolean;
}

const statLabels = [
  "Capital",
  "Language",
  "Currency",
  "Population",
  "Calling code",
  "Emergency #",
  "Timezone",
  "Drives on",
] as const;

export function CountryHeader({ country, isPremium }: CountryHeaderProps) {
  const statValues = [
    country.capital,
    country.officialLanguages.join(", "),
    `${country.currency.code} (${country.currency.symbol})`,
    `${country.population.toLocaleString("en-US")} (${country.populationYear})`,
    country.callingCode,
    country.emergencyNumber,
    country.timezones[0] ?? "Varies",
    country.drivesOn,
  ];

  return (
    <section className="rounded-[2rem] border border-border/80 bg-card/94 p-6 shadow-[0_24px_60px_rgba(45,52,54,0.1)] sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex size-16 items-center justify-center rounded-[1.6rem] bg-secondary text-4xl">
              <FlagIcon code={country.isoCode} fallback={country.flagEmoji} />
            </div>
            <div>
              <h1 className="text-4xl text-foreground sm:text-5xl">{country.name}</h1>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-primary">
                Moving to {country.name} as an expat in 2026
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            {country.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ShareButton
            title={`Moving to ${country.name} as an expat`}
            text={`Explore the ${country.name} guide on Expat Starter Pack.`}
          />
          <PremiumBadge isPremium={isPremium} />
          <SOSButton />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statLabels.map((label, index) => (
          <div key={label} className="rounded-[1.35rem] border border-border/70 bg-background/80 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <p className="mt-2 text-sm font-semibold text-foreground">{statValues[index]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

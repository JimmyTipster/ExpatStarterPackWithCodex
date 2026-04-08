import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function DailyLifeSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="daily"
      title="Daily life"
      description="The practical norms that shape whether you feel settled quickly or surprised every other day."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Shops, opening hours, and payments</p>
          <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
            <p>Supermarkets: {country.dailyLife.supermarketChains.join(", ")}</p>
            <p>{country.dailyLife.openingHours}</p>
            <p>{country.dailyLife.paymentHabits}</p>
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Recycling, dining, and housing</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {country.dailyLife.recyclingRules.map((rule) => (
              <p key={rule}>{rule}</p>
            ))}
            {country.dailyLife.diningNorms.map((norm) => (
              <p key={norm}>{norm}</p>
            ))}
            {country.dailyLife.housingTips.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

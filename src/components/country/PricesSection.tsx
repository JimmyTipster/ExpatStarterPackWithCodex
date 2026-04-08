import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function PricesSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="prices"
      title="Typical prices"
      description="A quick way to calibrate day-to-day costs without diving into a full budget spreadsheet."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {country.priceGuide.sections.map((section) => (
          <div key={section.category} className="rounded-[1.35rem] bg-background/85 p-5">
            <p className="font-semibold text-foreground">{section.category}</p>
            <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              {section.entries.map((entry) => (
                <p key={entry.item}>
                  <span className="font-semibold text-foreground">{entry.item}</span>: {entry.averagePrice}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CountrySectionShell>
  );
}

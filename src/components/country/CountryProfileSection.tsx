import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function CountryProfileSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="profile"
      title="Country profile"
      description="A quick cultural and practical orientation before you dive into the admin steps."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">History and society</p>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            {country.history.slice(0, 3).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {country.demographics.slice(0, 4).map((entry) => (
              <div key={entry.label} className="rounded-[1.1rem] bg-card p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{entry.label}</p>
                <p className="mt-1 font-medium text-foreground">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Climate, food, and highlights</p>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            {country.climate.slice(0, 3).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <p className="text-sm font-semibold text-foreground">Traditional foods</p>
          <div className="flex flex-wrap gap-2">
            {country.traditionalFoods.slice(0, 4).map((item) => (
              <span key={item.name} className="rounded-full bg-secondary/70 px-3 py-1 text-xs text-foreground">
                {item.name}
              </span>
            ))}
          </div>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            {country.touristHighlights.slice(0, 3).map((item) => (
              <p key={item.name}>
                <span className="font-semibold text-foreground">{item.name}</span>: {item.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

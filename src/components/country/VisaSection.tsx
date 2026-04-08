import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function VisaSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="visa"
      title="Visas and permits"
      description="The main legal pathways newcomers tend to use."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Overview</p>
          <p className="mt-3">{country.visaInfo.overview}</p>
          <p className="mt-3">{country.visaInfo.entryRequirements}</p>
          {country.visaInfo.blueCardSummary ? <p className="mt-3">{country.visaInfo.blueCardSummary}</p> : null}
        </div>
        <div className="space-y-3">
          {country.visaInfo.visaTypes.map((visa) => (
            <div key={visa.name} className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
              <p className="font-semibold text-foreground">{visa.name}</p>
              <p className="mt-2">{visa.idealFor}</p>
              <p>{visa.duration}</p>
              <p>{visa.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </CountrySectionShell>
  );
}

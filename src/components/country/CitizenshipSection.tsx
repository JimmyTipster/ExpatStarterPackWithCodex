import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function CitizenshipSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="citizenship"
      title="Residency and citizenship"
      description="The long-view path from lawful residence to permanent status or naturalization."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Permanent status</p>
          <p className="mt-3">{country.citizenship.permanentResidency}</p>
          <p className="mt-3">{country.citizenship.naturalizationYears}</p>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Dual citizenship and by-birth rules</p>
          <p className="mt-3">{country.citizenship.birthrightCitizenship}</p>
          <p className="mt-3">{country.citizenship.dualCitizenship}</p>
        </div>
      </div>
    </CountrySectionShell>
  );
}

import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function PetRelocationSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="pets"
      title="Pet relocation"
      description="The main import, health, and local registration details for animals."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Import requirements</p>
          <p className="mt-3">{country.petRelocationInfo.overview}</p>
          <div className="mt-3 space-y-2">
            {country.petRelocationInfo.importRequirements.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Local pet setup</p>
          {country.petRelocationInfo.dogTaxNotes ? <p className="mt-3">{country.petRelocationInfo.dogTaxNotes}</p> : null}
          <div className="mt-3 space-y-2">
            {country.petRelocationInfo.vetTips.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

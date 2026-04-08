import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function LeavingSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="leaving"
      title="Leaving the country"
      description="The admin steps that matter when you eventually move on."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Departure checklist</p>
          <div className="mt-3 space-y-2">
            {country.leavingCountryInfo.tasks.map((task) => (
              <p key={task}>{task}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Tax and pension portability</p>
          <p className="mt-3">{country.leavingCountryInfo.taxClearance}</p>
          <p className="mt-3">{country.leavingCountryInfo.pensionPortability}</p>
        </div>
      </div>
    </CountrySectionShell>
  );
}

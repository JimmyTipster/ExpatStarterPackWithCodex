import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function TransportSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="transport"
      title="Transport"
      description="How people usually move around, what passes matter, and where driving starts to bite."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Transit overview</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {country.transportInfo.publicTransitOverview}
          </p>
          <div className="mt-4 space-y-3">
            {country.transportInfo.localTransitPasses.map((mode) => (
              <div key={mode.name} className="rounded-[1.1rem] bg-card p-3">
                <p className="font-medium text-foreground">{mode.name}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[1.35rem] bg-background/85 p-5">
            <p className="font-semibold text-foreground">Long-distance travel and taxis</p>
            <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              {country.transportInfo.longDistanceTravel.map((mode) => (
                <p key={mode.name}>
                  <span className="font-semibold text-foreground">{mode.name}</span>: {mode.description}
                </p>
              ))}
              <p>Taxi apps: {country.transportInfo.taxiApps.join(", ")}</p>
            </div>
          </div>
          <div className="rounded-[1.35rem] bg-background/85 p-5">
            <p className="font-semibold text-foreground">Cycling and driving notes</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {country.transportInfo.cyclingCulture}
            </p>
            <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
              {country.transportInfo.drivingNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

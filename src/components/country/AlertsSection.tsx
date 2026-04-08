import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function AlertsSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="alerts"
      title="Costly mistakes"
      description="The things people regret not knowing earlier."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {country.alerts.map((alert) => (
          <div key={alert.title} className="rounded-[1.35rem] border border-border/70 bg-background/85 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {alert.severity}
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">{alert.title}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{alert.description}</p>
            <p className="mt-3 text-sm font-medium text-[var(--danger)]">{alert.consequence}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{alert.howToAvoid}</p>
          </div>
        ))}
      </div>
    </CountrySectionShell>
  );
}

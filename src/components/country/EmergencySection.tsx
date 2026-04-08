import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function EmergencySection({ country }: { country: Country }) {
  const emergency = country.emergencyServices;

  return (
    <CountrySectionShell
      id="emergency"
      title="Emergency and urgent help"
      description="These numbers stay free by design so urgent information is always available when you need it."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["General emergency", emergency.generalEmergency],
          ["Police", emergency.police],
          ["Fire", emergency.fire],
          ["Ambulance", emergency.ambulance],
          ["Weekend doctor", `${emergency.weekendDoctor.localName} • ${emergency.weekendDoctor.phone}`],
          ["Mental health", emergency.mentalHealthHotline?.phone ?? "Check local support line"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.35rem] border border-border/70 bg-background/85 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Calling instructions</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {emergency.callingInstructions.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">{emergency.weekendDoctor.name}</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            <p>{emergency.weekendDoctor.accessNotes}</p>
            <p>Hours: {emergency.weekendDoctor.hours}</p>
            {emergency.roadAssistance ? <p>Road assistance: {emergency.roadAssistance.phone}</p> : null}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

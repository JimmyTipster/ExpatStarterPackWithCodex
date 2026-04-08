import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function CommunitySection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="community"
      title="Community and integration"
      description="The social norms and practical habits that usually make integration easier."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Social culture</p>
          <p className="mt-3">{country.socialCulture.communicationStyle}</p>
          <p className="mt-3">{country.socialCulture.punctuality}</p>
          <div className="mt-3 space-y-2">
            {country.socialCulture.socialNorms.map((norm) => (
              <p key={norm}>{norm}</p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">Integration tips</p>
          <div className="mt-3 space-y-2">
            {country.socialCulture.integrationTips.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

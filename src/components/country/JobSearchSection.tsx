import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";
import { ServiceCard } from "@/components/shared/ServiceCard";

export function JobSearchSection({ country }: { country: Country }) {
  const jobs = country.jobSearchInfo;

  return (
    <CountrySectionShell
      id="jobs"
      title="Job search"
      description="Public agencies, platform mix, and what job hunting tends to look like locally."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">{jobs.publicEmploymentService.localName}</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            <p>{jobs.publicEmploymentService.registrationProcess}</p>
            <p>{jobs.publicEmploymentService.eligibilityForExpats}</p>
            <p>{jobs.workPermitInfo.nonEuCitizens}</p>
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Work culture snapshot</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            <p>{jobs.workCulture.typicalHours}</p>
            <p>{jobs.workCulture.vacationDays}</p>
            <p>{jobs.workCulture.trialPeriod}</p>
            <p>{jobs.applicationTips.cvFormat}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {jobs.jobPlatforms.map((platform) => (
          <ServiceCard key={platform.name} service={platform} />
        ))}
      </div>
    </CountrySectionShell>
  );
}

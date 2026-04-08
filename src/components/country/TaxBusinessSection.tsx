import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function TaxBusinessSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="tax"
      title="Taxes and business"
      description="The basics of payroll deductions, tax structure, and company setup options."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Income tax and deductions</p>
          <div className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {country.taxInfo.incomeTaxBrackets.map((bracket) => (
              <p key={bracket.range}>
                <span className="font-semibold text-foreground">{bracket.range}</span>: {bracket.rate}
              </p>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
            {country.taxInfo.socialSecurityContributions.map((item) => (
              <p key={item.name}>
                {item.name}: {item.employeeShare}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">Business setup and freelancing</p>
          <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
            {country.businessTypes.map((business) => (
              <p key={business.localName}>
                <span className="font-semibold text-foreground">{business.localName}</span>: {business.idealFor}
              </p>
            ))}
            <p>{country.freelancerGuide.overview}</p>
            <p>{country.freelancerGuide.taxSetup}</p>
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

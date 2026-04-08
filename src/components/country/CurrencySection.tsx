import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function CurrencySection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="currency"
      title="Currency and payment culture"
      description="The basics of paying for daily life, from cash habits to ATM behavior."
    >
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Currency</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {country.currency.code} {country.currency.symbol}
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{country.currency.name}</p>
        </div>
        <div className="rounded-[1.35rem] bg-background/85 p-5">
          <p className="font-semibold text-foreground">How payments usually work</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {country.currency.paymentCulture}
          </p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
            {country.currency.atmTips.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </div>
      </div>
    </CountrySectionShell>
  );
}

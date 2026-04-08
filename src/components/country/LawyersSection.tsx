import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";
import { ServiceCard } from "@/components/shared/ServiceCard";

export function LawyersSection({ country }: { country: Country }) {
  return (
    <CountrySectionShell
      id="lawyers"
      title="Professional services"
      description="Where specialist help usually matters most for expats."
    >
      <div className="space-y-4">
        {country.professionalServices.categories.map((category) => (
          <div key={category.category} className="space-y-3">
            <div>
              <h3 className="text-xl text-foreground">{category.category}</h3>
              <p className="mt-1 text-sm leading-7 text-muted-foreground">{category.overview}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {category.providers.map((provider) => (
                <ServiceCard key={`${category.category}-${provider.name}`} service={provider} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CountrySectionShell>
  );
}

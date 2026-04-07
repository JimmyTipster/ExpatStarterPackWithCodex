import Link from "next/link";

import { getAllCountries } from "@/data/countries";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CountriesPage() {
  const countries = await getAllCountries();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Countries
        </p>
        <h1 className="font-heading text-4xl text-foreground">Country browser</h1>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          Phase 2 now loads the first real country dataset. Search and broader rollout
          will expand as more countries are added.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {countries.map((country) => (
          <Link key={country.slug} href={`/country/${country.slug}`} className="group">
            <Card className="h-full border-border/70 bg-card/90 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-primary/30">
              <CardHeader className="space-y-3">
                <CardTitle className="font-heading text-2xl">{country.name}</CardTitle>
                <CardDescription className="space-y-1 text-sm leading-7 text-muted-foreground">
                  <span className="block">Capital: {country.capital}</span>
                  <span className="block">Region: {country.region}</span>
                  <span className="block">Tasks loaded: {country.tasks.length}</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { getAllCountries } from "@/data/countries";
import { CountrySearch } from "@/components/shared/CountrySearch";

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
          Browse the current launch-country set, filter by region, and jump straight into the
          country guide that matches your move.
        </p>
      </div>
      <CountrySearch
        countries={countries.map((country) => ({
          slug: country.slug,
          name: country.name,
          isoCode: country.isoCode,
          capital: country.capital,
          region: country.region,
          taskCount: country.tasks.length,
          description: country.description,
        }))}
        showRegionFilter
      />
    </div>
  );
}

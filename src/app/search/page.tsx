import { getAllCountries } from "@/data/countries";
import { GlobalSearchResults, type GlobalSearchItem } from "@/components/search/GlobalSearchResults";

export default async function SearchPage() {
  const countries = await getAllCountries();
  const items: GlobalSearchItem[] = countries.flatMap((country) => [
    {
      type: "country",
      slug: country.slug,
      countryName: country.name,
      isoCode: country.isoCode,
      region: country.region,
      summary: country.description,
    },
    ...country.tasks.slice(0, 12).map((task) => ({
      type: "task" as const,
      slug: country.slug,
      countryName: country.name,
      isoCode: country.isoCode,
      title: task.title,
      summary: task.description,
    })),
    ...country.jobSearchInfo.jobPlatforms.slice(0, 4).map((service) => ({
      type: "service" as const,
      slug: country.slug,
      countryName: country.name,
      isoCode: country.isoCode,
      title: service.name,
      summary: service.description,
    })),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Search</p>
        <h1 className="font-heading text-4xl text-foreground">Find a country guide fast</h1>
        <p className="max-w-3xl text-base leading-8 text-muted-foreground">
          Search across countries, task titles, and key public or job-search services from the
          launch-country set.
        </p>
      </div>
      <GlobalSearchResults items={items} />
    </div>
  );
}

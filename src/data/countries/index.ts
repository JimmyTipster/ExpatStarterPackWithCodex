import Fuse from "fuse.js";

import type { Country } from "@/data/types";

const COUNTRY_LOADERS = {
  australia: () => import("@/data/countries/australia").then((module) => module.australia),
  belgium: () => import("@/data/countries/belgium").then((module) => module.belgium),
  canada: () => import("@/data/countries/canada").then((module) => module.canada),
  france: () => import("@/data/countries/france").then((module) => module.france),
  germany: () => import("@/data/countries/germany").then((module) => module.germany),
  netherlands: () =>
    import("@/data/countries/netherlands").then((module) => module.netherlands),
  portugal: () => import("@/data/countries/portugal").then((module) => module.portugal),
  spain: () => import("@/data/countries/spain").then((module) => module.spain),
  switzerland: () =>
    import("@/data/countries/switzerland").then((module) => module.switzerland),
  "united-kingdom": () =>
    import("@/data/countries/united-kingdom").then((module) => module.unitedKingdom),
  "united-states": () =>
    import("@/data/countries/united-states").then((module) => module.unitedStates),
} as const;

type CountrySlug = keyof typeof COUNTRY_LOADERS;

export async function getAllCountries(): Promise<Country[]> {
  return Promise.all(Object.values(COUNTRY_LOADERS).map((loader) => loader()));
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const loader = COUNTRY_LOADERS[slug as CountrySlug];

  if (!loader) {
    return null;
  }

  return loader();
}

export function getCountrySlugs(): string[] {
  return Object.keys(COUNTRY_LOADERS);
}

export async function searchCountries(query: string): Promise<Country[]> {
  const countries = await getAllCountries();
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return countries;
  }

  const fuse = new Fuse(countries, {
    keys: ["name", "slug", "isoCode", "isoCode3", "capital", "region", "subregion"],
    threshold: 0.3,
  });

  return fuse.search(trimmedQuery).map((result) => result.item);
}

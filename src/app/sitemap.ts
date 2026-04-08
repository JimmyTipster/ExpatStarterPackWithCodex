import type { MetadataRoute } from "next";

import { getAllCountries } from "@/data/countries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const countries = await getAllCountries();

  return [
    "",
    "/countries",
    "/search",
    "/pricing",
    "/blog",
    "/about",
    "/privacy",
    "/terms",
    ...countries.map((country) => `/country/${country.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}

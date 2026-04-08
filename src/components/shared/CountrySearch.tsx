"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

import { FlagIcon } from "@/components/shared/FlagIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CountrySearchItem {
  slug: string;
  name: string;
  isoCode: string;
  capital: string;
  region: string;
  taskCount: number;
  description: string;
}

interface CountrySearchProps {
  countries: CountrySearchItem[];
  showRegionFilter?: boolean;
}

const regionOptions = ["All", "Europe", "Asia-Pacific", "Americas", "Africa", "Middle East"];

export function CountrySearch({ countries, showRegionFilter = false }: CountrySearchProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const regionFiltered =
      region === "All" ? countries : countries.filter((country) => country.region === region);

    if (!deferredQuery.trim()) {
      return regionFiltered;
    }

    const fuse = new Fuse(regionFiltered, {
      keys: ["name", "capital", "region", "isoCode", "description"],
      threshold: 0.3,
    });

    return fuse.search(deferredQuery.trim()).map((result) => result.item);
  }, [countries, deferredQuery, region]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border/80 bg-card/94 p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search countries, capitals, or regions"
            className="h-12 rounded-2xl pl-11"
          />
        </div>
        {showRegionFilter ? (
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((option) => (
              <Button
                key={option}
                type="button"
                variant={region === option ? "default" : "outline"}
                onClick={() => setRegion(option)}
                className="rounded-full"
              >
                {option}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((country) => (
          <Link key={country.slug} href={`/country/${country.slug}`} className="group">
            <Card className="h-full rounded-[1.75rem] border-border/80 bg-card/94 transition-transform duration-200 group-hover:-translate-y-1">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-2xl">
                    <FlagIcon code={country.isoCode} />
                  </span>
                  <div>
                    <CardTitle className="text-2xl">{country.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{country.capital}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{country.description}</p>
                <div className="flex items-center justify-between">
                  <span>{country.region}</span>
                  <span>{country.taskCount} tasks</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

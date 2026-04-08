"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { BriefcaseBusiness, FileText, Globe2, Search } from "lucide-react";

import { FlagIcon } from "@/components/shared/FlagIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SearchCountryItem {
  type: "country";
  slug: string;
  countryName: string;
  isoCode: string;
  region: string;
  summary: string;
}

interface SearchTaskItem {
  type: "task";
  slug: string;
  countryName: string;
  isoCode: string;
  title: string;
  summary: string;
}

interface SearchServiceItem {
  type: "service";
  slug: string;
  countryName: string;
  isoCode: string;
  title: string;
  summary: string;
}

export type GlobalSearchItem = SearchCountryItem | SearchTaskItem | SearchServiceItem;

interface GlobalSearchResultsProps {
  items: GlobalSearchItem[];
}

function ResultIcon({ item }: { item: GlobalSearchItem }) {
  if (item.type === "country") {
    return <Globe2 className="size-4" />;
  }

  if (item.type === "task") {
    return <FileText className="size-4" />;
  }

  return <BriefcaseBusiness className="size-4" />;
}

export function GlobalSearchResults({ items }: GlobalSearchResultsProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) {
      return items.slice(0, 18);
    }

    const fuse = new Fuse(items, {
      keys: ["countryName", "title", "summary", "region", "slug"],
      threshold: 0.34,
    });

    return fuse.search(deferredQuery.trim()).map((result) => result.item);
  }, [deferredQuery, items]);

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] border border-border/80 bg-card/94 p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search countries, tasks, job platforms, and public services"
            className="h-12 rounded-2xl pl-11"
            aria-label="Search countries, tasks, and services"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((item) => {
          const displayTitle = "title" in item ? item.title : item.countryName;

          return (
            <Link
              key={`${item.type}-${item.slug}-${displayTitle}`}
              href={`/country/${item.slug}`}
              className="group"
            >
              <Card className="h-full rounded-[1.75rem] border-border/80 bg-card/94 transition-transform duration-200 group-hover:-translate-y-1">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-xl">
                      <FlagIcon code={item.isoCode} />
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <ResultIcon item={item} />
                        <span className="capitalize">{item.type}</span>
                      </div>
                      <CardTitle className="text-xl">{displayTitle}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{item.countryName}</p>
                  <p>{item.summary}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Check, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { WizardCountryOption } from "@/components/wizard/types";

type CountryValueKey = "slug" | "isoCode";

interface CountrySearchFieldProps {
  label: string;
  description?: string;
  placeholder: string;
  emptyState: string;
  countries: WizardCountryOption[];
  selectedValue: string;
  valueKey?: CountryValueKey;
  onSelect: (country: WizardCountryOption) => void;
}

function getOptionValue(option: WizardCountryOption, valueKey: CountryValueKey) {
  return valueKey === "slug" ? option.slug ?? "" : option.isoCode;
}

function getFilteredCountries(countries: WizardCountryOption[], query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return countries.slice(0, 10);
  }

  const fuse = new Fuse(countries, {
    keys: ["name", "isoCode", "isoCode3", "slug", "capital", "region", "subregion"],
    threshold: 0.28,
  });

  return fuse.search(trimmedQuery).map((result) => result.item).slice(0, 10);
}

export function CountrySearchField({
  label,
  description,
  placeholder,
  emptyState,
  countries,
  selectedValue,
  valueKey = "isoCode",
  onSelect,
}: CountrySearchFieldProps) {
  const selectedCountry =
    countries.find((country) => getOptionValue(country, valueKey) === selectedValue) ?? null;
  const [query, setQuery] = useState(selectedCountry?.name ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const results = getFilteredCountries(countries, deferredQuery);

  useEffect(() => {
    setQuery(selectedCountry?.name ?? "");
  }, [selectedCountry]);

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setIsOpen(false), 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          className="h-14 rounded-2xl border-border/80 bg-background pl-11 text-base shadow-none"
        />
        {selectedCountry ? (
          <div className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-xs font-medium text-primary sm:flex">
            <span>{selectedCountry.flagEmoji}</span>
            <span>{selectedCountry.isoCode}</span>
          </div>
        ) : null}
        {isOpen ? (
          <div className="absolute inset-x-0 z-20 mt-3 overflow-hidden rounded-[1.5rem] border border-border/80 bg-card shadow-[0_28px_60px_rgba(45,52,54,0.12)]">
            {results.length ? (
              <div className="max-h-72 overflow-y-auto p-2">
                {results.map((country) => {
                  const isSelected = getOptionValue(country, valueKey) === selectedValue;

                  return (
                    <button
                      key={`${country.isoCode}-${country.slug ?? country.name}`}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        onSelect(country);
                        setQuery(country.name);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex min-h-14 w-full items-center gap-3 rounded-[1.1rem] px-3 py-3 text-left transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary/55",
                      )}
                    >
                      <span className="text-xl">{country.flagEmoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{country.name}</p>
                        <p
                          className={cn(
                            "truncate text-xs",
                            isSelected ? "text-primary-foreground/75" : "text-muted-foreground",
                          )}
                        >
                          {[country.isoCode, country.capital, country.region]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                      {isSelected ? <Check className="size-4 shrink-0" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="px-4 py-5 text-sm text-muted-foreground">{emptyState}</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

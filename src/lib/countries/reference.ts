import { readdir } from "node:fs/promises";
import path from "node:path";

import getCountryFlag from "country-flag-icons/unicode";

import type { WizardCountryOption } from "@/components/wizard/types";

let cachedCountries: WizardCountryOption[] | null = null;

export async function getReferenceCountries(): Promise<WizardCountryOption[]> {
  if (cachedCountries) {
    return cachedCountries;
  }

  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
  const flagsDirectory = path.join(
    process.cwd(),
    "node_modules",
    "country-flag-icons",
    "string",
    "3x2",
  );
  const entries = await readdir(flagsDirectory, { withFileTypes: true });

  cachedCountries = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name.replace(/\.js$/, ""))
    .filter((code) => /^[A-Z]{2}$/.test(code) && !["EU", "UN"].includes(code))
    .map((isoCode) => {
      const name = displayNames.of(isoCode);

      if (!name || name === isoCode) {
        return null;
      }

      return {
        name,
        isoCode,
        flagEmoji: getCountryFlag(isoCode),
      } satisfies WizardCountryOption;
    })
    .filter((country): country is WizardCountryOption => country !== null)
    .sort((a, b) => a.name.localeCompare(b.name));

  return cachedCountries;
}

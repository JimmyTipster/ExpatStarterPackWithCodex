const EU_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
] as const;

const EEA_COUNTRIES = [...EU_COUNTRIES, "IS", "LI", "NO"] as const;

export function isEuCitizen(isoCode: string) {
  return EU_COUNTRIES.includes(isoCode.toUpperCase() as (typeof EU_COUNTRIES)[number]);
}

export function isEeaCitizen(isoCode: string) {
  return EEA_COUNTRIES.includes(isoCode.toUpperCase() as (typeof EEA_COUNTRIES)[number]);
}

export function hasFreeMoveRight(fromIso: string, toIso: string) {
  return isEeaCitizen(fromIso) && isEeaCitizen(toIso);
}

export { EEA_COUNTRIES, EU_COUNTRIES };

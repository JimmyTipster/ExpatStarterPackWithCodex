"use client";

import { useMemo } from "react";

import type { Country } from "@/data/types";
import { generateChecklist } from "@/lib/checklist/generator";
import { useUserProfileStore } from "@/stores/userProfileStore";

export function useChecklist(country: Country) {
  const profile = useUserProfileStore();

  return useMemo(
    () => ({
      profile,
      tasks: generateChecklist(country, profile),
    }),
    [country, profile],
  );
}

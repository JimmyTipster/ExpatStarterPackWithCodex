"use client";

import { useMemo, useState } from "react";

import type { Country } from "@/data/types";
import { CountrySectionShell } from "@/components/country/CountrySectionShell";

export function DocumentsSection({ country }: { country: Country }) {
  const documents = useMemo(
    () =>
      Array.from(
        new Set(country.tasks.flatMap((task) => task.documentsNeeded).filter(Boolean)),
      ).slice(0, 18),
    [country.tasks],
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <CountrySectionShell
      id="documents"
      title="Document checklist"
      description="Use this lightweight checklist while you collect the paperwork that appears over and over again."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {documents.map((document) => {
          const isChecked = Boolean(checked[document]);

          return (
            <button
              key={document}
              type="button"
              onClick={() => setChecked((current) => ({ ...current, [document]: !current[document] }))}
              className={`flex min-h-14 items-center justify-between rounded-[1.35rem] border px-4 py-3 text-left transition-colors ${
                isChecked
                  ? "border-primary/25 bg-primary/10 text-foreground"
                  : "border-border/70 bg-background/85 text-muted-foreground hover:bg-secondary/45"
              }`}
            >
              <span className="font-medium">{document}</span>
              <span className="text-xs uppercase tracking-[0.18em]">
                {isChecked ? "Ready" : "Pending"}
              </span>
            </button>
          );
        })}
      </div>
    </CountrySectionShell>
  );
}

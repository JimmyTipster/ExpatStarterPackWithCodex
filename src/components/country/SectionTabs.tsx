"use client";

import { useEffect, useMemo, useState } from "react";
import { Gem } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SectionTabItem {
  id: string;
  label: string;
  icon: string;
  isPremium?: boolean;
}

function getIconEmoji(icon: string) {
  const map: Record<string, string> = {
    checklist: "✓",
    emergency: "SOS",
    profile: "i",
    holidays: "📅",
    currency: "€",
    documents: "📄",
    transport: "🚆",
    daily: "☕",
    alerts: "!",
    jobs: "💼",
    tax: "₿",
    education: "🎓",
    citizenship: "🪪",
    visa: "🛂",
    lawyers: "⚖",
    leaving: "↗",
    pets: "🐾",
    prices: "💶",
    community: "👋",
  };

  return map[icon] ?? "•";
}

export function SectionTabs({ sections }: { sections: SectionTabItem[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!observers.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: [0.25, 0.5, 0.75],
      },
    );

    observers.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <div className="sticky top-[4.9rem] z-30 -mx-2 overflow-x-auto px-2">
      <div className="inline-flex min-w-full gap-2 rounded-[1.4rem] border border-border/80 bg-background/88 p-2 backdrop-blur">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
              activeId === section.id
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                : "border-transparent text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <span className="text-xs">{getIconEmoji(section.icon)}</span>
            <span>{section.label}</span>
            {section.isPremium ? <Gem className="size-3.5 text-[color:var(--premium)]" /> : null}
          </a>
        ))}
      </div>
    </div>
  );
}

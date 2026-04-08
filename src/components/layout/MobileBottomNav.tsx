"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Globe2, House, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/countries", label: "Countries", icon: Globe2 },
  { href: "/profile", label: "My Progress", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      data-mobile-nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 px-2 py-2 backdrop-blur md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

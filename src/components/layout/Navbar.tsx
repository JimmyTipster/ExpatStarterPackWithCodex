"use client";

import Link from "next/link";
import { DarkModeToggle } from "@/components/layout/DarkModeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/countries", label: "Countries" },
  { href: "/search", label: "Search" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            ES
          </span>
          <div>
            <p className="font-heading text-lg text-foreground sm:text-xl">Expat Starter Pack</p>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Start Abroad With Clarity
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1 rounded-full border border-border/70 bg-card/85 p-1">
            {navLinks.map((item) => (
              <Button key={item.href} asChild variant="ghost" className="rounded-full px-4">
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <DarkModeToggle />
          <Button
            asChild
            className="rounded-full bg-[var(--accent)] px-5 text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
          >
            <Link href={isLoggedIn ? "/profile" : "/login"}>{isLoggedIn ? "Profile" : "Login"}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

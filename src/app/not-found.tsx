import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.22em] text-primary">404</p>
      <h1 className="text-5xl text-foreground">That route is not in the starter pack.</h1>
      <p className="max-w-2xl text-base leading-8 text-muted-foreground">
        Try searching for a country guide, head back to the country browser, or restart from the
        onboarding flow.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]">
          <Link href="/search">Search countries</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/countries">Browse countries</Link>
        </Button>
      </div>
    </div>
  );
}

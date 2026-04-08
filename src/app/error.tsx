"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-5 px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Something broke</p>
      <h1 className="font-heading text-4xl text-foreground">We hit an unexpected error.</h1>
      <p className="max-w-2xl text-base leading-8 text-muted-foreground">
        The page did not finish loading properly. You can retry the request or head back to a stable
        part of the app.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={reset} className="rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]">
          Try again
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}

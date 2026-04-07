import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  primaryCtaHref = "/",
  primaryCtaLabel = "Back to home",
  secondaryCtaHref,
  secondaryCtaLabel,
}: PlaceholderPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Card className="w-full rounded-[2rem] border-border/80 bg-card/95 shadow-[0_18px_50px_rgba(45,52,54,0.08)]">
        <CardHeader className="space-y-5 p-8 sm:p-10">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Construction className="size-5" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-primary">
              {eyebrow}
            </p>
            <CardTitle className="font-heading text-4xl leading-tight text-balance">
              {title}
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-8 text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-8 pt-0 sm:flex-row sm:p-10 sm:pt-0">
          <Button
            asChild
            size="lg"
            className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
          >
            <Link href={primaryCtaHref}>
              {primaryCtaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          {secondaryCtaHref && secondaryCtaLabel ? (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

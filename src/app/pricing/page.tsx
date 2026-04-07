import { Check } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const freeFeatures = [
  "Core layout and route shell",
  "Public homepage and country browser scaffolding",
  "Emergency-first product direction",
];

const premiumFeatures = [
  "Checklist detail unlocks",
  "Taxes, visas, and job guidance",
  "Education, community, and pricing tabs",
];

export default function PricingPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Pricing
        </p>
        <h1 className="font-heading text-4xl text-foreground">
          A simple one-time premium unlock.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground">
          The pricing route is scaffolded now so the app shell is complete. Stripe
          checkout and premium state handling arrive in a later phase.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Free</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {freeFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 text-[var(--success)]" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-[color:var(--premium)] bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(250,248,245,0.98))] dark:bg-[linear-gradient(180deg,rgba(255,215,0,0.12),rgba(30,30,30,0.98))]">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Premium $2</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 text-[var(--premium)]" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

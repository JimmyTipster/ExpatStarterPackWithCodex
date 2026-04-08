import Link from "next/link";
import { ArrowRight, Compass, Globe2, ShieldAlert, Wallet } from "lucide-react";

import { getAllCountries } from "@/data/countries";
import { CountrySearch } from "@/components/shared/CountrySearch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const howItWorks = [
  {
    title: "Take the quiz",
    description:
      "Tell us where you are going, where you are from, and what kind of move you are making.",
  },
  {
    title: "Get your checklist",
    description:
      "See the tasks that actually apply to your visa rights, family setup, and work situation.",
  },
  {
    title: "Stay on track",
    description:
      "Track progress, keep deadlines visible, and prepare for reminders as the product grows.",
  },
];

const highlights = [
  {
    icon: Globe2,
    title: "Country-specific guidance",
    description:
      "The app is built to adapt by destination, not force one generic relocation checklist on everyone.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency info stays free",
    description:
      "Safety-critical numbers and medical after-hours information remain visible without a paywall.",
  },
  {
    icon: Wallet,
    title: "Simple premium unlock",
    description:
      "A one-time $2 upgrade unlocks the deeper legal, job, tax, and schooling guidance later in the build.",
  },
];

export default async function Home() {
  const countries = await getAllCountries();
  const featuredCountries = countries.slice(0, 6).map((country) => ({
    slug: country.slug,
    isoCode: country.isoCode,
    name: country.name,
    note: country.description,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Expat Starter Pack helps you move abroad",
    step: [
      { "@type": "HowToStep", name: "Take the quiz" },
      { "@type": "HowToStep", name: "Get your personalized checklist" },
      { "@type": "HowToStep", name: "Track your move progress" },
    ],
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="grid gap-8 rounded-[2rem] border border-border/80 bg-card/90 p-8 shadow-[0_24px_80px_rgba(45,52,54,0.08)] backdrop-blur md:grid-cols-[1.15fr_0.85fr] md:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Move Abroad With A Plan
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl font-heading text-4xl leading-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Your personalized guide to starting a new life abroad.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Tell us who you are, where you&apos;re going, and we&apos;ll shape a
              relocation checklist around your real-world situation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_86%,black)]"
            >
              <Link href="/wizard">
                Start the quiz
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/countries">Browse countries</Link>
            </Button>
          </div>
        </div>

        <Card className="border-border/70 bg-background/80 shadow-none">
          <CardHeader className="space-y-3">
            <CardTitle className="font-heading text-2xl">The platform is taking shape</CardTitle>
            <CardDescription className="text-sm leading-7 text-muted-foreground">
              The wizard, country browser, launch-country data layer, personalized checklist engine,
              premium gating, and auth-ready profile shell are now connected end to end.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="grid gap-3">
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="font-medium text-foreground">What you can do now</p>
                <p className="mt-1 leading-6">
                  Complete the onboarding flow, open a country guide, and see your checklist adapt
                  to your move profile.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="font-medium text-foreground">What is expanding next</p>
                <p className="mt-1 leading-6">
                  More country detail, account sync, premium checkout, reminders, and SEO layers
                  continue building on the same product spine.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {howItWorks.map((item, index) => (
          <Card key={item.title} className="border-border/70 bg-card/90">
            <CardHeader>
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-primary/10 font-mono text-sm text-primary">
                0{index + 1}
              </div>
              <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
              <CardDescription className="text-sm leading-7 text-muted-foreground">
                {item.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Featured launch countries
            </p>
            <h2 className="mt-2 font-heading text-3xl text-foreground">
              Scaffolded destinations
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/countries">See loaded countries</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredCountries.map((country) => (
            <Link key={country.slug} href={`/country/${country.slug}`} className="group">
              <Card className="h-full border-border/70 bg-card/90 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-primary/30">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary font-mono text-sm text-primary">
                      {country.isoCode}
                    </span>
                    <CardTitle className="font-heading text-2xl">
                      {country.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-7 text-muted-foreground">
                    {country.note}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
            Browse first
          </p>
          <h2 className="mt-2 font-heading text-3xl text-foreground">
            Jump into a destination before you take the quiz
          </h2>
        </div>
        <CountrySearch
          countries={countries.map((country) => ({
            slug: country.slug,
            name: country.name,
            isoCode: country.isoCode,
            capital: country.capital,
            region: country.region,
            taskCount: country.tasks.length,
            description: country.description,
          }))}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="border-border/70 bg-card/90">
              <CardHeader>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-7 text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <section className="rounded-[2rem] border border-border/80 bg-[linear-gradient(135deg,rgba(27,67,50,0.96),rgba(200,75,49,0.9))] px-8 py-10 text-white shadow-[0_20px_60px_rgba(27,67,50,0.24)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/70">
              Premium direction
            </p>
            <h2 className="mt-2 font-heading text-3xl">
              Premium deepens the guidance once the basics are covered.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Free sections keep the essentials available, while premium expands the legal, tax,
              education, visa, price, and community detail across each country guide.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="border-white/15 bg-white text-primary hover:bg-white/90"
          >
            <Link href="/pricing">
              Explore pricing
              <Compass className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

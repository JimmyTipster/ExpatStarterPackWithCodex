import { Check } from "lucide-react";

import { CheckoutButton } from "@/components/pricing/CheckoutButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const freeFeatures = [
  "Personalized checklist core",
  "Emergency numbers and essential country profile",
  "Documents, daily life, transport, and holidays",
];

const premiumFeatures = [
  "Alerts, jobs, tax, and business detail",
  "Education, citizenship, visa, and lawyer guidance",
  "Pet relocation, prices, leaving-country, and community sections",
];

const faqItems = [
  {
    question: "Is premium a subscription?",
    answer: "No. Premium is a one-time $2 unlock for the deeper country guidance.",
  },
  {
    question: "What stays free?",
    answer: "Core checklist guidance, emergency details, country basics, holidays, transport, documents, currency, and daily-life essentials stay free.",
  },
  {
    question: "Do I need an account before paying?",
    answer: "Yes. Logging in lets us attach the premium purchase to your profile and keep it available across sessions.",
  },
];

export default function PricingPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
          Pricing
        </p>
        <h1 className="font-heading text-4xl text-foreground">
          A simple one-time premium unlock.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground">
          Premium is a one-time unlock for the deeper relocation guidance. Essential safety and
          core checklist information stay free.
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
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 size-4 text-[var(--premium)]" />
                <span>{feature}</span>
              </div>
            ))}
            <CheckoutButton />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-border/80 bg-card/94">
        <CardHeader>
          <CardTitle className="font-heading text-3xl">Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

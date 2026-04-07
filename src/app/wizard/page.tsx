import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function WizardPage() {
  return (
    <PlaceholderPage
      eyebrow="Wizard"
      title="The onboarding wizard starts in Phase 3."
      description="This placeholder route keeps the main call-to-action live while the branded multi-step flow is still to come. The persisted user profile store is already available under the hood."
      primaryCtaHref="/profile"
      primaryCtaLabel="View profile placeholder"
      secondaryCtaHref="/countries"
      secondaryCtaLabel="Browse countries"
    />
  );
}

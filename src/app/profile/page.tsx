import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function ProfilePage() {
  return (
    <PlaceholderPage
      eyebrow="Profile"
      title="The profile shell is ready for progress and settings."
      description="Phase 1 provides the route placeholder now, while later phases will connect it to Supabase auth, premium status, notification settings, and checklist progress tracking."
      primaryCtaHref="/wizard"
      primaryCtaLabel="Open wizard placeholder"
      secondaryCtaHref="/login"
      secondaryCtaLabel="View login placeholder"
    />
  );
}

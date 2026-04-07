import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export default function LoginPage() {
  return (
    <PlaceholderPage
      eyebrow="Authentication"
      title="Login and signup arrive in Phase 7."
      description="This route is reserved for the future Supabase authentication flow, including email and Google sign-in, guest profile sync, and premium account access."
      primaryCtaHref="/profile"
      primaryCtaLabel="View profile placeholder"
      secondaryCtaHref="/"
      secondaryCtaLabel="Back to home"
    />
  );
}

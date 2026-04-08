import Link from "next/link";

import { AuthCard } from "@/components/auth/AuthCard";

export default function SignupPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
      <div className="space-y-5 rounded-[2rem] border border-border/80 bg-background/88 p-8">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Create account</p>
        <h1 className="text-4xl text-foreground">Save your checklist, progress, and premium access.</h1>
        <p className="text-base leading-8 text-muted-foreground">
          If you already completed the wizard as a guest, we&apos;ll sync that profile into your
          account after signup so you can keep going without starting over.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Log in instead
          </Link>
          .
        </p>
      </div>
      <AuthCard mode="signup" />
    </div>
  );
}

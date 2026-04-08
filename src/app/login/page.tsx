import Link from "next/link";

import { AuthCard } from "@/components/auth/AuthCard";

export default function LoginPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
      <div className="space-y-5 rounded-[2rem] border border-border/80 bg-background/88 p-8">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">Authentication</p>
        <h1 className="text-4xl text-foreground">Keep your relocation plan with you.</h1>
        <p className="text-base leading-8 text-muted-foreground">
          Logging in unlocks synced progress, premium status, reminders, and a profile page that
          can follow you across devices.
        </p>
        <p className="text-sm leading-7 text-muted-foreground">
          No account yet?{" "}
          <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
            Create one here
          </Link>
          .
        </p>
      </div>
      <AuthCard mode="login" />
    </div>
  );
}

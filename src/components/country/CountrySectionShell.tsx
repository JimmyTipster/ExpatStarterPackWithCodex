import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CountrySectionShellProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function CountrySectionShell({
  id,
  title,
  description,
  children,
  className,
}: CountrySectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-40", className)}>
      <div className="rounded-[2rem] border border-border/80 bg-card/94 p-6 shadow-[0_20px_50px_rgba(45,52,54,0.08)] sm:p-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl text-foreground">{title}</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

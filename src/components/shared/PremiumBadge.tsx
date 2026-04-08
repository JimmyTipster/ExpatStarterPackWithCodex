import { Gem } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface PremiumBadgeProps {
  isPremium: boolean;
}

export function PremiumBadge({ isPremium }: PremiumBadgeProps) {
  return (
    <Badge
      className={
        isPremium
          ? "gap-1 rounded-full bg-primary px-4 py-1.5 text-primary-foreground"
          : "gap-1 rounded-full bg-[var(--premium)]/18 px-4 py-1.5 text-[color:var(--premium)]"
      }
    >
      <Gem className="size-3.5" />
      {isPremium ? "Premium" : "Unlock Premium $2"}
    </Badge>
  );
}

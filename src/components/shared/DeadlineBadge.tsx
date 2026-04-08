import { AlarmClockCheck, CalendarClock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate, isOverdue } from "@/lib/utils/dates";

interface DeadlineBadgeProps {
  deadline?: string | null;
}

export function DeadlineBadge({ deadline }: DeadlineBadgeProps) {
  if (!deadline) {
    return null;
  }

  const overdue = isOverdue(deadline);

  return (
    <Badge
      variant="outline"
      className={
        overdue
          ? "gap-1 rounded-full border-[var(--danger)]/25 bg-[var(--danger)]/10 text-[var(--danger)]"
          : "gap-1 rounded-full border-primary/20 bg-primary/8 text-primary"
      }
    >
      {overdue ? <AlarmClockCheck className="size-3.5" /> : <CalendarClock className="size-3.5" />}
      {overdue ? "Overdue" : formatDate(deadline)}
    </Badge>
  );
}

import { Badge } from "@/components/ui/badge";
import { TASK_CATEGORY_BY_SLUG } from "@/data/categories";
import type { TaskCategory } from "@/data/types";

interface CategoryBadgeProps {
  category: TaskCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const definition = TASK_CATEGORY_BY_SLUG[category];

  return (
    <Badge
      variant="outline"
      className="rounded-full border-transparent text-xs"
      style={{
        backgroundColor: `${definition.color}12`,
        color: definition.color,
      }}
    >
      {definition.name}
    </Badge>
  );
}

import type { TaskCategory } from "@/data/types";

export interface TaskCategoryDefinition {
  slug: TaskCategory;
  name: string;
  icon: string;
  color: string;
}

export const TASK_CATEGORIES: TaskCategoryDefinition[] = [
  { slug: "registration", name: "Registration", icon: "FileCheck", color: "#1B4332" },
  { slug: "banking", name: "Banking", icon: "Landmark", color: "#6B9080" },
  { slug: "health", name: "Health", icon: "HeartPulse", color: "#9B2335" },
  { slug: "housing", name: "Housing", icon: "House", color: "#C84B31" },
  { slug: "communication", name: "Communication", icon: "MessageSquare", color: "#E9A319" },
  { slug: "transportation", name: "Transportation", icon: "TrainFront", color: "#D4A853" },
  { slug: "employment", name: "Employment", icon: "BriefcaseBusiness", color: "#1B4332" },
  { slug: "welfare", name: "Welfare", icon: "HandCoins", color: "#6B9080" },
  { slug: "education", name: "Education", icon: "GraduationCap", color: "#C84B31" },
  { slug: "legal", name: "Legal", icon: "Scale", color: "#9B2335" },
];

export const TASK_CATEGORY_BY_SLUG = Object.fromEntries(
  TASK_CATEGORIES.map((category) => [category.slug, category]),
) as Record<TaskCategory, TaskCategoryDefinition>;

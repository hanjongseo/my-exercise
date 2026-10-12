import type { WorkoutCategory } from "@/types/workout";

const categoryStyles: Record<WorkoutCategory, string> = {
  근력: "bg-lime-100 text-green-900",
  유산소: "bg-sky-100 text-sky-800",
  스트레칭: "bg-violet-100 text-violet-800",
};

export function WorkoutCategoryBadge({ category }: { category: WorkoutCategory }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${categoryStyles[category]}`}>{category}</span>;
}

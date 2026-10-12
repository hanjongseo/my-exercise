"use client";

import type { WorkoutCategory } from "@/types/workout";

const filters: Array<{ label: string; value: "전체" | WorkoutCategory }> = [
  { label: "전체", value: "전체" },
  { label: "근력", value: "근력" },
  { label: "유산소", value: "유산소" },
  { label: "스트레칭", value: "스트레칭" },
];

export function WorkoutFilter({
  selected,
  onChange,
}: {
  selected: "전체" | WorkoutCategory;
  onChange: (value: "전체" | WorkoutCategory) => void;
}) {
  return (
    <nav aria-label="운동 종류 필터" className="mt-7 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isSelected = filter.value === selected;
        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(filter.value)}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${isSelected ? "bg-stone-900 text-white" : "border border-stone-200 bg-white text-stone-500 hover:border-stone-400 hover:text-stone-900"}`}
          >
            {filter.label}
          </button>
        );
      })}
    </nav>
  );
}

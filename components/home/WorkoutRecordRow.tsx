import { Clock3, Trash2 } from "lucide-react";
import type { WorkoutRecord } from "@/types/workout";
import { formatWorkoutDate } from "@/lib/date";
import { WorkoutCategoryBadge } from "@/components/home/WorkoutCategoryBadge";

export function WorkoutRecordRow({
  record,
  showNote = false,
  onDelete,
}: {
  record: WorkoutRecord;
  showNote?: boolean;
  onDelete: () => void;
}) {
  return (
    <article className="grid gap-3 px-5 py-4 transition hover:bg-stone-50/70 md:grid-cols-[1.05fr_1.1fr_0.85fr_1.65fr_0.55fr_auto] md:items-center md:gap-4">
      <p className="text-xs font-medium tabular-nums text-stone-400">{formatWorkoutDate(record.date)}</p>
      <div>
        <p className="text-sm font-bold">{record.title}</p>
        {showNote && record.note && <p className="mt-1 text-xs text-stone-400">{record.note}</p>}
      </div>
      <div><WorkoutCategoryBadge category={record.category} /></div>
      <p className="text-sm leading-5 text-stone-500">
        {record.detail}
        {record.sets ? ` · 총 ${record.sets}세트` : ""}
        {record.distance ? ` · ${record.distance}km` : ""}
      </p>
      <p className="inline-flex items-center gap-1 text-sm font-bold md:justify-end">
        <Clock3 size={14} className="text-stone-400 md:hidden" />{record.duration}분
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          title={`${record.title} 기록 삭제`}
          aria-label={`${record.title} 기록 삭제`}
          className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
        >
          <Trash2 size={14} /> <span>삭제</span>
        </button>
      </div>
    </article>
  );
}

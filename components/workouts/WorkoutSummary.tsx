import { Activity, Clock3, Dumbbell, Footprints } from "lucide-react";
import type { WorkoutRecord } from "@/types/workout";

export function WorkoutSummary({ records }: { records: WorkoutRecord[] }) {
  const strength = records.filter((record) => record.category === "근력").length;
  const cardio = records.filter((record) => record.category === "유산소").length;
  const minutes = records.reduce((sum, record) => sum + record.duration, 0);
  const items = [
    { label: "전체 기록", value: `${records.length}회`, icon: Activity },
    { label: "근력 운동", value: `${strength}회`, icon: Dumbbell },
    { label: "유산소 운동", value: `${cardio}회`, icon: Footprints },
    { label: "누적 운동 시간", value: `${minutes}분`, icon: Clock3 },
  ];
  return (
    <section aria-label="운동 기록 요약" className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => { const Icon = item.icon; return (
        <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-100 text-green-900"><Icon size={20} /></span>
          <div><p className="text-xs font-semibold text-stone-400">{item.label}</p><p className="mt-1 text-xl font-black">{item.value}</p></div>
        </div>
      ); })}
    </section>
  );
}

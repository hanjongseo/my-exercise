import { Activity, CalendarDays, Clock3, TrendingUp } from "lucide-react";
import type { WorkoutStats } from "@/types/workout";

export function StatsGrid({ stats }: { stats: WorkoutStats }) {
  const cards = [
    { label: "전체 운동 기록", value: `${stats.totalRecords}`, unit: "회", sub: "지금까지 기록한 운동", icon: Activity },
    { label: "이번 주 운동", value: `${stats.weeklyRecords}`, unit: "회", sub: "최근 7일 기준", icon: CalendarDays },
    { label: "누적 운동 시간", value: `${Math.floor(stats.totalMinutes / 60)}`, unit: "시간", sub: `${stats.totalMinutes % 60}분 포함`, icon: Clock3 },
    { label: "평균 운동 시간", value: `${stats.averageMinutes}`, unit: "분", sub: "운동 1회 기준", icon: TrendingUp },
  ];

  return (
    <section aria-label="운동 통계" className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <article key={card.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-stone-500">{card.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${index === 1 ? "bg-lime-100 text-green-800" : "bg-stone-100 text-stone-700"}`}><Icon size={18} /></span>
            </div>
            <p className="mt-5 text-3xl font-black tracking-tight">{card.value}<span className="ml-1 text-sm font-bold text-stone-500">{card.unit}</span></p>
            <p className="mt-1.5 text-xs text-stone-400">{card.sub}</p>
          </article>
        );
      })}
    </section>
  );
}

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { WorkoutRecordList } from "@/components/home/WorkoutRecordList"
import type { WorkoutRecord } from "@/types/workout"

export function RecentWorkoutsSection({
  records,
}: {
  records: WorkoutRecord[]
}) {
  return (
    <section id="records" className="scroll-mt-24 mt-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="mt-1.5 text-2xl font-black">최근 운동 기록</h2>
        </div>
        <Link
          href="/workouts"
          className="inline-flex items-center gap-1 self-start text-sm font-bold text-stone-600 transition hover:text-green-800 sm:self-auto"
        >
          전체 기록 보기 <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="mt-5">
        <WorkoutRecordList records={records} />
      </div>
    </section>
  )
}

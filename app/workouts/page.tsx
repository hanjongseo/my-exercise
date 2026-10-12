"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { WorkoutFilter } from "@/components/workouts/WorkoutFilter"
import { WorkoutSummary } from "@/components/workouts/WorkoutSummary"
import { WorkoutRecordList } from "@/components/home/WorkoutRecordList"
import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"
import type { WorkoutCategory } from "@/types/workout"

export default function WorkoutsPage() {
  const { records, isReady } = useWorkoutStore()
  const [selectedType, setSelectedType] = useState<"전체" | WorkoutCategory>(
    "전체",
  )
  const filtered = useMemo(
    () =>
      selectedType === "전체"
        ? records
        : records.filter((record) => record.category === selectedType),
    [records, selectedType],
  )

  return (
    <main id="top" className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            운동 기록
          </h1>
        </div>
        <Link
          href="/workouts/new"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold text-stone-900 transition hover:border-stone-900"
        >
          <Plus size={17} /> 기록 추가
        </Link>
      </div>
      <WorkoutSummary records={records} />
      <WorkoutFilter selected={selectedType} onChange={setSelectedType} />
      <section className="mt-5">
        <WorkoutRecordList records={filtered} showNote />
      </section>
    </main>
  )
}

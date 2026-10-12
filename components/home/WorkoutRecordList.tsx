"use client"

import Link from "next/link"
import { CalendarDays, Plus } from "lucide-react"
import type { WorkoutRecord } from "@/types/workout"
import { WorkoutRecordRow } from "@/components/home/WorkoutRecordRow"
import { EmptyState } from "@/components/home/EmptyState"
import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"

export function WorkoutRecordList({
  records,
  showNote = false,
}: {
  records: WorkoutRecord[]
  showNote?: boolean
}) {
  const { deleteWorkout } = useWorkoutStore()

  function handleDelete(record: WorkoutRecord) {
    const confirmed = window.confirm(
      `\"${record.title}\" 운동 기록을 삭제할까요?\n삭제한 기록은 복구할 수 없습니다.`,
    )
    if (!confirmed) return
    deleteWorkout(record.id)
  }

  if (records.length === 0) return <EmptyState />

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1.05fr_1.1fr_0.85fr_1.65fr_0.55fr_auto] gap-4 border-b border-stone-100 bg-stone-50/80 px-5 py-3 text-[11px] font-bold text-stone-400 md:grid">
        <span>날짜</span>
        <span>운동</span>
        <span>종류</span>
        <span>운동 내용</span>
        <span className="text-right">시간</span>
        <span className="text-right">관리</span>
      </div>
      <div className="divide-y divide-stone-100">
        {records.map((record) => (
          <WorkoutRecordRow
            key={record.id}
            record={record}
            showNote={showNote}
            onDelete={() => handleDelete(record)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-stone-100 bg-white px-5 py-4">
        <p className="text-xs text-stone-400">
          <CalendarDays className="mr-1 inline" size={13} /> 총 {records.length}
          개 기록
        </p>
        <Link
          href="/workouts/new"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-stone-900 transition hover:border-stone-900"
        >
          <Plus size={17} /> 기록 추가
        </Link>
      </div>
    </div>
  )
}

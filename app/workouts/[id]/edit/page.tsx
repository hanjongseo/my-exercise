"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"
import { WorkoutEditForm } from "@/components/workouts/WorkoutEditForm"

export default function EditWorkoutPage() {
  const params = useParams<{ id: string }>()
  const { records, isReady } = useWorkoutStore()

  const record = records.find((item) => item.id === params.id)

  if (!isReady) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        운동 기록을 불러오는 중입니다.
      </main>
    )
  }

  if (!record) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-bold">운동 기록을 찾을 수 없습니다.</h1>

        <Link href="/workouts" className="mt-5 inline-block text-sm underline">
          운동 기록으로 돌아가기
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
      <h1 className="text-3xl font-black text-stone-900">운동 기록 수정</h1>

      <p className="mt-2 text-sm text-stone-500">
        저장된 운동 정보를 수정할 수 있습니다.
      </p>

      <WorkoutEditForm record={record} />
    </main>
  )
}

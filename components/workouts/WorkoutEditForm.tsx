"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"

import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"
import type { WorkoutCategory, WorkoutRecord } from "@/types/workout"

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-stone-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"

const labelClass = "text-sm font-bold text-stone-700"

const validCategories: WorkoutCategory[] = ["근력", "유산소", "스트레칭"]

export function WorkoutEditForm({ record }: { record: WorkoutRecord }) {
  const router = useRouter()
  const { updateWorkout } = useWorkoutStore()

  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const date = String(formData.get("date") ?? "").trim()
    const title = String(formData.get("title") ?? "").trim()

    const category = String(
      formData.get("category") ?? "",
    ).trim() as WorkoutCategory

    const detail = String(formData.get("detail") ?? "").trim()
    const duration = Number(formData.get("duration"))

    const setsValue = String(formData.get("sets") ?? "").trim()

    const distanceValue = String(formData.get("distance") ?? "").trim()

    const note = String(formData.get("note") ?? "").trim()

    if (!date || !title || !detail || !validCategories.includes(category)) {
      setError("날짜, 운동 이름, 종류, 운동 내용을 입력해주세요.")
      return
    }

    if (!Number.isFinite(duration) || duration < 1 || duration > 600) {
      setError("운동 시간은 1분 이상 600분 이하로 입력해주세요.")
      return
    }

    const sets = setsValue ? Number(setsValue) : undefined
    const distance = distanceValue ? Number(distanceValue) : undefined

    if (
      sets !== undefined &&
      (!Number.isInteger(sets) || sets < 1 || sets > 100)
    ) {
      setError("세트 수는 1~100 사이의 정수로 입력해주세요.")
      return
    }

    if (
      distance !== undefined &&
      (!Number.isFinite(distance) || distance < 0.1 || distance > 300)
    ) {
      setError("러닝 거리를 확인해주세요.")
      return
    }

    setIsSaving(true)

    try {
      await updateWorkout(record.id, {
        date,
        title,
        category,
        detail,
        duration,
        ...(sets !== undefined ? { sets } : {}),
        ...(distance !== undefined ? { distance } : {}),
        ...(note ? { note } : {}),
      })

      router.push("/workouts")
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "운동 기록 수정에 실패했습니다.",
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-7 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7"
    >
      {error && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          운동 날짜
          <input
            className={inputClass}
            type="date"
            name="date"
            defaultValue={record.date}
            required
          />
        </label>

        <label className={labelClass}>
          운동 이름
          <input
            className={inputClass}
            name="title"
            defaultValue={record.title}
            maxLength={60}
            required
          />
        </label>

        <label className={labelClass}>
          운동 종류
          <select
            className={inputClass}
            name="category"
            defaultValue={record.category}
            required
          >
            <option value="근력">근력</option>
            <option value="유산소">유산소</option>
            <option value="스트레칭">스트레칭</option>
          </select>
        </label>

        <label className={labelClass}>
          운동 시간 (분)
          <input
            className={inputClass}
            type="number"
            name="duration"
            min="1"
            max="600"
            defaultValue={record.duration}
            required
          />
        </label>

        <label className={labelClass}>
          세트 수 (선택)
          <input
            className={inputClass}
            type="number"
            name="sets"
            min="1"
            max="100"
            defaultValue={record.sets ?? ""}
          />
        </label>

        <label className={labelClass}>
          러닝 거리 km (선택)
          <input
            className={inputClass}
            type="number"
            name="distance"
            min="0.1"
            max="300"
            step="0.1"
            defaultValue={record.distance ?? ""}
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          운동 내용
          <input
            className={inputClass}
            name="detail"
            defaultValue={record.detail}
            maxLength={160}
            required
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          메모 (선택)
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            name="note"
            defaultValue={record.note ?? ""}
            maxLength={300}
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/workouts"
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-bold text-stone-600 transition hover:bg-stone-50"
        >
          취소
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-wait disabled:opacity-60"
        >
          <Save size={16} />
          {isSaving ? "수정 중..." : "수정 저장"}
        </button>
      </div>
    </form>
  )
}

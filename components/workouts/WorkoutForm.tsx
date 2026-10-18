"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { getTodayString } from "@/lib/date"
import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"
import type { WorkoutCategory } from "@/types/workout"

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-stone-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
const labelClass = "text-sm font-bold text-stone-700"
const validCategories: WorkoutCategory[] = ["근력", "유산소", "스트레칭"]

export function WorkoutForm() {
  const router = useRouter()
  const { addWorkout } = useWorkoutStore()
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const form = event.currentTarget
    const formData = new FormData(form)
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

    setIsSaving(true)

    try {
      await addWorkout({
        date,
        title,
        category,
        detail,
        duration,
        ...(setsValue ? { sets: Number(setsValue) } : {}),
        ...(distanceValue ? { distance: Number(distanceValue) } : {}),
        ...(note ? { note } : {}),
      })

      router.push("/workouts")
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "운동 기록 저장에 실패했습니다.",
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
            defaultValue={getTodayString()}
            required
          />
        </label>
        <label className={labelClass}>
          운동 이름
          <input
            className={inputClass}
            name="title"
            placeholder="예: 가슴 · 삼두"
            maxLength={60}
            required
          />
        </label>
        <label className={labelClass}>
          운동 종류
          <select
            className={inputClass}
            name="category"
            defaultValue="근력"
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
            placeholder="예: 60"
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
            placeholder="예: 18"
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
            placeholder="예: 4.5"
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          운동 내용
          <input
            className={inputClass}
            name="detail"
            placeholder="예: 벤치프레스 · 인클라인 덤벨프레스"
            maxLength={160}
            required
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          메모 (선택)
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            name="note"
            placeholder="오늘 컨디션이나 다음 운동 때 기억할 점"
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
          <Save size={16} /> 기록 저장
        </button>
      </div>
    </form>
  )
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { WorkoutForm } from "@/components/workouts/WorkoutForm"

export default function NewWorkoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/workouts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-stone-900"
      >
        <ArrowLeft size={16} /> 운동 기록으로 돌아가기
      </Link>
      <div className="mt-7">
        <h1 className="mt-2 text-3xl font-black tracking-tight">
          운동 기록 추가
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          오늘의 움직임을 기록해 다음 운동의 동기로 만들어봐요.
        </p>
      </div>
      <WorkoutForm />
    </main>
  )
}

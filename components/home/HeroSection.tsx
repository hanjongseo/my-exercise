import Link from "next/link"
import { ArrowDown, ArrowUpRight, Dumbbell } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
      <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-[#e7f7ce] blur-2xl" />
      <div className="absolute right-10 top-10 hidden h-24 w-24 rotate-12 items-center justify-center rounded-3xl bg-[#c8fa57] text-stone-900 shadow-sm sm:flex">
        <Dumbbell size={36} strokeWidth={1.7} />
      </div>
      <div className="relative max-w-2xl">
        <h1 className="mt-6 text-4xl font-black leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
          운동기록
          <br />
        </h1>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/workouts/new"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-bold text-stone-900 transition hover:border-stone-900"
          >
            오늘 운동 기록하기 ↗
          </Link>
          <Link
            href="#records"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-3.5 text-sm font-bold transition hover:bg-stone-50"
          >
            최근 기록 보기 <ArrowDown size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

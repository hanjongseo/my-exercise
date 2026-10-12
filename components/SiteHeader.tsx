import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const navigation = [
  { label: "대시보드", href: "/#top" },
  { label: "운동 루틴", href: "/#routine" },
  { label: "운동 기록", href: "/workouts" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#f7f8f5]/95 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="MY EXERCISE 홈"
        >
          <span className="text-lg font-black tracking-tight text-stone-500">
            MY EXERCISE
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-stone-500 transition hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/workouts/new"
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold transition hover:border-stone-900"
        >
          기록 추가 <ArrowUpRight size={16} />
        </Link>
      </div>
    </header>
  )
}

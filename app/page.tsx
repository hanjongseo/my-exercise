"use client"

import { useMemo } from "react"
import { HeroSection } from "@/components/home/HeroSection"
import { StatsGrid } from "@/components/home/StatsGrid"
import { WeeklyRoutine } from "@/components/home/WeeklyRoutine"
import { RecentWorkoutsSection } from "@/components/home/RecentWorkoutsSection"
import { useWorkoutStore } from "@/components/workouts/WorkoutProvider"
import type { WorkoutStats } from "@/types/workout"

function calculateStats(
  records: ReturnType<typeof useWorkoutStore>["records"],
): WorkoutStats {
  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const weeklyRecords = records.filter((record) => {
    const recordDate = new Date(`${record.date}T00:00:00`)
    return recordDate >= sevenDaysAgo && recordDate <= now
  }).length
  const totalMinutes = records.reduce(
    (total, record) => total + record.duration,
    0,
  )

  return {
    totalRecords: records.length,
    weeklyRecords,
    totalMinutes,
    averageMinutes: records.length
      ? Math.round(totalMinutes / records.length)
      : 0,
  }
}

export default function Home() {
  const { records } = useWorkoutStore()
  const stats = useMemo(() => calculateStats(records), [records])

  return (
    <main
      id="top"
      className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 lg:px-10"
    >
      <HeroSection />
      <StatsGrid stats={stats} />
      <div className="mt-7 w-full">
        <WeeklyRoutine />
      </div>
      <RecentWorkoutsSection records={records.slice(0, 5)} />
    </main>
  )
}

"use server"

import mongoose from "mongoose"
import { revalidatePath } from "next/cache"
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  type NewWorkoutRecord,
} from "@/lib/workouts"
import type { WorkoutRecord } from "@/types/workout"

export async function getWorkoutsAction(): Promise<WorkoutRecord[]> {
  return getWorkouts()
}

export async function createWorkoutAction(
  record: NewWorkoutRecord,
): Promise<WorkoutRecord> {
  const saved = await createWorkout(record)

  revalidatePath("/")
  revalidatePath("/workouts")

  return saved
}
export async function updateWorkoutAction(
  id: string,
  record: NewWorkoutRecord,
): Promise<WorkoutRecord> {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("운동 기록 ID가 올바르지 않습니다.")
  }

  const updated = await updateWorkout(id, record)

  revalidatePath("/")
  revalidatePath("/workouts")

  return updated
}
export async function deleteWorkoutAction(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("운동 기록 ID가 올바르지 않습니다.")
  }

  const deleted = await deleteWorkout(id)

  if (!deleted) {
    throw new Error("운동 기록을 찾을 수 없습니다.")
  }

  revalidatePath("/")
  revalidatePath("/workouts")

  return { success: true }
}

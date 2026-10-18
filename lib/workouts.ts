import { connectDB } from "@/lib/mongodb"
import Workout from "@/models/Workout"
import type { WorkoutRecord } from "@/types/workout"

export type NewWorkoutRecord = Omit<WorkoutRecord, "id">

export async function getWorkouts(): Promise<WorkoutRecord[]> {
  await connectDB()

  const docs = await Workout.find().sort({ date: -1, createdAt: -1 }).lean()

  return docs.map((doc) => ({
    id: String(doc._id),
    date: doc.date,
    title: doc.title,
    category: doc.category,
    detail: doc.detail,
    duration: doc.duration,
    ...(doc.sets != null ? { sets: doc.sets } : {}),
    ...(doc.distance != null ? { distance: doc.distance } : {}),
    ...(doc.note ? { note: doc.note } : {}),
  })) as WorkoutRecord[]
}

export async function createWorkout(
  input: NewWorkoutRecord,
): Promise<WorkoutRecord> {
  await connectDB()

  const doc = await Workout.create(input)

  return {
    id: String(doc._id),
    date: doc.date,
    title: doc.title,
    category: doc.category,
    detail: doc.detail,
    duration: doc.duration,
    ...(doc.sets != null ? { sets: doc.sets } : {}),
    ...(doc.distance != null ? { distance: doc.distance } : {}),
    ...(doc.note ? { note: doc.note } : {}),
  } as WorkoutRecord
}

export async function deleteWorkout(id: string): Promise<boolean> {
  await connectDB()

  const result = await Workout.findByIdAndDelete(id)

  return result !== null
}

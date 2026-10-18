"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  startTransition,
  useState,
  type ReactNode,
} from "react"

import {
  getWorkoutsAction,
  createWorkoutAction,
  updateWorkoutAction,
  deleteWorkoutAction,
} from "@/lib/actions"

import type { WorkoutRecord } from "@/types/workout"

type NewWorkoutRecord = Omit<WorkoutRecord, "id">

type WorkoutContextValue = {
  updateWorkout: (
    id: string,

    record: NewWorkoutRecord,
  ) => Promise<WorkoutRecord>

  records: WorkoutRecord[]

  isReady: boolean

  addWorkout: (record: NewWorkoutRecord) => Promise<WorkoutRecord>

  deleteWorkout: (id: string) => Promise<void>
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null)

function sortRecords(records: WorkoutRecord[]) {
  return [...records].sort((a, b) => b.date.localeCompare(a.date))
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WorkoutRecord[]>([])

  const [isReady, setIsReady] = useState(false)

  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    let active = true

    getWorkoutsAction()
      .then((data) => {
        if (active) {
          startTransition(() => {
            setRecords(sortRecords(data))
          })
        }
      })

      .catch((error: unknown) => {
        if (active) {
          startTransition(() => {
            setLoadError(
              error instanceof Error
                ? error.message
                : "운동 기록을 불러오지 못했습니다.",
            )
          })
        }
      })

      .finally(() => {
        if (active) {
          startTransition(() => {
            setIsReady(true)
          })
        }
      })

    return () => {
      active = false
    }
  }, [])

  const addWorkout = useCallback(async (record: NewWorkoutRecord) => {
    const saved = await createWorkoutAction(record)

    setRecords((current) => sortRecords([saved, ...current]))

    return saved
  }, [])

  const updateWorkout = useCallback(
    async (id: string, record: NewWorkoutRecord) => {
      const updated = await updateWorkoutAction(id, record)

      setRecords((current) =>
        sortRecords(current.map((item) => (item.id === id ? updated : item))),
      )

      return updated
    },

    [],
  )

  const deleteWorkout = useCallback(async (id: string) => {
    await deleteWorkoutAction(id)

    setRecords((current) => current.filter((record) => record.id !== id))
  }, [])

  return (
    <WorkoutContext.Provider
      value={{
        records,

        isReady,

        addWorkout,

        updateWorkout,

        deleteWorkout,
      }}
    >
      {loadError && (
        <p role="alert" className="p-3 text-sm text-red-600">
          {loadError}
        </p>
      )}

      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkoutStore() {
  const context = useContext(WorkoutContext)

  if (!context) {
    throw new Error("useWorkoutStore는 WorkoutProvider 안에서 사용해야 합니다.")
  }

  return context
}

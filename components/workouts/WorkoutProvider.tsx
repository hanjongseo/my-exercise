"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { demoWorkouts } from "@/lib/demo-workouts";
import type { WorkoutRecord } from "@/types/workout";

const STORAGE_KEY = "my-move-workout-records-v1";

type NewWorkoutRecord = Omit<WorkoutRecord, "id">;
type WorkoutContextValue = {
  records: WorkoutRecord[];
  isReady: boolean;
  addWorkout: (record: NewWorkoutRecord) => void;
  deleteWorkout: (id: string) => void;
};

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

function sortRecords(records: WorkoutRecord[]) {
  return [...records].sort((a, b) => b.date.localeCompare(a.date));
}

function readRecordsFromBrowser(): WorkoutRecord[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return sortRecords(demoWorkouts);

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return sortRecords(demoWorkouts);
    return sortRecords(parsed as WorkoutRecord[]);
  } catch {
    return sortRecords(demoWorkouts);
  }
}

function writeRecordsToBrowser(records: WorkoutRecord[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // 브라우저 저장소가 차단된 경우에도 현재 페이지 상태에서는 사용할 수 있습니다.
  }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<WorkoutRecord[]>(() => sortRecords(demoWorkouts));
  const [isReady, setIsReady] = useState(false);
  const recordsRef = useRef<WorkoutRecord[]>(sortRecords(demoWorkouts));

  useEffect(() => {
    const loadedRecords = readRecordsFromBrowser();
    recordsRef.current = loadedRecords;
    setRecords(loadedRecords);
    writeRecordsToBrowser(loadedRecords);
    setIsReady(true);
  }, []);

  const addWorkout = useCallback((newRecord: NewWorkoutRecord) => {
    const record: WorkoutRecord = {
      ...newRecord,
      id: typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `workout-${Date.now()}`,
    };
    const updatedRecords = sortRecords([record, ...recordsRef.current]);
    recordsRef.current = updatedRecords;
    setRecords(updatedRecords);
    writeRecordsToBrowser(updatedRecords);
  }, []);

  const deleteWorkout = useCallback((id: string) => {
    const updatedRecords = recordsRef.current.filter((record) => record.id !== id);
    recordsRef.current = updatedRecords;
    setRecords(updatedRecords);
    writeRecordsToBrowser(updatedRecords);
  }, []);

  return (
    <WorkoutContext.Provider value={{ records, isReady, addWorkout, deleteWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutStore() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutStore는 WorkoutProvider 안에서 사용해야 합니다.");
  }
  return context;
}

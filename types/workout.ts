export type WorkoutCategory = "근력" | "유산소" | "스트레칭";

export type WorkoutRecord = {
  id: string;
  date: string;
  title: string;
  category: WorkoutCategory;
  detail: string;
  duration: number;
  sets?: number;
  distance?: number;
  note?: string;
};

export type WorkoutStats = {
  totalRecords: number;
  weeklyRecords: number;
  totalMinutes: number;
  averageMinutes: number;
};

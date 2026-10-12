import type { WorkoutRecord } from "@/types/workout";

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().slice(0, 10);
}

export const demoWorkouts: WorkoutRecord[] = [
  {
    id: "demo-1",
    date: daysAgo(0),
    title: "가슴 · 삼두",
    category: "근력",
    detail: "벤치프레스 · 인클라인 덤벨프레스",
    duration: 65,
    sets: 18,
    note: "무게보다 정확한 자세에 집중",
  },
  {
    id: "demo-2",
    date: daysAgo(1),
    title: "가벼운 러닝",
    category: "유산소",
    detail: "실외 러닝 · 쿨다운 걷기",
    duration: 32,
    distance: 4.2,
    note: "호흡을 일정하게 유지",
  },
  {
    id: "demo-3",
    date: daysAgo(3),
    title: "하체 근력",
    category: "근력",
    detail: "스쿼트 · 레그프레스 · 플랭크",
    duration: 58,
    sets: 16,
    note: "마지막 세트까지 자세 유지",
  },
  {
    id: "demo-4",
    date: daysAgo(5),
    title: "등 · 이두",
    category: "근력",
    detail: "랫풀다운 · 시티드로우 · 덤벨컬",
    duration: 60,
    sets: 17,
  },
  {
    id: "demo-5",
    date: daysAgo(6),
    title: "전신 스트레칭",
    category: "스트레칭",
    detail: "고관절 · 햄스트링 · 어깨 가동성",
    duration: 20,
  },
];

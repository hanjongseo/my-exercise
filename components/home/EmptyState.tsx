import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-500"><ClipboardList size={22} /></span>
      <h3 className="mt-4 text-base font-black">아직 기록이 없어요.</h3>
      <p className="mt-1.5 text-sm text-stone-500">첫 번째 운동을 기록해보세요.</p>
      <Link href="/workouts/new" className="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-bold text-white"><Plus size={16} /> 첫 기록 추가</Link>
    </div>
  );
}

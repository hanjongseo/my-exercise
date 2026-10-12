import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[55vh] flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-700">404</p>
      <h1 className="mt-3 text-3xl font-black">페이지를 찾을 수 없어요.</h1>
      <Link href="/" className="mt-6 rounded-full bg-stone-900 px-5 py-3 text-sm font-bold text-white">홈으로 돌아가기</Link>
    </main>
  );
}

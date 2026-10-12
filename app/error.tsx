"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-700">Something went wrong</p>
      <h1 className="mt-3 text-2xl font-black">페이지를 불러오지 못했어요.</h1>
      <p className="mt-2 text-sm text-stone-500">잠시 후 다시 시도해주세요.</p>
      <button onClick={reset} className="mt-6 rounded-full bg-stone-900 px-5 py-3 text-sm font-bold text-white">다시 시도</button>
    </main>
  );
}

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-5 py-12 sm:px-8">
      <div className="h-64 rounded-3xl bg-stone-200" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-28 rounded-2xl bg-stone-200" />)}
      </div>
      <div className="mt-6 h-72 rounded-3xl bg-stone-200" />
    </main>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-32 rounded-full bg-slate-200" />
        <div className="mt-4 h-12 w-2/3 rounded-2xl bg-slate-200" />
        <div className="mt-4 h-5 w-full max-w-3xl rounded-xl bg-slate-200" />
        <div className="mt-2 h-5 w-full max-w-2xl rounded-xl bg-slate-200" />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-48 rounded-2xl bg-slate-200" />
              <div className="mt-5 h-6 w-2/3 rounded-xl bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded-xl bg-slate-200" />
              <div className="mt-2 h-4 w-5/6 rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
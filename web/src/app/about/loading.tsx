export default function AboutLoading() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_38%,#ffffff_100%)]">
      <section className="relative min-h-[560px] border-b border-slate-200 bg-slate-950 md:min-h-[660px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(135deg,#020617,#0f172a,#082f49)]" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 pb-10 pt-32 md:min-h-[660px] md:px-8 md:pb-14 md:pt-36 lg:px-16">
          <div className="w-full max-w-3xl animate-pulse">
            <div className="h-7 w-40 rounded-full bg-white/15" />
            <div className="mt-6 h-10 w-full max-w-2xl rounded-2xl bg-white/15 md:h-14" />
            <div className="mt-3 h-10 w-4/5 rounded-2xl bg-white/10 md:h-14" />
            <div className="mt-6 h-4 w-full max-w-xl rounded-full bg-white/10" />
            <div className="mt-3 h-4 w-5/6 rounded-full bg-white/10" />
            <div className="mt-8 flex gap-3">
              <div className="h-11 w-32 rounded-full bg-white/15" />
              <div className="h-11 w-36 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
export default function AboutPreview() {
  return (
    <section className="bg-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            About Us
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            A Modern Pharma Partner Built On Trust
          </h2>
        </div>

        <div>
          <p className="text-base leading-7 text-slate-600">
            Venzura Medcor is focused on delivering reliable pharmaceutical
            manufacturing services, quality-driven operations, and long-term business
            partnerships. Our approach combines compliance, infrastructure, and
            customer-focused execution.
          </p>

          <a
            href="/about"
            className="mt-6 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
          >
            Read More
          </a>
        </div>
      </div>
    </section>
  )
}
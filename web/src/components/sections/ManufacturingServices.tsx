const services = [
  'Third-party manufacturing support',
  'Quality-focused production process',
  'Modern infrastructure and handling',
  'Business enquiry and partnership support',
]

export default function ManufacturingServices() {
  return (
    <section className="bg-slate-950 px-4 py-16 text-white md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Manufacturing
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Strong Capabilities Backed By Modern Operations
          </h2>
        </div>

        <div className="grid gap-4">
          {services.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
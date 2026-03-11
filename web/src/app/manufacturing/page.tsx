export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Manufacturing | Venzura Medcor',
  description:
    'Learn about our manufacturing-focused pharmaceutical capabilities, operational standards, and quality-led production approach.',
}

const manufacturingPoints = [
  'Quality-oriented manufacturing workflow',
  'Modern operational infrastructure',
  'Professional handling and process discipline',
  'Reliable support for third-party manufacturing requirements',
]

const strengths = [
  {
    title: 'Operational Discipline',
    text: 'A structured process approach helps maintain consistency, coordination, and dependable execution.',
  },
  {
    title: 'Modern Setup',
    text: 'Our manufacturing orientation is designed to support efficient handling and scalable business growth.',
  },
  {
    title: 'Quality Commitment',
    text: 'We value reliability, process awareness, and strong standards in every operational step.',
  },
]

export default function ManufacturingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Manufacturing
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Manufacturing Support Built On Quality, Structure, And Reliable Execution
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Our manufacturing-focused approach is designed to support business
            reliability, pharmaceutical quality standards, and long-term healthcare
            collaboration through disciplined operations and modern infrastructure.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Manufacturing Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              A Dependable Foundation For Pharma Production Support
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-600">
            <p>
              We focus on disciplined execution, professional coordination, and a
              quality-first manufacturing mindset. Our operational direction is
              built to support pharmaceutical expectations with clarity and
              consistency.
            </p>
            <p>
              From manufacturing discussions to business collaboration, our goal is
              to provide a reliable and organized experience for every serious
              enquiry and partnership opportunity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Core Manufacturing Focus
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Strong Operations With A Professional Quality Mindset
            </h2>
          </div>

          <div className="grid gap-4">
            {manufacturingPoints.map((item) => (
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

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-12 text-center shadow-sm md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Business Discussion
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Looking For Manufacturing Support?
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Reach out to us to discuss manufacturing requirements, product support,
            and long-term pharmaceutical business opportunities.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
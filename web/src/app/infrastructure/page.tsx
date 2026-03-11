export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Infrastructure | Venzura Medcor',
  description:
    'Explore our pharma infrastructure, operational setup, and modern facilities designed for reliable quality-focused execution.',
}

const infrastructurePoints = [
  {
    title: 'Modern Operational Setup',
    text: 'A structured environment designed to support dependable workflow, professional handling, and scalable pharmaceutical coordination.',
  },
  {
    title: 'Process-Oriented Facilities',
    text: 'An infrastructure approach that supports consistency, organized execution, and quality-conscious operational flow.',
  },
  {
    title: 'Reliable Business Readiness',
    text: 'A setup created to support product coordination, manufacturing discussions, and long-term professional partnerships.',
  },
]

const capabilities = [
  'Clean and organized workflow environment',
  'Operational structure aligned with professional standards',
  'Supportive infrastructure for product and manufacturing discussions',
  'Focus on consistency, handling, and execution quality',
]

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Infrastructure
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Modern Infrastructure Designed To Support Quality, Reliability, And Business Confidence
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Our infrastructure is built to reflect a disciplined, professional, and
            quality-oriented approach to pharmaceutical operations and long-term
            business support.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Infrastructure Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              A Strong Operational Base For Modern Pharma Support
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-600">
            <p>
              We believe that strong pharmaceutical support begins with dependable
              infrastructure, practical organization, and a quality-driven
              operational mindset.
            </p>
            <p>
              Our setup is designed to support efficient handling, business
              discussions, and reliable coordination while maintaining a modern and
              professional corporate presence.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {infrastructurePoints.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="mb-5 h-44 rounded-2xl bg-slate-100" />
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Key Strengths
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Infrastructure That Supports Long-Term Reliability
            </h2>
          </div>

          <div className="grid gap-4">
            {capabilities.map((item) => (
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

      <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-12 text-center shadow-sm md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Connect With Us
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Want To Discuss Our Capabilities?
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Reach out for product, infrastructure, or business-related discussions.
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
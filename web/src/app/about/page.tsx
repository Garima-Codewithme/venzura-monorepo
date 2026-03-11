export const dynamic = 'force-dynamic'
import Link from 'next/link'

const highlights = [
  {
    title: 'Quality-Driven Operations',
    text: 'We focus on dependable production standards, disciplined processes, and consistent output quality across our pharmaceutical operations.',
  },
  {
    title: 'Modern Infrastructure',
    text: 'Our setup is built to support efficient handling, scalable manufacturing, and operational reliability for long-term business growth.',
  },
  {
    title: 'Business-Focused Support',
    text: 'We aim to build strong partnerships through responsive communication, transparent processes, and dependable service support.',
  },
]

const values = [
  'Commitment to quality and consistency',
  'Professional and transparent business approach',
  'Focus on long-term healthcare partnerships',
  'Strong operational discipline and reliability',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            About Us
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            A Trusted Pharma Company Focused On Quality, Reliability, And Long-Term Growth
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Venzura Medcor is committed to delivering dependable pharmaceutical
            solutions through quality-focused operations, modern infrastructure,
            and a partnership-driven business approach. We aim to create lasting
            value by combining strong standards with practical healthcare support.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Company Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Built To Serve Modern Healthcare Needs
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-600">
            <p>
              We work with a clear focus on product quality, responsible execution,
              and strong business coordination. Our goal is to support healthcare
              and pharmaceutical requirements with a professional and scalable
              approach.
            </p>
            <p>
              From product portfolio development to manufacturing support and
              business enquiry handling, we believe in delivering solutions that
              inspire confidence and long-term trust.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
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

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              To Deliver Reliable Pharmaceutical Value With Strong Standards
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Our mission is to support healthcare growth through disciplined
              pharmaceutical practices, dependable services, and a quality-first
              mindset that strengthens trust in every collaboration.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Our Vision
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              To Build A Strong And Respected Presence In The Pharma Sector
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              We aim to grow as a trusted name known for quality, professionalism,
              modern infrastructure, and meaningful business relationships in the
              pharmaceutical space.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Core Values
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Principles That Guide Our Work
            </h2>
          </div>

          <div className="space-y-4">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-blue-100 bg-white p-5 text-slate-700 shadow-sm"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 px-8 py-12 text-center text-white md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Let’s Connect
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Looking For A Reliable Pharma Business Partner?
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Connect with us to discuss product requirements, manufacturing support,
            and long-term business opportunities.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
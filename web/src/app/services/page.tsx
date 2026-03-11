export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services | Venzura Medcor',
  description:
    'Explore pharma business services, third-party manufacturing support, product coordination, and healthcare partnership solutions.',
}

const services = [
  {
    title: 'Third-Party Manufacturing',
    text: 'Reliable manufacturing support for brands and businesses looking for quality-driven pharmaceutical production.',
  },
  {
    title: 'Product Portfolio Support',
    text: 'Structured support for product selection, category alignment, and market-focused portfolio planning.',
  },
  {
    title: 'Business Enquiry Assistance',
    text: 'Prompt communication and clear coordination for serious product and manufacturing discussions.',
  },
  {
    title: 'Operational Coordination',
    text: 'Professional workflow support with a focus on smooth execution and dependable business interaction.',
  },
  {
    title: 'Quality-Focused Execution',
    text: 'A disciplined approach to consistency, handling, and operational standards across business requirements.',
  },
  {
    title: 'Long-Term Partnership Approach',
    text: 'We aim to build long-term professional relationships based on trust, clarity, and responsiveness.',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Services
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Professional Pharma Services Designed For Reliable Business Support
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            We provide practical pharmaceutical service support focused on quality,
            coordination, and long-term business value. Our approach is designed to
            meet modern healthcare and manufacturing expectations with clarity and
            professionalism.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Why Our Services
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              A Structured And Professional Approach To Pharma Support
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-slate-300">
            <p>
              Our service approach is centered on business clarity, dependable
              communication, and quality-conscious execution. We understand that
              healthcare partnerships require not only capability, but also trust
              and responsiveness.
            </p>
            <p>
              Whether the requirement is related to product discussions,
              manufacturing support, or broader business opportunities, we aim to
              provide a consistent and reliable experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white px-8 py-12 text-center shadow-sm md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Let’s Work Together
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            Need Reliable Pharma Business Support?
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Connect with us for manufacturing discussions, product-related queries,
            and long-term healthcare business opportunities.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
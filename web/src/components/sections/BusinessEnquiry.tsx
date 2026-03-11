export default function BusinessEnquiry() {
  return (
    <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          Business Enquiry
        </p>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
          Let’s Build A Strong Healthcare Partnership
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Connect with us for product enquiries, manufacturing discussions, and
          long-term pharma business opportunities.
        </p>

        <div className="mt-8">
          <a
            href="/contact"
            className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Send Enquiry
          </a>
        </div>
      </div>
    </section>
  )
}
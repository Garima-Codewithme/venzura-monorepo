'use client'

import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from 'react'

const contactCards = [
  {
    title: 'Email Us',
    value: 'Venzuramedcor@gmail.com',
    text: 'For business enquiries, product discussions, and partnership communication.',
  },
  {
    title: 'Call Us',
    value: '+91 91381 12320',
    text: 'Reach out to us for direct conversation and quick support.',
  },
  {
    title: 'Visit Us',
    value:
      'Headquarters- 15/7, 2/1 Manchanda Complex Kuldeep Nagar Nanhera Road, Ambala Cantt, Haryana, India',
    text: 'Our registered office or manufacturing address.',
  },
]

type FormState = {
  fullName: string
  companyName: string
  email: string
  phone: string
  productInterest: string
  message: string
}

const initialForm: FormState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productInterest: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus({
          type: 'error',
          message: data.message || 'Submission failed.',
        })
      } else {
        setStatus({
          type: 'success',
          message: data.message || 'Enquiry submitted successfully.',
        })
        setForm(initialForm)
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Contact Us
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Connect With Us For Product Enquiries, Manufacturing Discussions, And
            Business Partnerships
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            We welcome business enquiries related to pharmaceutical products,
            manufacturing support, and long-term healthcare partnerships.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">
                {card.title}
              </p>
              <h3 className="mt-4 break-words text-xl font-semibold text-slate-900">
                {card.value}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#eef4ff] px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Business Enquiry Form
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Send Us Your Requirement
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Fill in the details below and we will connect with you regarding
              your product interest, manufacturing requirement, or partnership
              query.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter company name"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Product Interest
                </label>
                <input
                  name="productInterest"
                  value={form.productInterest}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter product interest"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Write your requirement"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                />
              </div>

              {status && (
                <div
                  className={`md:col-span-2 rounded-2xl px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Why Reach Out To Us
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Let’s Discuss A Reliable Pharma Solution
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300">
                We are open to discussions related to product portfolio,
                third-party manufacturing, business collaboration, and long-term
                pharmaceutical support.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Working Approach
              </p>

              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                <li>• Prompt response for serious business enquiries</li>
                <li>• Professional communication and requirement understanding</li>
                <li>• Focus on quality, clarity, and long-term collaboration</li>
                <li>• Structured support for product and manufacturing discussions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
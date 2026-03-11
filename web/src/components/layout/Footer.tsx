import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from '@/data/navLinks'
import ThemeToggle from '@/components/common/ThemeToggle'

const serviceLinks = [
  { label: 'Third-Party Manufacturing', href: '/services' },
  { label: 'Product Portfolio Support', href: '/services' },
  { label: 'Business Enquiry Assistance', href: '/services' },
  { label: 'Operational Coordination', href: '/services' },
  { label: 'Quality-Focused Execution', href: '/services' },
  { label: 'Long-Term Partnership Approach', href: '/services' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-blue-50/70 via-cyan-50/30 to-transparent dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-16">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-2 shadow-sm ring-1 ring-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:ring-slate-800">
              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={220}
                height={90}
                className="h-14 w-auto object-contain"
              />
            </div>

            <div>
              <h2 className="bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text text-base font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-300 dark:to-cyan-400">
                Venzura Medcor
              </h2>

              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Your one stop solution for all things.
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
            Trusted pharma manufacturing and healthcare solutions with a focus on
            quality, innovation, and long-term partnerships.
          </p>

          <div className="pt-1">
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h4 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text text-[12px] font-bold uppercase tracking-[0.16em] text-transparent dark:from-white dark:via-blue-300 dark:to-cyan-400">
            Quick Links
          </h4>

          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block text-sm font-medium text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text text-[12px] font-bold uppercase tracking-[0.16em] text-transparent dark:from-white dark:via-blue-300 dark:to-cyan-400">
            Services
          </h4>

          <ul className="flex flex-col gap-3">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-block text-sm font-medium text-slate-600 transition-all duration-300 hover:translate-x-1 hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text text-[12px] font-bold uppercase tracking-[0.16em] text-transparent dark:from-white dark:via-blue-300 dark:to-cyan-400">
            Contact
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="shrink-0 font-semibold text-slate-600 dark:text-slate-300">
                Email:
              </span>
              <a
                href="mailto:venzuramedcor@gmail.com"
                className="truncate bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text font-semibold text-transparent transition-opacity duration-300 hover:opacity-80"
              >
                venzuramedcor@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0 font-semibold text-slate-600 dark:text-slate-300">
                Phone:
              </span>
              <a
                href="tel:+919138112320"
                className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text font-semibold text-transparent transition-opacity duration-300 hover:opacity-80"
              >
                +91 91381 12320
              </a>
            </div>

            <div className="flex items-start gap-2 leading-6">
              <span className="shrink-0 font-semibold text-slate-600 dark:text-slate-300">
                Address:
              </span>
              <p className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                15/7, 2/1 Manchanda Complex Kuldeep Nagar Nanhera Road, Ambala
                Cantt, Haryana, India
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <div className="mb-4 h-px w-full bg-gradient-to-r from-blue-700 via-cyan-500 to-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-transparent" />

            <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              Subscribe to receive product and business updates.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="h-11 w-full rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-900/30"
              />

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(37,99,235,0.32)]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-16">
          <p>
            © {year}{' '}
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text font-semibold text-transparent dark:from-white dark:via-blue-300 dark:to-cyan-400">
              Venzura Medcor
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
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
    <footer className="border-t border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-14 px-4 pt-20 pb-6 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-transparent p-0 ring-0 dark:bg-white/15 dark:p-2 dark:backdrop-blur-md dark:ring-1 dark:ring-white/15 dark:shadow-lg dark:shadow-black/25">
              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={220}
                height={90}
                className="h-16 w-auto object-contain"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                Venzura{' '}
                <span className="text-blue-700 dark:text-blue-400">Medcor</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your one stop solution for all things.
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
            Trusted pharma manufacturing and healthcare solutions with a focus on
            quality, innovation, and long-term partnerships.
          </p>

          <div>
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-900 dark:text-white">
            Quick Links
          </h4>

          <ul className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-900 dark:text-white">
            Services
          </h4>

          <ul className="flex flex-col gap-4">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-8 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-900 dark:text-white">
            Contact
          </h4>

          <div className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            <p>
              Email:{' '}
              <a
                href="mailto:venzuramedcor@gmail.com"
                className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
              >
                venzuramedcor@gmail.com
              </a>
            </p>

            <p>
              Phone:{' '}
              <a
                href="tel:+919138112320"
                className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
              >
                +91 91381 12320
              </a>
            </p>

            <p className="leading-6">
              Headquarters- 15/7, 2/1 Manchanda Complex Kuldeep Nagar Nanhera
              Road, Ambala Cantt, Haryana, India
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm font-medium text-slate-600 dark:text-slate-300">
              Subscribe to receive product and business updates.
            </p>

            <div className="flex rounded-2xl bg-slate-100 p-2 ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-blue-500 dark:bg-slate-900 dark:ring-slate-800">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-16">
          <p>© {year} Venzura Medcor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
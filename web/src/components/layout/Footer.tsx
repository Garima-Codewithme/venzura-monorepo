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
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-16 top-10 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(199,255,216,0.46)' }}
        />
        <div
          className="animate-float-soft absolute right-0 top-12 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(152,222,217,0.32)' }}
        />
        <div
          className="animate-pulse-soft absolute inset-x-0 top-0 h-28"
          style={{
            background:
              'linear-gradient(to bottom, rgba(199,255,216,0.65), rgba(152,222,217,0.22), transparent)',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pt-14 pb-8 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-16">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div
              className="rounded-2xl p-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #c7ffd8 100%)',
                boxShadow: '0 4px 16px rgba(9,99,126,0.08)',
                border: '1px solid var(--border)',
              }}
            >
              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={220}
                height={90}
                className="h-14 w-auto object-contain"
              />
            </div>

            <div>
              <h2 className="brand-gradient-text text-base font-extrabold tracking-tight">
                Venzura Medcor
              </h2>

              <p className="mt-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                Your one stop solution for all things.
              </p>
            </div>
          </div>

          <p
            className="max-w-sm text-sm leading-6"
            style={{ color: 'var(--muted)' }}
          >
            Trusted pharma manufacturing and healthcare solutions with a focus on
            quality, innovation, and long-term partnerships.
          </p>

          <div className="pt-1">
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h4 className="brand-gradient-text mb-4 text-[12px] font-bold uppercase tracking-[0.16em]">
            Quick Links
          </h4>

          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  style={{ color: 'var(--text)' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="brand-gradient-text mb-4 text-[12px] font-bold uppercase tracking-[0.16em]">
            Services
          </h4>

          <ul className="flex flex-col gap-3">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-block text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  style={{ color: 'var(--text)' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="brand-gradient-text mb-4 text-[12px] font-bold uppercase tracking-[0.16em]">
            Contact
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="shrink-0 font-semibold" style={{ color: 'var(--text)' }}>
                Email:
              </span>
              <a
                href="mailto:venzuramedcor@gmail.com"
                className="brand-gradient-text truncate font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                venzuramedcor@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0 font-semibold" style={{ color: 'var(--text)' }}>
                Phone:
              </span>
              <a
                href="tel:+919138112320"
                className="brand-gradient-text font-semibold transition-opacity duration-300 hover:opacity-80"
              >
                +91 91381 12320
              </a>
            </div>

            <div className="flex items-start gap-2 leading-6">
              <span className="shrink-0 font-semibold" style={{ color: 'var(--text)' }}>
                Address:
              </span>
              <p className="brand-gradient-text">
                15/7, 2/1 Manchanda Complex Kuldeep Nagar Nanhera Road, Ambala
                Cantt, Haryana, India
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4">
            <div className="brand-line mb-4 h-px w-full" />

            <p className="mb-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>
              Subscribe to receive product and business updates.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="h-11 w-full rounded-full bg-white px-4 text-sm shadow-sm outline-none transition-all duration-300"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />

              <button
                type="button"
                className="brand-button inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold shadow-[0_10px_24px_rgba(9,99,126,0.18)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div
          className="mx-auto max-w-7xl px-4 py-4 text-center text-sm sm:px-6 lg:px-16"
          style={{ color: 'var(--muted)' }}
        >
          <p>
            © {year}{' '}
            <span className="brand-gradient-text font-semibold">
              Venzura Medcor
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
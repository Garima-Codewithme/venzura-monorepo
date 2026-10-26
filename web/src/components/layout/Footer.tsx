import type { ReactNode } from 'react'
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
        background:
          'linear-gradient(135deg, #041a30 0%, #072b50 38%, #0b3f70 70%, #145da0 120%)',
        color: '#ffffff',
        borderTop:
          '1px solid rgba(169,213,255,0.14)',
      }}
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-24 top-16 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'rgba(78,163,241,0.18)',
          }}
        />

        <div
          className="animate-float-soft absolute -right-24 top-4 h-96 w-96 rounded-full blur-3xl"
          style={{
            background:
              'rgba(169,213,255,0.12)',
          }}
        />

        <div
          className="animate-pulse-soft absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              'rgba(31,111,209,0.12)',
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(78,163,241,0.12), rgba(31,111,209,0.05), transparent)',
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(169,213,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(169,213,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '46px 46px',
          }}
        />

        <div
          className="absolute left-1/2 top-0 h-px w-[76%] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(78,163,241,0.55), rgba(169,213,255,0.42), transparent)',
          }}
        />
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-16">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div
              className="relative overflow-hidden rounded-2xl p-2 transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(238,245,255,0.96), rgba(216,234,255,0.94))',
                border:
                  '1px solid rgba(169,213,255,0.24)',
                boxShadow:
                  '0 14px 36px rgba(0,0,0,0.18), 0 0 26px rgba(78,163,241,0.10)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full blur-xl"
                style={{
                  background:
                    'rgba(78,163,241,0.20)',
                }}
              />

              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={220}
                height={90}
                className="relative h-14 w-auto object-contain"
              />
            </div>

            <div>
              <h2
                className="text-base font-extrabold tracking-tight"
                style={{
                  background:
                    'linear-gradient(90deg, #ffffff 0%, #d8eaff 45%, #72b9f5 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Venzura Medcor
              </h2>

              <p
                className="mt-1 text-[11px] font-medium tracking-wide"
                style={{
                  color:
                    'rgba(216,234,255,0.72)',
                }}
              >
                Your one stop solution for all things.
              </p>
            </div>
          </div>

          <p
            className="max-w-sm text-sm leading-7"
            style={{
              color:
                'rgba(216,234,255,0.76)',
            }}
          >
            Trusted pharma manufacturing and healthcare solutions with a focus
            on quality, innovation, reliable execution, and long-term business
            partnerships.
          </p>

          <div
            className="h-px w-20"
            style={{
              background:
                'linear-gradient(90deg, #4ea3f1, rgba(169,213,255,0.30), transparent)',
            }}
          />

          <div
            className="w-fit rounded-2xl p-2"
            style={{
              background:
                'rgba(255,255,255,0.05)',
              border:
                '1px solid rgba(169,213,255,0.10)',
            }}
          >
            <ThemeToggle />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <FooterHeading>
            Quick Links
          </FooterHeading>

          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:translate-x-1"
                  style={{
                    color:
                      'rgba(216,234,255,0.78)',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{
                      background:
                        'linear-gradient(135deg, #4ea3f1, #a9d5ff)',
                      boxShadow:
                        '0 0 8px rgba(78,163,241,0.35)',
                    }}
                  />

                  <span className="transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <FooterHeading>
            Services
          </FooterHeading>

          <ul className="flex flex-col gap-3">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group inline-flex items-start gap-2 text-sm font-medium leading-5 transition-all duration-300 hover:translate-x-1"
                  style={{
                    color:
                      'rgba(216,234,255,0.78)',
                  }}
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{
                      background:
                        'linear-gradient(135deg, #4ea3f1, #a9d5ff)',
                      boxShadow:
                        '0 0 8px rgba(78,163,241,0.35)',
                    }}
                  />

                  <span className="transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>
            Contact
          </FooterHeading>

          <div className="space-y-4 text-sm">
            <ContactCard label="Email">
              <a
                href="mailto:venzuramedcor@gmail.com"
                className="break-all text-sm font-semibold transition-colors duration-300 hover:text-white"
                style={{
                  color: '#d8eaff',
                }}
              >
                venzuramedcor@gmail.com
              </a>
            </ContactCard>

            <ContactCard label="Phone">
              <a
                href="tel:+919138112320"
                className="text-sm font-semibold transition-colors duration-300 hover:text-white"
                style={{
                  color: '#d8eaff',
                }}
              >
                +91 91381 12320
              </a>
            </ContactCard>

            <ContactCard label="Address">
              <p
                className="text-sm leading-6"
                style={{
                  color:
                    'rgba(216,234,255,0.78)',
                }}
              >
                SCO 15-16 B Block, Prabhu Prem Puram, Khojkipur Road, Ambala Cantt, Haryana,
                Pin Code-133006
              </p>
            </ContactCard>
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <div
              className="mb-5 h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(78,163,241,0.60), rgba(169,213,255,0.18), transparent)',
              }}
            />

            <p
              className="mb-3 text-sm font-medium leading-6"
              style={{
                color:
                  'rgba(216,234,255,0.74)',
              }}
            >
              Subscribe to receive product and business updates.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="h-11 min-w-0 flex-1 rounded-full px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/50 focus:ring-2 focus:ring-blue-400/40"
                style={{
                  background:
                    'rgba(255,255,255,0.08)',
                  border:
                    '1px solid rgba(169,213,255,0.18)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              />

              <button
                type="button"
                className="brand-button group relative inline-flex h-11 shrink-0 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-12 w-10 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]" />

                <span className="relative z-10">
                  Join
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative"
        style={{
          borderTop:
            '1px solid rgba(169,213,255,0.10)',
          background:
            'rgba(3,20,37,0.24)',
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm sm:px-6 md:flex-row md:text-left lg:px-16">
          <p
            style={{
              color:
                'rgba(216,234,255,0.65)',
            }}
          >
            © {year}{' '}
            <span className="font-semibold text-white">
              Venzura Medcor
            </span>
            . All rights reserved.
          </p>

          <p
            className="text-xs font-medium tracking-wide"
            style={{
              color:
                'rgba(169,213,255,0.62)',
            }}
          >
            Quality • Reliability • Partnership
          </p>
        </div>
      </div>
    </footer>
  )
}

/* =====================================================
   FOOTER HEADING
===================================================== */

function FooterHeading({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="mb-5">
      <h4
        className="text-[12px] font-bold uppercase tracking-[0.18em]"
        style={{
          background:
            'linear-gradient(90deg, #ffffff 0%, #a9d5ff 55%, #4ea3f1 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {children}
      </h4>

      <div
        className="mt-2 h-0.5 w-12 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #4ea3f1, #a9d5ff)',
          boxShadow:
            '0 0 12px rgba(78,163,241,0.20)',
        }}
      />
    </div>
  )
}

/* =====================================================
   CONTACT CARD
===================================================== */

function ContactCard({
  label,
  children,
}: Readonly<{
  label: string
  children: ReactNode
}>) {
  return (
    <div
      className="rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background:
          'rgba(255,255,255,0.045)',
        border:
          '1px solid rgba(169,213,255,0.10)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <p
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{
          color: '#72b9f5',
        }}
      >
        {label}
      </p>

      {children}
    </div>
  )
}
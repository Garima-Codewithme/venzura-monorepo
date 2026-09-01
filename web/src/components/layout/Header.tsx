'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/navLinks'
import { productMegaMenu } from '@/data/productMegaMenu'

export default function Header() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 55)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  const isProductsActive = useMemo(() => {
    return pathname === '/products' || pathname.startsWith('/products/')
  }, [pathname])

  const megaButtonStyle = {
    backgroundColor: '#1f6fd1',
    backgroundImage:
      'linear-gradient(135deg, #0b3f70 0%, #145da0 32%, #1f6fd1 68%, #4ea3f1 110%)',
    color: '#ffffff',
    border: '1px solid rgba(169,213,255,0.22)',
    boxShadow: '0 14px 30px rgba(31,111,209,0.24)',
  } as const

  return (
    <header
      className="sticky top-0 z-50 w-full overflow-visible transition-all duration-500"
      style={{
        backgroundColor: isScrolled
          ? 'rgba(246,249,255,0.92)'
          : 'rgba(232,243,255,0.72)',

        backgroundImage: isScrolled
          ? `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.93) 0%,
              rgba(243,248,255,0.91) 30%,
              rgba(232,243,255,0.88) 66%,
              rgba(216,234,255,0.84) 100%
            )
          `
          : `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.80) 0%,
              rgba(238,245,255,0.76) 30%,
              rgba(216,234,255,0.70) 68%,
              rgba(169,213,255,0.58) 120%
            )
          `,

        borderBottom: isScrolled
          ? '1px solid rgba(31,111,209,0.14)'
          : '1px solid rgba(169,213,255,0.24)',

        boxShadow: isScrolled
          ? '0 14px 38px rgba(11,63,112,0.11)'
          : '0 8px 28px rgba(11,63,112,0.07)',

        backdropFilter: isScrolled ? 'blur(24px)' : 'blur(18px)',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'blur(18px)',
      }}
    >
      {/* =====================================================
          CRYSTAL BACKGROUND EFFECTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-16 -top-20 h-40 w-40 rounded-full blur-3xl transition-all duration-500"
          style={{
            background: isScrolled
              ? 'rgba(78,163,241,0.09)'
              : 'rgba(78,163,241,0.15)',
          }}
        />

        <div
          className="animate-float-soft absolute -right-14 -top-16 h-40 w-40 rounded-full blur-3xl transition-all duration-500"
          style={{
            background: isScrolled
              ? 'rgba(169,213,255,0.14)'
              : 'rgba(169,213,255,0.20)',
          }}
        />

        {/* middle crystal glow */}
        <div
          className="absolute left-[42%] top-0 h-24 w-48 rounded-full blur-3xl transition-all duration-500"
          style={{
            background: isScrolled
              ? 'rgba(216,234,255,0.18)'
              : 'rgba(169,213,255,0.16)',
          }}
        />

        {/* top glass highlight */}
        <div
          className="absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.88), rgba(169,213,255,0.54), transparent)',
          }}
        />

        {/* bottom subtle gradient line */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 3%, rgba(78,163,241,0.13), rgba(31,111,209,0.20), rgba(78,163,241,0.13), transparent 97%)',
          }}
        />
      </div>

      {/* =====================================================
          HEADER CONTENT
      ===================================================== */}

      <div
        className={`relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 transition-all duration-500 md:px-8 lg:px-16 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <div className="flex shrink-0 items-center">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="relative overflow-hidden rounded-2xl p-1.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_28px_rgba(31,111,209,0.14)]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.94)',

                backgroundImage:
                  'linear-gradient(135deg, rgba(255,255,255,0.99), rgba(243,248,255,0.95), rgba(216,234,255,0.88))',

                border: '1px solid rgba(31,111,209,0.12)',

                boxShadow: isScrolled
                  ? '0 8px 22px rgba(11,63,112,0.08)'
                  : '0 9px 26px rgba(11,63,112,0.10)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-5 -top-5 h-14 w-14 rounded-full blur-xl"
                style={{
                  background: 'rgba(78,163,241,0.17)',
                }}
              />

              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={70}
                height={70}
                className={`relative w-auto object-contain transition-all duration-500 ${
                  isScrolled ? 'h-11 md:h-12' : 'h-12 md:h-14'
                }`}
                priority
              />
            </div>

            {/* brand name */}
            <div className="flex flex-col leading-none">
              <span
                className="text-base font-extrabold tracking-wide md:text-xl"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #072b50 0%, #0b3f70 30%, #145da0 58%, #1f6fd1 80%, #4ea3f1 110%)',

                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',

                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Venzura Medcor
              </span>
            </div>
          </Link>
        </div>

        {/* =====================================================
            DESKTOP NAV
        ===================================================== */}

        <div className="hidden flex-1 items-center justify-center lg:flex">
          <nav className="flex items-center gap-8 xl:gap-10">
            {navLinks.map((item) => {
              const isProductsItem =
                item.href === '/products' ||
                item.label.toLowerCase() === 'products'

              if (isProductsItem) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="group relative inline-flex items-center text-sm font-semibold transition-all duration-300 hover:text-[#0b3f70]"
                      style={{
                        color: isProductsActive
                          ? '#0b3f70'
                          : '#294b6b',
                      }}
                    >
                      {item.label}

                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                          isProductsActive
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        }`}
                        style={{
                          background:
                            'linear-gradient(90deg, #0b3f70 0%, #1f6fd1 55%, #4ea3f1 100%)',

                          boxShadow:
                            '0 0 10px rgba(78,163,241,0.30)',
                        }}
                      />
                    </Link>

                    {/* =================================================
                        HOVER BRIDGE + MEGA MENU
                    ================================================= */}

                    <div
                      className={`absolute left-1/2 top-full w-[980px] max-w-[calc(100vw-64px)] -translate-x-1/2 pt-5 transition-all duration-300 ${
                        productsOpen
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible translate-y-3 opacity-0'
                      }`}
                    >
                      <div
                        className="relative overflow-hidden rounded-[30px] p-3"
                        style={{
                          backgroundColor: '#ffffff',

                          backgroundImage:
                            'linear-gradient(135deg, rgba(255,255,255,0.99), rgba(243,248,255,0.98), rgba(232,243,255,0.96))',

                          border:
                            '1px solid rgba(31,111,209,0.14)',

                          boxShadow:
                            '0 30px 80px rgba(7,43,80,0.20)',

                          backdropFilter: 'blur(22px)',
                          WebkitBackdropFilter: 'blur(22px)',
                        }}
                      >
                        <div
                          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                          style={{
                            background: 'rgba(78,163,241,0.14)',
                          }}
                        />

                        <div
                          className="pointer-events-none absolute -bottom-16 right-1/4 h-44 w-44 rounded-full blur-3xl"
                          style={{
                            background: 'rgba(169,213,255,0.18)',
                          }}
                        />

                        <div className="relative grid gap-4 lg:grid-cols-[1.1fr_1.1fr_0.95fr]">
                          {productMegaMenu.map((section) => (
                            <div
                              key={section.title}
                              className="rounded-[24px] p-5"
                              style={{
                                backgroundColor: '#ffffff',

                                backgroundImage:
                                  'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(245,249,255,0.94))',

                                border:
                                  '1px solid rgba(31,111,209,0.10)',

                                boxShadow:
                                  '0 10px 30px rgba(11,63,112,0.04)',
                              }}
                            >
                              <p
                                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                                style={{
                                  color: 'var(--primary)',
                                }}
                              >
                                {section.title}
                              </p>

                              <div
                                className="mt-3 h-px w-full"
                                style={{
                                  background:
                                    'linear-gradient(90deg, rgba(31,111,209,0.34), rgba(78,163,241,0.08), transparent)',
                                }}
                              />

                              <div className="mt-4 space-y-2">
                                {section.items.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="group block rounded-2xl px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(31,111,209,0.09)]"
                                    style={{
                                      backgroundColor:
                                        'rgba(255,255,255,0.96)',

                                      backgroundImage:
                                        'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(243,248,255,0.84))',

                                      border:
                                        '1px solid rgba(31,111,209,0.08)',
                                    }}
                                  >
                                    <p
                                      className="text-sm font-semibold"
                                      style={{
                                        color: 'var(--heading-text)',
                                      }}
                                    >
                                      {subItem.label}
                                    </p>

                                    <p
                                      className="mt-1 text-xs leading-5"
                                      style={{
                                        color: 'var(--body-text)',
                                      }}
                                    >
                                      {subItem.description}
                                    </p>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* Product CTA */}
                          <div
                            className="relative overflow-hidden rounded-[24px] px-5 py-6 text-white"
                            style={{
                              backgroundColor: '#072b50',

                              backgroundImage:
                                'linear-gradient(135deg, #041a30 0%, #072b50 34%, #0b3f70 66%, #1f6fd1 115%)',

                              boxShadow:
                                '0 20px 50px rgba(3,24,45,0.26)',
                            }}
                          >
                            <div
                              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                              style={{
                                background: 'rgba(78,163,241,0.28)',
                              }}
                            />

                            <div
                              className="pointer-events-none absolute -bottom-14 -left-12 h-40 w-40 rounded-full blur-3xl"
                              style={{
                                background: 'rgba(169,213,255,0.12)',
                              }}
                            />

                            <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
                              Browse Products
                            </p>

                            <div
                              className="relative mt-3 h-0.5 w-14 rounded-full"
                              style={{
                                background:
                                  'linear-gradient(90deg, #4ea3f1, #a9d5ff)',
                              }}
                            />

                            <h3 className="relative mt-4 text-2xl font-bold leading-snug text-white">
                              Explore product categories directly from the menu
                            </h3>

                            <p className="relative mt-4 text-sm leading-6 text-white/75">
                              Browse Cosmetic, Supplements, Allopathy,
                              Ayurvedic, Veterinary, and Injections.
                            </p>

                            <div className="relative mt-6 flex flex-col gap-3">
                              <MegaButton href="/products">
                                View All Products
                              </MegaButton>

                              <MegaButton href="/contact">
                                Product Enquiry
                              </MegaButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm font-semibold transition-all duration-300 hover:text-[#0b3f70]"
                  style={{
                    color: isActive ? '#0b3f70' : '#294b6b',
                  }}
                >
                  {item.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      background:
                        'linear-gradient(90deg, #0b3f70 0%, #1f6fd1 55%, #4ea3f1 100%)',

                      boxShadow:
                        '0 0 10px rgba(78,163,241,0.30)',
                    }}
                  />
                </Link>
              )
            })}
          </nav>
        </div>

        {/* =====================================================
            ENQUIRE NOW
        ===================================================== */}

        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              backgroundColor: '#1f6fd1',

              backgroundImage:
                'linear-gradient(135deg, #0b3f70 0%, #145da0 30%, #1f6fd1 68%, #4ea3f1 110%)',

              border:
                '1px solid rgba(169,213,255,0.28)',

              boxShadow:
                '0 12px 28px rgba(31,111,209,0.24)',
            }}
          >
            <span className="pointer-events-none absolute inset-y-0 -left-12 w-10 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[120%]" />

            <span className="relative z-10">
              Enquire Now
            </span>
          </Link>
        </div>

        {/* =====================================================
            MOBILE TOGGLE
        ===================================================== */}

        <button
          type="button"
          className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-0.5 lg:hidden"
          style={{
            color: '#0b3f70',

            backgroundColor: 'rgba(255,255,255,0.90)',

            backgroundImage:
              'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(232,243,255,0.92))',

            border:
              '1px solid rgba(31,111,209,0.14)',

            boxShadow:
              '0 8px 22px rgba(7,43,80,0.10)',
          }}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="relative z-10">
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </span>
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {isOpen && (
        <div
          className="relative w-full lg:hidden"
          style={{
            backgroundColor: 'rgba(246,249,255,0.98)',

            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(238,245,255,0.97), rgba(232,243,255,0.95))',

            borderTop:
              '1px solid rgba(31,111,209,0.10)',

            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',

            boxShadow:
              '0 20px 40px rgba(7,43,80,0.12)',
          }}
        >
          <div className="mx-auto flex w-full max-w-[1600px] flex-col px-4 py-4 md:px-8">
            {navLinks.map((item) => {
              const isProductsItem =
                item.href === '/products' ||
                item.label.toLowerCase() === 'products'

              if (isProductsItem) {
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileProductsOpen((prev) => !prev)
                      }
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: isProductsActive
                          ? 'rgba(31,111,209,0.08)'
                          : 'transparent',

                        color: isProductsActive
                          ? '#0b3f70'
                          : '#294b6b',
                      }}
                    >
                      <span>{item.label}</span>

                      <span
                        className={`text-xs transition-transform duration-300 ${
                          mobileProductsOpen
                            ? 'rotate-180'
                            : ''
                        }`}
                        style={{
                          color: '#1f6fd1',
                        }}
                      >
                        ▾
                      </span>
                    </button>

                    {mobileProductsOpen && (
                      <div
                        className="mt-2 space-y-3 rounded-2xl p-3"
                        style={{
                          backgroundColor: '#ffffff',

                          backgroundImage:
                            'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(238,245,255,0.95))',

                          border:
                            '1px solid rgba(31,111,209,0.10)',
                        }}
                      >
                        <MegaButton href="/products">
                          View All Products
                        </MegaButton>

                        {productMegaMenu.map((section) => (
                          <div key={section.title}>
                            <p
                              className="px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                              style={{
                                color: 'var(--primary)',
                              }}
                            >
                              {section.title}
                            </p>

                            <div className="space-y-2">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded-xl px-3 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5"
                                  style={{
                                    backgroundColor:
                                      'rgba(255,255,255,0.94)',

                                    color: 'var(--body-strong)',

                                    border:
                                      '1px solid rgba(31,111,209,0.07)',
                                  }}
                                >
                                  <span
                                    className="block font-semibold"
                                    style={{
                                      color:
                                        'var(--heading-text)',
                                    }}
                                  >
                                    {subItem.label}
                                  </span>

                                  <span
                                    className="mt-1 block text-xs leading-5"
                                    style={{
                                      color:
                                        'var(--body-text)',
                                    }}
                                  >
                                    {subItem.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(31,111,209,0.08)'
                      : 'transparent',

                    color: isActive
                      ? '#0b3f70'
                      : '#294b6b',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="mt-4">
              <MegaButton href="/contact">
                Enquire Now
              </MegaButton>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MegaButton({
  href,
  children,
}: Readonly<{
  href: string
  children: ReactNode
}>) {
  return (
    <Link
      href={href}
      className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: '#1f6fd1',

        backgroundImage:
          'linear-gradient(135deg, #0b3f70 0%, #145da0 32%, #1f6fd1 68%, #4ea3f1 110%)',

        border:
          '1px solid rgba(169,213,255,0.20)',

        boxShadow:
          '0 14px 30px rgba(31,111,209,0.24)',
      }}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-12 w-10 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]" />

      <span className="relative z-10">
        {children}
      </span>
    </Link>
  )
}
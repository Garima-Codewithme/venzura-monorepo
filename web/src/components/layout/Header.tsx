'use client'

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
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
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
    background: 'linear-gradient(135deg, #09637e 0%, #0b7d97 58%, #98ded9 145%)',
    color: '#ffffff',
    boxShadow: '0 12px 24px rgba(9,99,126,0.24)',
  } as const

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible transition-all duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_rgba(9,99,126,0.10)]' : ''
      }`}
      style={{
        borderBottom: isScrolled
          ? '1px solid var(--border)'
          : '1px solid transparent',
        background: isScrolled
          ? 'rgba(246,246,246,0.96)'
          : 'rgba(246,246,246,0.90)',
        backdropFilter: 'blur(18px)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-12 top-0 h-24 w-24 rounded-full blur-3xl"
          style={{ background: 'rgba(152,222,217,0.35)' }}
        />
        <div
          className="animate-float-soft absolute right-0 top-2 h-24 w-24 rounded-full blur-3xl"
          style={{ background: 'rgba(199,255,216,0.45)' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-16">
        <div className="flex shrink-0 items-center">
          <Link href="/" className="group flex items-center gap-3">
            <div
              className="rounded-2xl p-1.5 transition duration-300 group-hover:shadow-md"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #c7ffd8 100%)',
                boxShadow: '0 4px 16px rgba(9,99,126,0.08)',
                border: '1px solid var(--border)',
              }}
            >
              <Image
                src="/logo.png"
                alt="Venzura Medcor"
                width={70}
                height={70}
                className="h-12 w-auto object-contain md:h-14"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="brand-gradient-text text-base font-extrabold tracking-wide md:text-xl">
                Venzura Medcor
              </span>
            </div>
          </Link>
        </div>

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
                      className="group relative inline-flex items-center text-sm font-semibold transition duration-200"
                      style={{
                        color: isProductsActive ? 'var(--dark)' : 'var(--text)',
                      }}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                          isProductsActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        style={{
                          background:
                            'linear-gradient(90deg, var(--dark), var(--primary), var(--soft-accent))',
                        }}
                      />
                    </Link>

                    <div
                      className={`absolute left-1/2 top-full mt-5 w-[980px] max-w-[calc(100vw-64px)] -translate-x-1/2 transition-all duration-300 ${
                        productsOpen
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible translate-y-3 opacity-0'
                      }`}
                    >
                      <div
                        className="overflow-hidden rounded-[30px] p-3"
                        style={{
                          border: '1px solid var(--border)',
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(199,255,216,0.34), rgba(152,222,217,0.16))',
                          boxShadow: '0 28px 70px rgba(9,99,126,0.12)',
                          backdropFilter: 'blur(18px)',
                        }}
                      >
                        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.1fr_0.95fr]">
                          {productMegaMenu.map((section) => (
                            <div
                              key={section.title}
                              className="rounded-[24px] bg-white/84 p-5"
                              style={{ border: '1px solid rgba(9,99,126,0.08)' }}
                            >
                              <p
                                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                                style={{ color: 'var(--dark)' }}
                              >
                                {section.title}
                              </p>

                              <div className="mt-4 space-y-2">
                                {section.items.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    className="block rounded-2xl px-3 py-3 transition-all duration-300 hover:-translate-y-0.5"
                                    style={{
                                      background: 'rgba(255,255,255,0.78)',
                                      border: '1px solid rgba(9,99,126,0.06)',
                                    }}
                                  >
                                    <div>
                                      <p
                                        className="text-sm font-semibold"
                                        style={{ color: 'var(--heading-text)' }}
                                      >
                                        {subItem.label}
                                      </p>
                                      <p
                                        className="mt-1 text-xs leading-5"
                                        style={{ color: 'var(--body-text)' }}
                                      >
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <div
                            className="relative overflow-hidden rounded-[24px] px-5 py-6 text-white"
                            style={{
                              background:
                                'linear-gradient(135deg, #064c61 0%, #09637e 52%, #0b7d97 100%)',
                            }}
                          >
                            <div
                              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl"
                              style={{ background: 'rgba(199,255,216,0.22)' }}
                            />
                            <div
                              className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full blur-3xl"
                              style={{ background: 'rgba(152,222,217,0.22)' }}
                            />

                            <p className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                              Browse Products
                            </p>

                            <h3 className="relative mt-3 text-2xl font-bold leading-snug text-white">
                              Explore product categories directly from the menu
                            </h3>

                            <p className="relative mt-4 text-sm leading-6 text-white/80">
                              Browse major business categories including Cosmetic,
                              Supplements, Allopathy, Ayurvedic, Veterinary, and
                              Injections.
                            </p>

                            <div className="relative mt-6 flex flex-col gap-3">
                              <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                                style={megaButtonStyle}
                              >
                                View All Products
                              </Link>

                              <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                                style={megaButtonStyle}
                              >
                                Product Enquiry
                              </Link>
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
                  className="group relative text-sm font-semibold transition duration-200"
                  style={{
                    color: isActive ? 'var(--dark)' : 'var(--text)',
                  }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    style={{
                      background:
                        'linear-gradient(90deg, var(--dark), var(--primary), var(--soft-accent))',
                    }}
                  />
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href="/contact"
            className="brand-button group relative inline-flex items-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_rgba(9,99,126,0.18)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Enquire Now</span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 transition lg:hidden"
          style={{
            color: 'var(--dark)',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.8)',
          }}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="relative lg:hidden"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'rgba(246,246,246,0.98)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 md:px-8">
            {navLinks.map((item) => {
              const isProductsItem =
                item.href === '/products' ||
                item.label.toLowerCase() === 'products'

              if (isProductsItem) {
                return (
                  <div key={item.href} className="rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition"
                      style={{
                        background: isProductsActive
                          ? 'var(--soft-accent)'
                          : 'transparent',
                        color: isProductsActive ? 'var(--dark)' : 'var(--text)',
                      }}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-xs transition-transform duration-300 ${
                          mobileProductsOpen ? 'rotate-180' : ''
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {mobileProductsOpen && (
                      <div className="mt-2 space-y-3 rounded-2xl bg-white/70 p-3">
                        <Link
                          href="/products"
                          className="block rounded-xl px-3 py-2 text-sm font-semibold"
                          style={{ color: 'var(--dark)' }}
                        >
                          View All Products
                        </Link>

                        {productMegaMenu.map((section) => (
                          <div key={section.title}>
                            <p
                              className="px-3 pt-2 pb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                              style={{ color: 'var(--dark)' }}
                            >
                              {section.title}
                            </p>

                            <div className="space-y-2">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded-xl px-3 py-3 text-sm"
                                  style={{
                                    background: 'rgba(255,255,255,0.76)',
                                    color: 'var(--text)',
                                  }}
                                >
                                  <span className="block font-semibold text-[var(--heading-text)]">
                                    {subItem.label}
                                  </span>
                                  <span className="mt-1 block text-xs leading-5 text-[var(--body-text)]">
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
                  className="rounded-2xl px-4 py-3 text-sm font-semibold transition"
                  style={{
                    background: isActive ? 'var(--soft-accent)' : 'transparent',
                    color: isActive ? 'var(--dark)' : 'var(--text)',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="brand-button mt-4 inline-flex w-fit items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_rgba(9,99,126,0.18)]"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
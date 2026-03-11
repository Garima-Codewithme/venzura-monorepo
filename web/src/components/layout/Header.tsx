'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/navLinks'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'
          : 'bg-white/90 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Venzura Medcor"
            width={70}
            height={70}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />

          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-600 bg-clip-text text-base font-extrabold tracking-wide text-transparent md:text-xl">
              Venzura Medcor
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition duration-200 ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-blue-700 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}

          <Link
            href="/contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(37,99,235,0.35)]"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Enquire Now</span>
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 transition hover:bg-slate-100 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 md:px-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-2 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)]"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
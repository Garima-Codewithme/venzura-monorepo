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
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Venzura Medcor"
            width={190}
            height={70}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition ${
                  isActive ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <Link
            href="/contact"
            className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Enquire Now
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 lg:hidden"
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
                  className={`py-3 text-sm font-medium transition ${
                    isActive ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex w-fit rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
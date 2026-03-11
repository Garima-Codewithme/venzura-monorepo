'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const trustPoints = [
  'Quality Focus',
  'Modern Infrastructure',
  'Reliable Support',
  'Strong Product Range',
]

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      tl.from('.hero-badge', {
        y: 18,
        opacity: 0,
        duration: 0.45,
      })
        .from(
          '.hero-title-line',
          {
            y: 48,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          '-=0.15'
        )
        .from(
          '.hero-copy',
          {
            y: 26,
            opacity: 0,
            duration: 0.55,
          },
          '-=0.3'
        )
        .from(
          '.hero-actions',
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
          },
          '-=0.25'
        )
        .from(
          '.hero-trust-card',
          {
            y: 24,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          '-=0.2'
        )
        .from(
          '.hero-media-wrap',
          {
            scale: 0.96,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.7'
        )
        .from(
          '.hero-floating-card',
          {
            y: 18,
            opacity: 0,
            duration: 0.45,
          },
          '-=0.3'
        )

      gsap.to('.hero-media-inner', {
        y: -12,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white px-4 py-14 md:px-8 lg:px-16 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_28%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Venzura Medcor
          </div>

          <div className="space-y-2">
            <h1 className="hero-title-line text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Trusted
            </h1>
            <h1 className="hero-title-line text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Pharmaceutical
            </h1>
            <h1 className="hero-title-line text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              Manufacturing
            </h1>
            <h1 className="hero-title-line text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              With Modern Quality Standards
            </h1>
          </div>

          <p className="hero-copy mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            We deliver reliable pharmaceutical solutions through quality-driven
            operations, modern infrastructure, and long-term business support.
          </p>

          <div className="hero-actions mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 md:grid-cols-4">
            {trustPoints.map((item) => (
              <div
                key={item}
                className="hero-trust-card rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-media-wrap relative">
          <div className="hero-media-inner relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-xl">
            <Image
              src="/images/company-building.jpg"
              alt="Venzura Medcor company building"
              width={1400}
              height={1000}
              className="h-[360px] w-full object-cover md:h-[500px]"
              priority
            />
          </div>

          <div className="hero-floating-card absolute -bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Infrastructure
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Modern facility and trusted business presence
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
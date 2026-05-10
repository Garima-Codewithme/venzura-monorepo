'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { CheckCircle2, Factory, Settings2, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MANUFACTURING_VIDEO_SRC = '/videos/manufacturing.mp4'

type ManufacturingVideoShowcaseProps = {
  titleClassName?: string
}

const points = [
  'Disciplined production support with a quality-led operational mindset.',
  'Professional coordination built for reliable third-party manufacturing discussions.',
  'Modern infrastructure designed to support scalable pharmaceutical execution.',
]

const supportPoints = [
  'Third-party manufacturing support',
  'Quality-focused production process',
  'Modern infrastructure and handling',
  'Business enquiry and partnership support',
]

const pillars = [
  {
    title: 'Process Reliability',
    text: 'A structured workflow helps maintain consistency, clarity, and dependable operational execution.',
    icon: Settings2,
  },
  {
    title: 'Quality Standards',
    text: 'Our manufacturing direction is guided by process awareness, strong discipline, and responsible quality thinking.',
    icon: ShieldCheck,
  },
  {
    title: 'Manufacturing Support',
    text: 'Built to support production requirements, business enquiries, and long-term pharmaceutical partnerships.',
    icon: Factory,
  },
]

export default function ManufacturingVideoShowcase({
  titleClassName = '',
}: ManufacturingVideoShowcaseProps) {
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleReady = () => setVideoReady(true)

    if (video.readyState >= 2) {
      setVideoReady(true)
    }

    video.addEventListener('loadeddata', handleReady)
    video.addEventListener('canplay', handleReady)

    return () => {
      video.removeEventListener('loadeddata', handleReady)
      video.removeEventListener('canplay', handleReady)
    }
  }, [])

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-10 top-8 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(152, 222, 217, 0.24)' }}
        />
        <div
          className="animate-float-soft absolute right-0 top-12 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'rgba(199, 255, 216, 0.34)' }}
        />
        <div
          className="animate-pulse-soft absolute bottom-0 left-[16%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(9, 99, 126, 0.10)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(9,99,126,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(152,222,217,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at center, black, transparent 82%)',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div
            className="absolute -left-6 -top-6 h-28 w-28 rounded-full blur-2xl"
            style={{ background: 'rgba(152, 222, 217, 0.26)' }}
          />
          <div
            className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full blur-2xl"
            style={{ background: 'rgba(199, 255, 216, 0.36)' }}
          />

          <div
            className="relative overflow-hidden rounded-[34px] p-2"
            style={{
              border: '1px solid var(--border)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(199,255,216,0.22))',
              boxShadow: '0 22px 70px rgba(9,99,126,0.10)',
            }}
          >
            <div className="relative overflow-hidden rounded-[28px] bg-black">
              {!videoReady && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at top left, rgba(152,222,217,0.22), transparent 24%), radial-gradient(circle at 80% 20%, rgba(199,255,216,0.18), transparent 30%), linear-gradient(135deg, #052f3b, #09637e, #0b7d97)',
                  }}
                />
              )}

              <video
                ref={videoRef}
                src={MANUFACTURING_VIDEO_SRC}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
                className={`h-[420px] w-full object-cover object-center transition-opacity duration-700 md:h-[680px] ${
                  videoReady ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/18 via-transparent to-black/8" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dark)] shadow-sm backdrop-blur-md">
                Manufacturing Facility
              </div>

              <div className="absolute bottom-5 left-5 max-w-[90%] rounded-2xl border border-white/20 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md md:max-w-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dark)]">
                  Production Environment
                </p>
                <p className="mt-1 text-sm font-medium leading-6 text-[var(--body-strong)]">
                  Designed for reliable execution, strong process discipline, and professional manufacturing support.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--dark)]">
            Manufacturing Services
          </p>

          <h2
            className={`${titleClassName} mt-4 text-3xl font-bold leading-tight text-[var(--heading-text)] md:text-5xl`}
          >
            Strong Capabilities Backed By Modern Operations
          </h2>

          <div
            className="mt-4 h-1.5 w-24 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, var(--dark), var(--primary), var(--soft-accent))',
            }}
          />

          <p className="mt-6 text-base leading-7 text-[var(--body-text)] md:text-lg md:leading-8">
            Our manufacturing services are built around process discipline,
            responsible coordination, and a quality-focused approach designed to
            support long-term pharmaceutical production partnerships.
          </p>

          <div className="mt-8 grid gap-4">
            {points.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-3 rounded-2xl bg-white/88 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: '1px solid var(--border)',
                  boxShadow: '0 10px 24px rgba(9,99,126,0.06)',
                }}
              >
                <span
                  className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--dark), #0b7d97, var(--primary))',
                  }}
                >
                  <CheckCircle2 size={17} />
                </span>
                <p className="text-sm leading-6 text-[var(--body-strong)] md:text-[15px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {supportPoints.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.06 }}
                className="rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm"
                style={{
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.82)',
                  color: 'var(--body-strong)',
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/contact"
              className="brand-button inline-flex rounded-full px-6 py-3 text-sm font-semibold shadow-[0_10px_26px_rgba(9,99,126,0.18)] transition duration-300 hover:-translate-y-0.5"
            >
              Discuss Manufacturing
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
        {pillars.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[28px] bg-white/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid var(--border)',
                boxShadow: '0 18px 45px rgba(9,99,126,0.08)',
              }}
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{
                  background:
                    'linear-gradient(135deg, var(--dark), #0b7d97, var(--primary))',
                }}
              >
                <Icon size={22} />
              </div>

              <h3
                className={`${titleClassName} mt-5 text-2xl font-bold leading-snug text-[var(--heading-text)]`}
              >
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[var(--body-text)]">
                {item.text}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
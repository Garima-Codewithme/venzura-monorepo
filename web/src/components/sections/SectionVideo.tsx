'use client'

import { motion } from 'motion/react'

const points = [
  'Professional infrastructure and facility orientation',
  'Reliable workflow and disciplined execution',
  'Strong support for manufacturing and business collaboration',
]

export default function SectionVideo() {
  return (
    <section className="bg-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Inside Venzura
          </p>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            A Modern Pharmaceutical Environment Built For Reliability
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Our operational direction reflects discipline, quality awareness, and
            a modern infrastructure mindset that supports trusted pharmaceutical
            partnerships.
          </p>

          <div className="mt-8 grid gap-4">
            {points.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-black shadow-xl"
        >
          <video
            src="/videos/facility.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-[280px] w-full object-cover md:h-[520px]"
          />

          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 backdrop-blur">
            Modern Operations
          </div>

          <div className="absolute bottom-5 right-5 rounded-2xl bg-white/92 px-5 py-4 shadow-lg backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Venzura Medcor
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800">
              Quality-driven infrastructure and workflow
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
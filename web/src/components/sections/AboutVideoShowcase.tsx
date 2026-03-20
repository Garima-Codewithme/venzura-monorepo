'use client'

import { motion } from 'motion/react'
import {
  Building2,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

type AboutVideoShowcaseProps = {
  titleClassName?: string
}

const points = [
  'Professional support backed by clear communication and dependable coordination.',
  'Quality-focused execution designed for consistency, trust, and long-term value.',
  'A modern operational mindset built to support sustainable pharmaceutical growth.',
]

const chips = [
  'Professional Coordination',
  'Quality-Led Direction',
  'Long-Term Value',
]

const pillars = [
  {
    title: 'Operational Reliability',
    text: 'Structured systems and disciplined processes that support dependable outcomes.',
    icon: Building2,
  },
  {
    title: 'Quality Commitment',
    text: 'A clear focus on consistency, responsibility, and trust across every stage.',
    icon: ShieldCheck,
  },
  {
    title: 'Partnership Approach',
    text: 'Support designed for strong collaboration and long-term business continuity.',
    icon: Handshake,
  },
]

export default function AboutVideoShowcase({
  titleClassName = '',
}: AboutVideoShowcaseProps) {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 36, 0], y: [0, -24, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 28, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-[20%] h-64 w-64 rounded-full bg-sky-100/40 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.16] bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Why Venzura Medcor
          </p>

          <h2
            className={`${titleClassName} mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl`}
          >
            A Better Standard For Pharmaceutical Partnerships
          </h2>

          <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-300" />

          <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            We combine disciplined operations, dependable support, and a
            professional business approach to build confidence across every
            partnership and every stage of coordination.
          </p>

          <div className="mt-8 grid gap-4">
            {points.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-sm">
                  <CheckCircle2 size={17} />
                </span>
                <p className="text-sm leading-6 text-slate-700 md:text-[15px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[34px] bg-gradient-to-br from-cyan-200/35 via-blue-100/20 to-white/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/70 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.32))]" />

            <motion.div
              animate={{ rotate: [0, 6, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-300/18 blur-3xl"
            />
            <motion.div
              animate={{ rotate: [0, -5, 0], y: [0, 12, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-blue-300/15 blur-3xl"
            />

            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-sm">
                <Sparkles size={22} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Inside Our Company
              </p>

              <h3
                className={`${titleClassName} mt-3 max-w-2xl text-2xl font-bold leading-snug text-slate-900 md:text-4xl`}
              >
                Structured For Trust. Designed For Long-Term Growth.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                A modern pharmaceutical identity is shaped by consistency,
                responsive coordination, and the ability to support meaningful
                business relationships over time.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {pillars.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="rounded-[26px] border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white shadow-sm">
                        <Icon size={20} />
                      </div>

                      <h4
                        className={`${titleClassName} mt-4 text-xl font-bold leading-snug text-slate-900`}
                      >
                        {item.title}
                      </h4>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
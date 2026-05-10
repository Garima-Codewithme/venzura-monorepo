'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import ManufacturingVideoShowcase from '@/components/sections/ManufacturingVideoShowcase'

type ManufacturingPageContentProps = {
  titleClassName?: string
}

const overviewPoints = [
  'Quality-led pharmaceutical manufacturing direction',
  'Reliable support for business and production discussions',
  'Structured operations built for long-term partnerships',
]

const strengths = [
  {
    title: 'Operational Discipline',
    text: 'A structured process approach helps maintain consistency, coordination, and dependable execution.',
  },
  {
    title: 'Modern Setup',
    text: 'Our manufacturing orientation is designed to support efficient handling and scalable business growth.',
  },
  {
    title: 'Quality Commitment',
    text: 'We value reliability, process awareness, and strong standards in every operational step.',
  },
]

const focusAreas = [
  'Third-party manufacturing support',
  'Quality-focused production process',
  'Modern infrastructure and handling',
  'Business enquiry and partnership support',
]

export default function ManufacturingPageContent({
  titleClassName = '',
}: ManufacturingPageContentProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-drift-soft absolute -left-24 top-[10rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'rgba(152, 222, 217, 0.18)' }}
        />
        <div
          className="animate-float-soft absolute right-[-4rem] top-[24rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: 'rgba(199, 255, 216, 0.26)' }}
        />
        <div
          className="animate-pulse-soft absolute bottom-[8rem] left-[14%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(9, 99, 126, 0.08)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(9,99,126,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(152,222,217,0.06) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
            maskImage: 'radial-gradient(circle at center, black, transparent 82%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--dark)]">
                Manufacturing
              </p>

              <h1
                className={`${titleClassName} mt-4 max-w-5xl text-4xl font-bold leading-tight text-[var(--heading-text)] md:text-6xl`}
              >
                Manufacturing Support Built On Quality, Structure, And Reliable Execution
              </h1>

              <div
                className="mt-5 h-1.5 w-28 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, var(--dark), var(--primary), var(--soft-accent))',
                }}
              />

              <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--body-text)] md:text-lg md:leading-8">
                Our manufacturing-focused approach supports business reliability,
                pharmaceutical quality standards, and long-term healthcare
                collaboration through disciplined operations and modern infrastructure.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="brand-button inline-flex rounded-full px-6 py-3 text-sm font-semibold shadow-[0_10px_26px_rgba(9,99,126,0.18)] transition duration-300 hover:-translate-y-0.5"
                >
                  Contact Our Team
                </Link>

                <Link
                  href="/services"
                  className="inline-flex rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.82)',
                    color: 'var(--heading-text)',
                  }}
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[32px] p-6 backdrop-blur-xl md:p-8"
              style={{
                border: '1px solid var(--border)',
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(199,255,216,0.26))',
                boxShadow: '0 20px 60px rgba(9,99,126,0.08)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at top left, rgba(152,222,217,0.18), transparent 24%), radial-gradient(circle at 85% 20%, rgba(199,255,216,0.24), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.55))',
                }}
              />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--dark)]">
                  Manufacturing Overview
                </p>

                <p className="mt-4 text-sm leading-7 text-[var(--body-text)] md:text-base">
                  We focus on disciplined execution, professional coordination,
                  and a quality-first manufacturing mindset. Our operational direction
                  is built to support pharmaceutical expectations with clarity and consistency.
                </p>

                <div className="mt-6 grid gap-3">
                  {overviewPoints.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm"
                      style={{
                        border: '1px solid rgba(255,255,255,0.65)',
                        background: 'rgba(255,255,255,0.84)',
                      }}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, var(--dark), var(--primary))',
                        }}
                      />
                      <p className="text-sm font-medium text-[var(--body-strong)]">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {focusAreas.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: 0.1 + index * 0.06 }}
                      className="rounded-2xl px-4 py-4 text-sm leading-6 shadow-sm"
                      style={{
                        border: '1px solid rgba(9,99,126,0.08)',
                        background: 'rgba(255,255,255,0.80)',
                        color: 'var(--body-strong)',
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ManufacturingVideoShowcase titleClassName={titleClassName} />

        <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mb-10 max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--dark)]">
                Key Strengths
              </p>
              <h2
                className={`${titleClassName} mt-4 text-3xl font-bold leading-tight text-[var(--heading-text)] md:text-5xl`}
              >
                Built To Support Organized And Reliable Manufacturing Execution
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {strengths.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-[30px] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    border: '1px solid rgba(255,255,255,0.68)',
                    background: 'rgba(255,255,255,0.86)',
                    boxShadow: '0 16px 50px rgba(9,99,126,0.08)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at top left, rgba(152,222,217,0.10), transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.58))',
                    }}
                  />

                  <div className="relative">
                    <div
                      className="mb-5 h-1.5 w-16 rounded-full"
                      style={{
                        background:
                          'linear-gradient(90deg, var(--dark), var(--primary), var(--soft-accent))',
                      }}
                    />
                    <h3
                      className={`${titleClassName} text-2xl font-bold leading-snug text-[var(--heading-text)]`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--body-text)]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] px-8 py-12 text-center text-white md:px-12 md:py-16"
            style={{
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'var(--gradient-dark)',
              boxShadow: '0 28px 90px rgba(9,99,126,0.18)',
            }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: [0, 22, 0], y: [0, -16, 0], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-8 top-0 h-44 w-44 rounded-full blur-3xl"
                style={{ background: 'rgba(199,255,216,0.16)' }}
              />
              <motion.div
                animate={{ x: [0, -18, 0], y: [0, 14, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-0 top-8 h-48 w-48 rounded-full blur-3xl"
                style={{ background: 'rgba(152,222,217,0.18)' }}
              />
              <motion.div
                animate={{ x: [0, 14, 0], y: [0, -12, 0], opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 left-[30%] h-40 w-40 rounded-full blur-3xl"
                style={{ background: 'rgba(255,255,255,0.14)' }}
              />
            </div>

            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'rgba(255,255,255,0.84)' }}
              >
                Business Discussion
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className={`${titleClassName} mt-4 text-3xl font-bold leading-tight md:text-5xl`}
              >
                <span className="bg-gradient-to-r from-white via-[rgba(199,255,216,0.9)] to-[rgba(152,222,217,0.9)] bg-clip-text text-transparent">
                  Looking For Manufacturing Support?
                </span>
              </motion.h2>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 160, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mx-auto mt-5 h-[3px] rounded-full shadow-[0_0_24px_rgba(152,222,217,0.35)]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.65), rgba(152,222,217,1), rgba(199,255,216,1))',
                }}
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.14 }}
                className="mx-auto mt-6 max-w-2xl text-base leading-7"
                style={{ color: 'rgba(255,255,255,0.84)' }}
              >
                Reach out to discuss manufacturing requirements, product
                support, and long-term pharmaceutical business opportunities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="inline-flex rounded-full px-6 py-3 text-sm font-semibold shadow-[0_12px_30px_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c7ffd8 100%)',
                    color: 'var(--dark)',
                  }}
                >
                  Contact Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
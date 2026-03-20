'use client'

import Link from 'next/link'
import { Merriweather } from 'next/font/google'
import { motion } from 'motion/react'
import AboutHeroVideo from '@/components/sections/AboutHeroVideo'
import AboutVideoShowcase from '@/components/sections/AboutVideoShowcase'

const aboutHeadingFont = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

const overviewPoints = [
  'Quality-led pharmaceutical operations',
  'Reliable business coordination and support',
  'Built for long-term partnerships and growth',
]

const highlights = [
  {
    title: 'Quality-Driven Operations',
    text: 'We follow disciplined systems and dependable execution standards to support consistent pharmaceutical outcomes.',
  },
  {
    title: 'Modern Infrastructure',
    text: 'Our setup is designed to support efficient handling, operational clarity, and scalable business continuity.',
  },
  {
    title: 'Business-Focused Support',
    text: 'We build stronger partnerships through responsive communication, transparency, and dependable support.',
  },
]

const values = [
  'Commitment to quality and consistency',
  'Professional and transparent business approach',
  'Focus on long-term healthcare partnerships',
  'Strong operational discipline and reliability',
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_38%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 36, 0], y: [0, -28, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 top-[14rem] h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -34, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-4rem] top-[36rem] h-[24rem] w-[24rem] rounded-full bg-blue-200/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[12rem] left-[18%] h-72 w-72 rounded-full bg-sky-100/30 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <div className="relative z-10">
        <AboutHeroVideo titleClassName={aboutHeadingFont.className} />

        <section className="relative px-4 py-14 md:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Company Overview
              </p>

              <h2
                className={`${aboutHeadingFont.className} mt-4 max-w-2xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl`}
              >
                Built To Support Modern Healthcare And Pharmaceutical Needs
              </h2>

              <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-300" />

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                We work with a strong focus on quality, responsible execution,
                and dependable business coordination to support long-term
                healthcare and pharmaceutical requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.85),rgba(255,255,255,0.55))]" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Our Approach
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                  From product portfolio development to manufacturing support
                  and business enquiry handling, we aim to deliver reliable
                  solutions that inspire confidence, trust, and long-term value.
                </p>

                <div className="mt-6 grid gap-3">
                  {overviewPoints.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="flex items-center gap-3 rounded-2xl border border-white/75 bg-white/85 px-4 py-3 shadow-sm"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
                      <p className="text-sm font-medium text-slate-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <AboutVideoShowcase titleClassName={aboutHeadingFont.className} />

        <section className="relative px-4 py-14 md:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mb-10 max-w-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                What Sets Us Apart
              </p>
              <h2
                className={`${aboutHeadingFont.className} mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl`}
              >
                A More Reliable And Professional Pharma Presence
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 p-7 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.58))]" />
                  <div className="relative">
                    <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-300" />

                    <h3
                      className={`${aboutHeadingFont.className} text-2xl font-bold leading-snug text-slate-900`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-100 via-cyan-100 to-transparent transition-all duration-300 group-hover:from-blue-300 group-hover:via-cyan-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-4 py-14 md:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-[0_22px_70px_rgba(15,23,42,0.18)] md:p-10"
            >
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

              <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Our Mission
              </p>
              <h2
                className={`${aboutHeadingFont.className} relative mt-4 text-3xl font-bold leading-tight md:text-4xl`}
              >
                To Deliver Reliable Pharmaceutical Value With Strong Standards
              </h2>
              <p className="relative mt-5 text-base leading-7 text-slate-300">
                Our mission is to support healthcare growth through disciplined
                pharmaceutical practices, dependable services, and a
                quality-first mindset that strengthens trust in every
                collaboration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-[0_16px_55px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10"
            >
              <div className="absolute left-0 top-0 h-44 w-44 rounded-full bg-blue-100/55 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,255,255,0.56))]" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Our Vision
                </p>
                <h2
                  className={`${aboutHeadingFont.className} mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl`}
                >
                  To Build A Strong And Respected Presence In The Pharma Sector
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-600">
                  We aim to grow as a trusted name known for quality,
                  professionalism, modern infrastructure, and meaningful
                  business relationships in the pharmaceutical space.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative px-4 py-14 md:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Core Values
              </p>
              <h2
                className={`${aboutHeadingFont.className} mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl`}
              >
                Principles That Guide Our Work
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
                Our work is shaped by consistency, professionalism, reliability,
                and a commitment to long-term value creation.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="rounded-2xl border border-white/70 bg-white/80 p-5 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-sky-300" />
                  <p className="text-sm font-medium leading-6">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-8 py-12 text-center text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] md:px-12 md:py-14"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_30%)]" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                Let&apos;s Connect
              </p>

              <h2
                className={`${aboutHeadingFont.className} mt-4 text-3xl font-bold leading-tight md:text-5xl`}
              >
                Looking For A Reliable Pharma Business Partner?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
                Connect with us to discuss product requirements, manufacturing
                support, and long-term business opportunities.
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-gradient-to-r from-white via-slate-100 to-cyan-50 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:from-cyan-50 hover:to-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
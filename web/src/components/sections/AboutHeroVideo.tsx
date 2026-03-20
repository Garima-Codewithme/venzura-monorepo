'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const ABOUT_VIDEO_SRC = '/videos/about-video.mp4'
const HEADING_TEXT = 'Modern Pharma Built On Trust & Quality'

type AboutHeroVideoProps = {
  titleClassName?: string
}

export default function AboutHeroVideo({
  titleClassName = '',
}: AboutHeroVideoProps) {
  const [displayText, setDisplayText] = useState('')
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const typeNextCharacter = () => {
      if (currentIndex < HEADING_TEXT.length) {
        setDisplayText(HEADING_TEXT.slice(0, currentIndex + 1))
        currentIndex += 1
        timeoutId = setTimeout(typeNextCharacter, 85)
      } else {
        setTypingDone(true)
      }
    }

    timeoutId = setTimeout(typeNextCharacter, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-black">
      <div className="relative min-h-[560px] w-full md:min-h-[660px]">
        <motion.video
          src={ABOUT_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/company-building.jpg"
          initial={{ scale: 1.04, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.06] saturate-[1.08]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/34 to-slate-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/8 to-slate-950/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_30%)]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -12, 0], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[22%] top-[32%] h-56 w-56 rounded-full bg-blue-500/15 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -10, 0], opacity: [0.18, 0.35, 0.18] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-[10%] bottom-[18%] h-48 w-48 rounded-full bg-sky-300/15 blur-3xl"
          />
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-4 pb-10 pt-32 md:min-h-[660px] md:px-8 md:pb-14 md:pt-36 lg:px-16">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex rounded-full border border-white/20 bg-gradient-to-r from-white/12 via-cyan-300/10 to-blue-400/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-md md:text-xs"
              >
                About Venzura Medcor
              </motion.p>

              <div className="mt-5">
                <h1
                  className={`${titleClassName} max-w-4xl text-3xl font-bold leading-[1.12] text-white md:text-5xl xl:text-6xl`}
                >
                  <span className="bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent">
                    {displayText}
                  </span>

                  {!typingDone && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      className="ml-1 inline-block h-[0.95em] w-[3px] rounded-full bg-cyan-300 align-[-0.08em]"
                    />
                  )}
                </h1>

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 140, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.45 }}
                  className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 18 }}
                transition={{ duration: 0.6 }}
                className="mt-5 max-w-xl text-sm leading-6 text-slate-100 md:text-base md:leading-7"
              >
                Reliable operations, professional support, and a quality-first
                pharmaceutical approach built for long-term partnerships.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 14 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-white via-slate-100 to-cyan-50 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:from-cyan-50 hover:to-white"
                >
                  Contact Us
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full border border-white/20 bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:from-blue-500/30 hover:via-cyan-400/25 hover:to-white/15"
                >
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
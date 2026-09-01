'use client'

import { motion } from 'motion/react'
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Workflow,
} from 'lucide-react'
import Link from 'next/link'

const points = [
  {
    title: 'Professional Infrastructure',
    text: 'Professional infrastructure and facility orientation',
    icon: Building2,
  },
  {
    title: 'Disciplined Workflow',
    text: 'Reliable workflow and disciplined execution',
    icon: Workflow,
  },
  {
    title: 'Business Collaboration',
    text: 'Strong support for manufacturing and business collaboration',
    icon: CheckCircle2,
  },
]

export default function SectionVideo() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(
            circle at 6% 8%,
            rgba(78,163,241,0.34) 0%,
            rgba(169,213,255,0.15) 23%,
            transparent 43%
          ),
          radial-gradient(
            circle at 94% 16%,
            rgba(31,111,209,0.22) 0%,
            rgba(78,163,241,0.10) 26%,
            transparent 44%
          ),
          radial-gradient(
            circle at 82% 88%,
            rgba(78,163,241,0.18) 0%,
            transparent 42%
          ),
          radial-gradient(
            circle at 20% 92%,
            rgba(169,213,255,0.24) 0%,
            transparent 38%
          ),
          linear-gradient(
            180deg,
            #dceeff 0%,
            #eaf4ff 12%,
            #f3f8ff 40%,
            #f7fbff 68%,
            #ffffff 100%
          )
        `,
      }}
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Hero se transition */}

        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,63,112,0.16) 0%, rgba(31,111,209,0.06) 42%, transparent 100%)',
          }}
        />

        {/* LEFT MOVING ORB */}

        <motion.div
          animate={{
            x: [0, 38, 0],
            y: [0, -26, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-28 top-4 h-[390px] w-[390px] rounded-full blur-[125px]"
          style={{
            background: 'rgba(78,163,241,0.20)',
          }}
        />

        {/* RIGHT MOVING ORB */}

        <motion.div
          animate={{
            x: [0, -34, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-28 top-24 h-[440px] w-[440px] rounded-full blur-[140px]"
          style={{
            background: 'rgba(31,111,209,0.15)',
          }}
        />

        {/* BOTTOM LIGHT BLUE */}

        <motion.div
          animate={{
            x: [0, 24, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-24 left-[18%] h-[330px] w-[330px] rounded-full blur-[125px]"
          style={{
            background: 'rgba(169,213,255,0.24)',
          }}
        />

        {/* SUBTLE GRID */}

        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(37,99,235,0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(59,130,246,0.05) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '84px 84px',

            WebkitMaskImage:
              'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.82) 55%, transparent 88%)',

            maskImage:
              'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.82) 55%, transparent 88%)',
          }}
        />

        {/* CENTER LIGHT */}

        <div
          className="absolute left-1/2 top-[12%] h-[400px] w-[72%] -translate-x-1/2 rounded-full blur-[135px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(216,234,255,0.20) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -28,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.22,
          }}
          transition={{
            duration: 0.75,
            ease: 'easeOut',
          }}
        >
          {/* LABEL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="inline-flex items-center rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{
              color: '#1f6fd1',

              background:
                'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(238,246,255,0.80))',

              border:
                '1px solid rgba(59,130,246,0.13)',

              boxShadow:
                '0 10px 28px rgba(15,23,42,0.06)',

              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            Inside Venzura
          </motion.div>

          {/* HEADING */}

          <h2 className="mt-6 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-900 sm:text-4xl md:text-5xl">
            A Modern Pharmaceutical Environment Built For{' '}
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #0b3f70 0%, #145da0 34%, #1f6fd1 68%, #4ea3f1 100%)',

                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',

                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              Reliability
            </span>
          </h2>

          {/* ACCENT */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            whileInView={{
              opacity: 1,
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
            }}
            className="mt-5 h-1.5 w-24 origin-left rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #0b3f70 0%, #1f6fd1 54%, #4ea3f1 100%)',

              boxShadow:
                '0 0 16px rgba(78,163,241,0.18)',
            }}
          />

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-[17px]">
            Our operational direction reflects discipline, quality awareness,
            and a modern infrastructure mindset that supports trusted
            pharmaceutical partnerships.
          </p>

          {/* =================================================
              POINTS
          ================================================= */}

          <div className="mt-8 grid gap-3">
            {points.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.91), rgba(247,251,255,0.80))',

                    border:
                      '1px solid rgba(255,255,255,0.82)',

                    boxShadow:
                      '0 14px 38px rgba(15,23,42,0.07)',

                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                  }}
                >
                  {/* CARD GLOW */}

                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-60 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
                    style={{
                      background:
                        'rgba(59,130,246,0.12)',
                    }}
                  />

                  {/* ICON */}

                  <div
                    className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                    style={{
                      background:
                        'linear-gradient(135deg, #0b3f70 0%, #145da0 32%, #1f6fd1 68%, #4ea3f1 110%)',

                      boxShadow:
                        '0 10px 24px rgba(31,111,209,0.21)',
                    }}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="relative">
                    <p className="text-sm font-bold text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}

          <div className="mt-8">
            <Link
              href="/manufacturing"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{
                background:
                  'linear-gradient(135deg, #0b3f70 0%, #145da0 30%, #1f6fd1 68%, #4ea3f1 110%)',

                border:
                  '1px solid rgba(169,213,255,0.24)',

                boxShadow:
                  '0 15px 34px rgba(31,111,209,0.24)',
              }}
            >
              {/* MOVING GRADIENT */}

              <span
                className="pointer-events-none absolute inset-0 translate-x-[-105%] transition-transform duration-700 ease-out group-hover:translate-x-0"
                style={{
                  background:
                    'linear-gradient(135deg, #145da0 0%, #1f6fd1 42%, #4ea3f1 76%, #72b9f5 110%)',
                }}
              />

              {/* SHINE */}

              <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[125%]" />

              <span className="relative z-10">
                Explore Our Operations
              </span>

              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="relative z-10 ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </motion.div>

        {/* =================================================
            RIGHT VIDEO
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.22,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
          className="relative"
        >
          {/* =================================================
              VIDEO BACKGROUND AURA
          ================================================= */}

          <div
            className="pointer-events-none absolute -inset-10 rounded-full blur-[90px]"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.18), rgba(78,163,241,0.11) 42%, rgba(169,213,255,0.06) 60%, transparent 76%)',
            }}
          />

          <motion.div
            animate={{
              x: [0, 24, 0],
              y: [0, -16, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute -left-10 top-[12%] h-52 w-52 rounded-full blur-[75px]"
            style={{
              background:
                'rgba(78,163,241,0.20)',
            }}
          />

          <motion.div
            animate={{
              x: [0, -22, 0],
              y: [0, 18, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute -right-10 bottom-[12%] h-56 w-56 rounded-full blur-[80px]"
            style={{
              background:
                'rgba(31,111,209,0.16)',
            }}
          />

          {/* =================================================
              VIDEO SURFACE
          ================================================= */}

          <div
            className="relative overflow-hidden rounded-[30px] sm:rounded-[34px]"
            style={{
              boxShadow: `
                0 30px 80px rgba(11,63,112,0.15),
                0 16px 42px rgba(15,23,42,0.09)
              `,
            }}
          >
            <video
              src="/videos/facility.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-[300px] w-full object-cover sm:h-[400px] md:h-[500px] lg:h-[560px]"
              aria-label="Venzura Medcor facility and operations"
            />

            {/* =================================================
                SOFT VIDEO COLOR WASH
            ================================================= */}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    rgba(4,26,48,0.06) 0%,
                    transparent 28%,
                    transparent 58%,
                    rgba(4,26,48,0.42) 100%
                  )
                `,
              }}
            />

            {/* =================================================
                TOP LABEL
            ================================================= */}

            <div
              className="absolute left-4 top-4 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:left-5 sm:top-5 sm:text-[11px]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(7,43,80,0.82), rgba(31,111,209,0.68))',

                boxShadow:
                  '0 10px 28px rgba(4,26,48,0.20)',

                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              Modern Operations
            </div>

            {/* =================================================
                BOTTOM INFO GLASS
            ================================================= */}

            <div
              className="absolute bottom-4 left-4 right-4 overflow-hidden rounded-[22px] px-5 py-4 sm:bottom-5 sm:left-auto sm:right-5 sm:max-w-[340px]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.91), rgba(232,243,255,0.82))',

                boxShadow:
                  '0 16px 40px rgba(4,26,48,0.18)',

                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
                style={{
                  background:
                    'rgba(78,163,241,0.18)',
                }}
              />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-blue-700 sm:text-xs">
                  Venzura Medcor
                </p>

                <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-800">
                  Quality-driven infrastructure and workflow
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
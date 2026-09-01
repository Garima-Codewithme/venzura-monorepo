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
    <section
      className="relative isolate overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(
            circle at 7% 10%,
            rgba(78,163,241,0.30) 0%,
            rgba(169,213,255,0.14) 22%,
            transparent 42%
          ),
          radial-gradient(
            circle at 93% 16%,
            rgba(31,111,209,0.20) 0%,
            rgba(78,163,241,0.10) 24%,
            transparent 42%
          ),
          radial-gradient(
            circle at 82% 88%,
            rgba(78,163,241,0.18) 0%,
            rgba(169,213,255,0.08) 28%,
            transparent 44%
          ),
          radial-gradient(
            circle at 25% 84%,
            rgba(169,213,255,0.22) 0%,
            transparent 38%
          ),
          linear-gradient(
            180deg,
            #ffffff 0%,
            #f7fbff 20%,
            #eef6ff 52%,
            #e8f3ff 78%,
            #f7fbff 100%
          )
        `,
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 36, 0],
            y: [0, -24, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-24 top-8 h-[360px] w-[360px] rounded-full blur-[120px]"
          style={{
            background:
              'rgba(78,163,241,0.20)',
          }}
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 28, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-24 top-16 h-[420px] w-[420px] rounded-full blur-[135px]"
          style={{
            background:
              'rgba(31,111,209,0.14)',
          }}
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-[18%] h-[330px] w-[330px] rounded-full blur-[120px]"
          style={{
            background:
              'rgba(169,213,255,0.22)',
          }}
        />

        {/* subtle grid */}

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

        {/* central light */}

        <div
          className="absolute left-1/2 top-[10%] h-[420px] w-[72%] -translate-x-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.52) 0%, rgba(216,234,255,0.18) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-xl"
        >
          <div
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
            Why Venzura Medcor
          </div>

          <h2
            className={`${titleClassName} mt-6 text-3xl font-bold leading-tight text-slate-900 md:text-5xl`}
          >
            A Better Standard For{' '}
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #0b3f70 0%, #145da0 34%, #2563eb 70%, #4ea3f1 100%)',

                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',

                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              Pharmaceutical Partnerships
            </span>
          </h2>

          <div
            className="mt-5 h-1.5 w-24 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #0b3f70 0%, #1f6fd1 55%, #4ea3f1 100%)',

              boxShadow:
                '0 0 16px rgba(78,163,241,0.18)',
            }}
          />

          <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            We combine disciplined operations, dependable support, and a
            professional business approach to build confidence across every
            partnership and every stage of coordination.
          </p>

          {/* =================================================
              POINTS
          ================================================= */}

          <div className="mt-8 grid gap-4">
            {points.map((item, index) => (
              <motion.div
                key={item}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group relative flex items-start gap-3 overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.90), rgba(247,251,255,0.80))',

                  border:
                    '1px solid rgba(255,255,255,0.82)',

                  boxShadow:
                    '0 14px 38px rgba(15,23,42,0.07)',

                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{
                    background:
                      'rgba(59,130,246,0.12)',
                  }}
                />

                <span
                  className="relative mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'linear-gradient(135deg, #0b3f70 0%, #2563eb 58%, #4ea3f1 110%)',

                    boxShadow:
                      '0 8px 20px rgba(37,99,235,0.20)',
                  }}
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={2.2}
                  />
                </span>

                <p className="relative text-sm leading-6 text-slate-700 md:text-[15px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* =================================================
            RIGHT MAIN GLASS CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.75,
          }}
          className="relative"
        >
          {/* aura */}

          <div
            className="pointer-events-none absolute -inset-12 rounded-full blur-[95px]"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.16), rgba(125,190,255,0.10) 42%, transparent 72%)',
            }}
          />

          <div
            className="relative overflow-hidden rounded-[34px] p-6 md:p-8"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.84), rgba(247,251,255,0.74), rgba(232,243,255,0.68))',

              border:
                '1px solid rgba(255,255,255,0.76)',

              boxShadow:
                '0 22px 70px rgba(15,23,42,0.10)',

              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* background mesh */}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    circle at top left,
                    rgba(125,190,255,0.18),
                    transparent 30%
                  ),
                  radial-gradient(
                    circle at 82% 22%,
                    rgba(59,130,246,0.15),
                    transparent 32%
                  ),
                  radial-gradient(
                    circle at 30% 90%,
                    rgba(169,213,255,0.18),
                    transparent 36%
                  )
                `,
              }}
            />

            <motion.div
              animate={{
                x: [0, 18, 0],
                y: [0, -12, 0],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(78,163,241,0.17)',
              }}
            />

            <motion.div
              animate={{
                x: [0, -12, 0],
                y: [0, 14, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-16 left-10 h-44 w-44 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(31,111,209,0.12)',
              }}
            />

            <div className="relative">
              {/* ICON */}

              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                style={{
                  background:
                    'linear-gradient(135deg, #0b3f70 0%, #145da0 34%, #2563eb 70%, #4ea3f1 110%)',

                  boxShadow:
                    '0 10px 24px rgba(37,99,235,0.22)',
                }}
              >
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

              {/* =================================================
                  CHIPS
              ================================================= */}

              <div className="mt-6 flex flex-wrap gap-2.5">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full px-4 py-2 text-xs font-medium text-slate-700"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(238,246,255,0.76))',

                      border:
                        '1px solid rgba(59,130,246,0.10)',

                      boxShadow:
                        '0 8px 20px rgba(15,23,42,0.04)',

                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* =================================================
                  PILLARS
              ================================================= */}

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {pillars.map((item, index) => {
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
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                      }}
                      className="group relative overflow-hidden rounded-[26px] p-5 transition-all duration-300 hover:-translate-y-1.5"
                      style={{
                        background:
                          'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(247,251,255,0.82))',

                        border:
                          '1px solid rgba(255,255,255,0.82)',

                        boxShadow:
                          '0 14px 38px rgba(15,23,42,0.07)',

                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                      }}
                    >
                      {/* CARD GLOW */}

                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125"
                        style={{
                          background:
                            'rgba(59,130,246,0.11)',
                        }}
                      />

                      <div
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                        style={{
                          background:
                            'linear-gradient(135deg, #0b3f70 0%, #145da0 35%, #2563eb 72%, #4ea3f1 110%)',

                          boxShadow:
                            '0 9px 22px rgba(37,99,235,0.20)',
                        }}
                      >
                        <Icon size={20} />
                      </div>

                      <h4
                        className={`${titleClassName} relative mt-4 text-xl font-bold leading-snug text-slate-900`}
                      >
                        {item.title}
                      </h4>

                      <p className="relative mt-3 text-sm leading-6 text-slate-600">
                        {item.text}
                      </p>

                      {/* bottom accent */}

                      <div
                        className="relative mt-5 h-px w-full transition-all duration-300"
                        style={{
                          background:
                            'linear-gradient(90deg, rgba(37,99,235,0.28), rgba(78,163,241,0.12), transparent)',
                        }}
                      />
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
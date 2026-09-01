'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

export default function BusinessEnquiry() {
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
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 34, 0],
            y: [0, -24, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-24 top-8 h-[360px] w-[360px] rounded-full blur-[120px]"
          style={{
            background: 'rgba(78,163,241,0.20)',
          }}
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 26, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-24 top-12 h-[420px] w-[420px] rounded-full blur-[135px]"
          style={{
            background: 'rgba(31,111,209,0.14)',
          }}
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -18, 0],
            scale: [1, 1.07, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-[18%] h-[330px] w-[330px] rounded-full blur-[120px]"
          style={{
            background: 'rgba(169,213,255,0.22)',
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

        {/* CENTRAL SOFT LIGHT */}

        <div
          className="absolute left-1/2 top-[8%] h-[420px] w-[72%] -translate-x-1/2 rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.52) 0%, rgba(216,234,255,0.18) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* =====================================================
          ENQUIRY CARD
      ===================================================== */}

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
          duration: 0.7,
          ease: 'easeOut',
        }}
        className="relative z-10 mx-auto max-w-4xl"
      >
        <div
          className="relative overflow-hidden rounded-[34px] p-8 md:p-12"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.86), rgba(247,251,255,0.76), rgba(232,243,255,0.68))',

            border:
              '1px solid rgba(255,255,255,0.80)',

            boxShadow:
              '0 22px 70px rgba(15,23,42,0.10)',

            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* CARD MESH */}

          <div
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl"
            style={{
              background: 'rgba(78,163,241,0.18)',
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl"
            style={{
              background: 'rgba(31,111,209,0.12)',
            }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(
                  circle at top left,
                  rgba(169,213,255,0.16),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 88% 25%,
                  rgba(59,130,246,0.10),
                  transparent 30%
                )
              `,
            }}
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative">
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
              }}
              className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: '#1f6fd1',

                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(238,246,255,0.80))',

                border:
                  '1px solid rgba(59,130,246,0.13)',

                boxShadow:
                  '0 10px 28px rgba(15,23,42,0.05)',
              }}
            >
              Business Enquiry
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 22,
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
                duration: 0.65,
                delay: 0.08,
              }}
              className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-900 md:text-5xl"
            >
              Let&apos;s Build A Strong{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #0b3f70 0%, #145da0 35%, #2563eb 70%, #4ea3f1 100%)',

                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',

                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Healthcare Partnership
              </span>
            </motion.h2>

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
                duration: 0.6,
                delay: 0.16,
              }}
              className="mt-5 h-1.5 w-24 origin-left rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, #0b3f70 0%, #1f6fd1 55%, #4ea3f1 100%)',

                boxShadow:
                  '0 0 16px rgba(78,163,241,0.16)',
              }}
            />

            <motion.p
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
                duration: 0.6,
                delay: 0.14,
              }}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-[17px]"
            >
              Connect with us for product enquiries, manufacturing discussions,
              and long-term pharmaceutical business opportunities built around
              dependable support, clear communication, and professional
              coordination.
            </motion.p>

            {/* =================================================
                CTA
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.55,
                delay: 0.2,
              }}
              className="mt-8"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
                style={{
                  background:
                    'linear-gradient(135deg, #0b3f70 0%, #145da0 30%, #2563eb 68%, #4ea3f1 110%)',

                  border:
                    '1px solid rgba(169,213,255,0.22)',

                  boxShadow:
                    '0 15px 34px rgba(37,99,235,0.24)',
                }}
              >
                {/* HOVER GRADIENT */}

                <span
                  className="pointer-events-none absolute inset-0 translate-x-[-105%] transition-transform duration-700 ease-out group-hover:translate-x-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #145da0 0%, #2563eb 42%, #4ea3f1 76%, #72b9f5 110%)',
                  }}
                />

                {/* SHINE */}

                <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[125%]" />

                {/* GLOW */}

                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'rgba(169,213,255,0.24)',
                  }}
                />

                <span className="relative z-10">
                  Send Enquiry
                </span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={2}
                  className="relative z-10 ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
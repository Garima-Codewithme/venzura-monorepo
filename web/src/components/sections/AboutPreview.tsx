'use client'

import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const highlights = [
  'Quality-Focused Execution',
  'Reliable Business Coordination',
  'Long-Term Partnership Approach',
]

export default function AboutPreview() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .from('.about-label', {
          opacity: 0,
          y: 18,
          duration: 0.5,
        })
        .from(
          '.about-heading',
          {
            opacity: 0,
            y: 28,
            duration: 0.75,
          },
          '-=0.25'
        )
        .from(
          '.about-copy',
          {
            opacity: 0,
            y: 22,
            duration: 0.65,
          },
          '-=0.4'
        )
        .from(
          '.about-highlight',
          {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.35'
        )
        .from(
          '.about-cta',
          {
            opacity: 0,
            y: 16,
            duration: 0.55,
          },
          '-=0.3'
        )
        .from(
          '.about-visual',
          {
            opacity: 0,
            x: 34,
            scale: 0.975,
            duration: 0.85,
          },
          '-=0.75'
        )

      gsap.to('.about-orb-one', {
        x: 36,
        y: -28,
        scale: 1.08,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.about-orb-two', {
        x: -34,
        y: 30,
        scale: 1.1,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.about-orb-three', {
        x: 24,
        y: -18,
        scale: 1.07,
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    {
      scope: root,
    }
  )

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(
            circle at 0% 0%,
            rgba(59,130,246,0.22) 0%,
            rgba(125,190,255,0.10) 22%,
            transparent 42%
          ),
          radial-gradient(
            circle at 88% 16%,
            rgba(78,163,241,0.20) 0%,
            rgba(169,213,255,0.10) 26%,
            transparent 44%
          ),
          radial-gradient(
            circle at 76% 88%,
            rgba(31,111,209,0.12) 0%,
            transparent 38%
          ),
          linear-gradient(
            180deg,
            #e5f2ff 0%,
            #eef6ff 16%,
            #f7fbff 48%,
            #ffffff 100%
          )
        `,
      }}
    >
      {/* =====================================================
          BACKGROUND — ABOUT PAGE STYLE
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* LEFT BLUE ORB */}

        <div
          className="about-orb-one absolute -left-24 top-10 h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              'rgba(125,190,255,0.27)',
          }}
        />

        {/* RIGHT BLUE ORB */}

        <div
          className="about-orb-two absolute right-[-4rem] top-[10rem] h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{
            background:
              'rgba(59,130,246,0.18)',
          }}
        />

        {/* BOTTOM SKY-BLUE ORB */}

        <div
          className="about-orb-three absolute bottom-[-5rem] left-[18%] h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              'rgba(186,220,255,0.30)',
          }}
        />

        {/* =================================================
            GRID — SAME FEEL AS ABOUT PAGE
        ================================================= */}

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(37,99,235,0.06) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(59,130,246,0.055) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '84px 84px',

            WebkitMaskImage:
              'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.85) 50%, transparent 88%)',

            maskImage:
              'radial-gradient(circle at center, black 0%, rgba(0,0,0,0.85) 50%, transparent 88%)',
          }}
        />

        {/* =================================================
            HERO → ABOUT TRANSITION WASH
        ================================================= */}

        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,63,112,0.12) 0%, rgba(31,111,209,0.05) 34%, transparent 100%)',
          }}
        />

        {/* CENTRAL LIGHT */}

        <div
          className="absolute left-1/2 top-[10%] h-[380px] w-[72%] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.58) 0%, rgba(216,234,255,0.22) 48%, transparent 74%)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div>
          {/* LABEL */}

          <div
            className="about-label inline-flex items-center rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
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
            About Venzura Medcor
          </div>

          {/* HEADING */}

          <h2
            className="about-heading mt-6 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-[56px]"
            style={{
              color: '#0f172a',
            }}
          >
            A Modern Pharma Partner Built on{' '}
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
              Trust & Reliability
            </span>
          </h2>

          {/* COPY */}

          <p className="about-copy mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-[17px]">
            Venzura Medcor is focused on delivering reliable pharmaceutical
            manufacturing support, quality-driven execution, and long-term
            business partnerships. Our approach combines structured
            coordination, product portfolio support, and customer-focused
            execution.
          </p>

          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="about-highlight group relative overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,0.91), rgba(247,251,255,0.80))',

                  border:
                    '1px solid rgba(255,255,255,0.80)',

                  boxShadow:
                    '0 14px 38px rgba(15,23,42,0.07)',

                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                }}
              >
                {/* CARD BLUE GLOW */}

                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125"
                  style={{
                    background:
                      'rgba(59,130,246,0.12)',
                  }}
                />

                <div
                  className="relative mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
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
                    className="text-white"
                  />
                </div>

                <p className="relative text-sm font-semibold leading-5 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div className="about-cta mt-8">
            <Link
              href="/about"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{
                background:
                  'linear-gradient(135deg, #0b3f70 0%, #145da0 28%, #2563eb 66%, #4ea3f1 110%)',

                border:
                  '1px solid rgba(169,213,255,0.22)',

                boxShadow:
                  '0 15px 34px rgba(37,99,235,0.25)',
              }}
            >
              {/* shine */}

              <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[125%]" />

              {/* hover glow */}

              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'rgba(169,213,255,0.22)',
                }}
              />

              <span className="relative z-10">
                Know More About Us
              </span>

              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="relative z-10 ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =================================================
            RIGHT — GLASS APPROACH CARD
        ================================================= */}

        <div className="about-visual relative">
          {/* OUTER AURA */}

          <div
            className="pointer-events-none absolute -inset-12 rounded-full blur-[90px]"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.15), rgba(125,190,255,0.10) 44%, transparent 72%)',
            }}
          />

          <div
            className="relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.82), rgba(247,251,255,0.72), rgba(232,243,255,0.68))',

              border:
                '1px solid rgba(255,255,255,0.75)',

              boxShadow:
                '0 20px 60px rgba(15,23,42,0.10)',

              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
            }}
          >
            {/* TOP LEFT BLUE */}

            <div
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(125,190,255,0.20)',
              }}
            />

            {/* TOP RIGHT */}

            <div
              className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(59,130,246,0.15)',
              }}
            />

            {/* BOTTOM LIGHT */}

            <div
              className="pointer-events-none absolute -bottom-20 left-[20%] h-56 w-72 rounded-full blur-3xl"
              style={{
                background:
                  'rgba(186,220,255,0.28)',
              }}
            />

            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Approach
              </p>

              <h3 className="mt-4 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
                Built for reliable pharmaceutical business partnerships.
              </h3>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                We focus on clear communication, dependable coordination,
                quality-conscious execution, and a professional approach that
                supports sustainable business growth.
              </p>

              {/* =============================================
                  VALUE CARDS
              ============================================= */}

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {/* QUALITY */}

                <div
                  className="group relative overflow-hidden rounded-[22px] p-5 text-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(135deg, #020617 0%, #0f172a 42%, #082f49 100%)',

                    boxShadow:
                      '0 18px 42px rgba(15,23,42,0.18)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
                    style={{
                      background:
                        'rgba(78,163,241,0.20)',
                    }}
                  />

                  <div
                    className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full blur-2xl"
                    style={{
                      background:
                        'rgba(59,130,246,0.13)',
                    }}
                  />

                  <p className="relative text-2xl font-extrabold">
                    Quality
                  </p>

                  <p className="relative mt-2 text-sm leading-6 text-slate-300">
                    A focused approach to dependable execution and
                    coordination.
                  </p>
                </div>

                {/* PARTNERSHIP */}

                <div
                  className="group relative overflow-hidden rounded-[22px] p-5 text-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      'linear-gradient(135deg, #0b3f70 0%, #145da0 40%, #2563eb 76%, #4ea3f1 120%)',

                    boxShadow:
                      '0 18px 42px rgba(37,99,235,0.20)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
                    style={{
                      background:
                        'rgba(169,213,255,0.23)',
                    }}
                  />

                  <p className="relative text-2xl font-extrabold">
                    Partnership
                  </p>

                  <p className="relative mt-2 text-sm leading-6 text-white/80">
                    Business relationships designed with long-term value in
                    mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
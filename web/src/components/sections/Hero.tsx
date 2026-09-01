'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const trustBadges = [
  'WHO-GMP Manufacturing',
  'Trusted Partnership',
]

const stars = [
  { left: '4%', top: '12%', size: 2 },
  { left: '9%', top: '31%', size: 1 },
  { left: '15%', top: '18%', size: 2 },
  { left: '19%', top: '67%', size: 1 },
  { left: '24%', top: '9%', size: 1 },
  { left: '28%', top: '42%', size: 2 },
  { left: '33%', top: '78%', size: 1 },
  { left: '38%', top: '21%', size: 2 },
  { left: '42%', top: '57%', size: 1 },
  { left: '47%', top: '11%', size: 1 },
  { left: '51%', top: '70%', size: 2 },
  { left: '56%', top: '30%', size: 1 },
  { left: '61%', top: '14%', size: 2 },
  { left: '65%', top: '61%', size: 1 },
  { left: '70%', top: '37%', size: 2 },
  { left: '75%', top: '8%', size: 1 },
  { left: '79%', top: '72%', size: 2 },
  { left: '84%', top: '27%', size: 1 },
  { left: '89%', top: '48%', size: 2 },
  { left: '94%', top: '16%', size: 1 },
  { left: '7%', top: '81%', size: 2 },
  { left: '17%', top: '47%', size: 1 },
  { left: '31%', top: '5%', size: 1 },
  { left: '45%', top: '88%', size: 2 },
  { left: '58%', top: '84%', size: 1 },
  { left: '69%', top: '89%', size: 1 },
  { left: '82%', top: '55%', size: 2 },
  { left: '91%', top: '82%', size: 1 },
]

export default function Hero() {
  const root = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .from('.hero-badge', {
          opacity: 0,
          y: 18,
          scale: 0.94,
          duration: 0.55,
          stagger: 0.12,
        })
        .from(
          '.hero-discover',
          {
            opacity: 0,
            y: 18,
            scale: 0.94,
            duration: 0.55,
          },
          '-=0.35'
        )
        .from(
          '.hero-frame',
          {
            opacity: 0,
            y: 28,
            scale: 0.985,
            duration: 0.95,
          },
          '-=0.3'
        )

      gsap.to('.hero-glow-one', {
        x: 42,
        y: -24,
        scale: 1.1,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-glow-two', {
        x: -36,
        y: 30,
        scale: 1.12,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to('.hero-glow-three', {
        x: 22,
        y: 24,
        scale: 1.08,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      const starElements =
        gsap.utils.toArray<HTMLElement>('.hero-star')

      starElements.forEach((star, index) => {
        gsap.fromTo(
          star,
          {
            opacity: 0.1,
            scale: 0.7,
          },
          {
            opacity: index % 4 === 0 ? 0.9 : 0.55,
            scale: index % 3 === 0 ? 1.55 : 1.2,
            duration: 1.5 + (index % 5) * 0.4,
            delay: (index % 8) * 0.17,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }
        )
      })
    },
    {
      scope: root,
    }
  )

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden px-3 py-7 sm:px-5 sm:py-9 md:px-8 md:py-11 lg:px-12 lg:py-12"
      style={{
        background: `
          radial-gradient(
            circle at 12% 18%,
            rgba(78,163,241,0.28) 0%,
            transparent 30%
          ),
          radial-gradient(
            circle at 88% 15%,
            rgba(31,111,209,0.24) 0%,
            transparent 30%
          ),
          radial-gradient(
            circle at 82% 84%,
            rgba(78,163,241,0.16) 0%,
            transparent 34%
          ),
          radial-gradient(
            circle at 50% 45%,
            #0b3f70 0%,
            #072b50 48%,
            #041a30 100%
          )
        `,
      }}
    >
      {/* =====================================================
          PREMIUM NAVY BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="hero-glow-one absolute -left-40 -top-44 h-[540px] w-[540px] rounded-full blur-[145px]"
          style={{
            background: 'rgba(78,163,241,0.19)',
          }}
        />

        <div
          className="hero-glow-two absolute -bottom-48 -right-40 h-[620px] w-[620px] rounded-full blur-[160px]"
          style={{
            background: 'rgba(31,111,209,0.21)',
          }}
        />

        <div
          className="hero-glow-three absolute left-[38%] top-[12%] h-[360px] w-[360px] rounded-full blur-[135px]"
          style={{
            background: 'rgba(169,213,255,0.08)',
          }}
        />

        {/* Twinkling dots */}
        {stars.map((star, index) => (
          <span
            key={`${star.left}-${star.top}`}
            className="hero-star absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,

              background:
                index % 4 === 0
                  ? '#ffffff'
                  : index % 3 === 0
                    ? '#a9d5ff'
                    : '#72b9f5',

              boxShadow:
                index % 4 === 0
                  ? '0 0 12px rgba(255,255,255,0.85)'
                  : '0 0 10px rgba(114,185,245,0.65)',
            }}
          />
        ))}

        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(169,213,255,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(169,213,255,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '56px 56px',
          }}
        />

        {/* Top soft wash */}
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{
            background:
              'linear-gradient(180deg, rgba(78,163,241,0.10), transparent)',
          }}
        />

        {/* Top premium line */}
        <div
          className="absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(169,213,255,0.52), transparent)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* =====================================================
            TOP BACKGROUND BAR
            LEFT = TRUST BADGES
            RIGHT = DISCOVER VENZURA
        ===================================================== */}

        <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT SIDE */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="
                  hero-badge
                  group
                  relative
                  cursor-default
                  overflow-hidden
                  rounded-full
                  px-6
                  py-3.5
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-[1.025]
                  sm:px-7
                  sm:py-4
                  sm:text-[12px]
                  md:px-8
                  md:text-[13px]
                "
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      #072b50 0%,
                      #0b3f70 28%,
                      #145da0 58%,
                      #1f6fd1 82%,
                      #4ea3f1 120%
                    )
                  `,

                  border:
                    '1px solid rgba(169,213,255,0.28)',

                  boxShadow: `
                    0 14px 34px rgba(4,26,48,0.30),
                    0 0 24px rgba(31,111,209,0.12),
                    inset 0 1px 0 rgba(255,255,255,0.10)
                  `,
                }}
              >
                {/* Hover gradient */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    translate-x-[-105%]
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:translate-x-0
                  "
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        #145da0 0%,
                        #1f6fd1 42%,
                        #3187df 70%,
                        #72b9f5 110%
                      )
                    `,
                  }}
                />

                {/* Shine */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-14
                    w-12
                    -skew-x-12
                    bg-white/25
                    transition-all
                    duration-700
                    group-hover:left-[125%]
                  "
                />

                {/* Glow */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-20
                    w-28
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                  style={{
                    background: 'rgba(169,213,255,0.22)',
                  }}
                />

                <span className="relative z-10 whitespace-nowrap">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* ===================================================
              RIGHT SIDE — DISCOVER VENZURA
          =================================================== */}

          <div className="hero-discover flex justify-center lg:justify-end">
            <Link
              href="/about"
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                overflow-hidden
                rounded-full
                px-7
                py-3.5
                text-[12px]
                font-bold
                tracking-[0.04em]
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:scale-[1.03]
                sm:px-8
                sm:py-4
                sm:text-[13px]
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #0b3f70 0%,
                    #145da0 28%,
                    #1f6fd1 62%,
                    #3187df 82%,
                    #4ea3f1 100%
                  )
                `,

                border:
                  '1px solid rgba(169,213,255,0.32)',

                boxShadow: `
                  0 16px 38px rgba(4,26,48,0.32),
                  0 0 30px rgba(78,163,241,0.18),
                  inset 0 1px 0 rgba(255,255,255,0.12)
                `,
              }}
            >
              {/* Moving gradient */}
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  translate-x-[-105%]
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:translate-x-0
                "
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      #1f6fd1 0%,
                      #3187df 42%,
                      #4ea3f1 72%,
                      #72b9f5 110%
                    )
                  `,
                }}
              />

              {/* Shine */}
              <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[125%]" />

              {/* Hover glow */}
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'rgba(169,213,255,0.24)',
                }}
              />

              <span className="relative z-10">
                Discover Venzura
              </span>

              <ArrowUpRight
                size={17}
                strokeWidth={2}
                className="relative z-10 ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            GLASS VIDEO FRAME
        ===================================================== */}

        <div
          className="hero-frame relative rounded-[30px] p-[6px] sm:rounded-[36px] sm:p-[8px] lg:rounded-[44px]"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.20) 0%,
                rgba(169,213,255,0.10) 30%,
                rgba(31,111,209,0.10) 65%,
                rgba(78,163,241,0.18) 100%
              )
            `,

            border:
              '1px solid rgba(169,213,255,0.20)',

            boxShadow: `
              0 34px 100px rgba(0,0,0,0.38),
              0 0 65px rgba(78,163,241,0.10),
              inset 0 1px 0 rgba(255,255,255,0.12)
            `,

            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Frame shine */}
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.56), rgba(169,213,255,0.34), transparent)',
            }}
          />

          {/* =================================================
              CLEAN VIDEO
              VIDEO KE UPAR KUCH NAHI
          ================================================= */}

          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px] lg:rounded-[37px]">
            <video
              className="block h-auto w-full"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/logo.png"
              controls={false}
              aria-label="Venzura Medcor presentation"
            >
              <source
                src="/videos/hero.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const HOME_CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    image,

    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,

    "palette": image.asset->metadata.palette{
      dominant{
        background
      },
      vibrant{
        background
      },
      darkVibrant{
        background
      },
      lightVibrant{
        background
      },
      muted{
        background
      },
      darkMuted{
        background
      },
      lightMuted{
        background
      }
    }
  }
`

type PaletteSwatch = {
  background?: string
}

type ImagePalette = {
  dominant?: PaletteSwatch
  vibrant?: PaletteSwatch
  darkVibrant?: PaletteSwatch
  lightVibrant?: PaletteSwatch
  muted?: PaletteSwatch
  darkMuted?: PaletteSwatch
  lightMuted?: PaletteSwatch
}

type Category = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
  imageAspectRatio?: number
  palette?: ImagePalette
}

type CategoryKey =
  | 'cosmetic'
  | 'nutra'
  | 'ayurvedic'

type HslColor = {
  h: number
  s: number
  l: number
}

/* =========================================================
   CATEGORY FILTER
========================================================= */

function normalize(value?: string) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function getCategoryKey(
  category: Category
): CategoryKey | null {
  const title = normalize(category.title)
  const slug = normalize(category.slug)

  const combined = `${title}${slug}`

  if (
    title === 'cosmetic' ||
    title === 'cosmetics' ||
    slug === 'cosmetic' ||
    slug === 'cosmetics'
  ) {
    return 'cosmetic'
  }

  /*
    Supplements aur Nutra Supplement
    ek hi category hain.
  */
  if (
    title === 'supplement' ||
    title === 'supplements' ||
    slug === 'supplement' ||
    slug === 'supplements' ||
    combined.includes('nutrasupplement') ||
    combined.includes('nutrasupplements') ||
    combined.includes('nutraceutical')
  ) {
    return 'nutra'
  }

  if (
    title === 'ayurvedic' ||
    title === 'ayurveda' ||
    slug === 'ayurvedic' ||
    slug === 'ayurveda'
  ) {
    return 'ayurvedic'
  }

  return null
}

function getCategoryOrder(key: CategoryKey) {
  if (key === 'cosmetic') return 1
  if (key === 'nutra') return 2
  return 3
}

function isExplicitNutra(category: Category) {
  const value = `${normalize(
    category.title
  )}${normalize(category.slug)}`

  return (
    value.includes('nutra') ||
    value.includes('nutraceutical')
  )
}

function selectHomeCategories(
  categories: Category[]
) {
  const selected = new Map<
    CategoryKey,
    Category
  >()

  for (const category of categories) {
    const key = getCategoryKey(category)

    if (!key) continue

    const current = selected.get(key)

    if (!current) {
      selected.set(key, category)
      continue
    }

    if (
      key === 'nutra' &&
      isExplicitNutra(category) &&
      !isExplicitNutra(current)
    ) {
      selected.set(key, category)
      continue
    }

    if (
      category.image &&
      !current.image
    ) {
      selected.set(key, category)
    }
  }

  return Array.from(selected.entries())
    .map(([key, category]) => ({
      key,
      category,
    }))
    .sort(
      (a, b) =>
        getCategoryOrder(a.key) -
        getCategoryOrder(b.key)
    )
}

function getDisplayTitle(
  category: Category,
  key: CategoryKey
) {
  if (key !== 'nutra') {
    return category.title
  }

  const title = normalize(category.title)

  if (
    title === 'supplement' ||
    title === 'supplements'
  ) {
    return 'Nutra Supplement'
  }

  return category.title
}

function getCategoryMeta(key: CategoryKey) {
  if (key === 'cosmetic') {
    return {
      eyebrow:
        'Beauty & Personal Care',

      description:
        'Explore cosmetic and personal care products designed for modern beauty, healthcare, and portfolio requirements.',
    }
  }

  if (key === 'nutra') {
    return {
      eyebrow:
        'Nutrition & Wellness',

      description:
        'Explore Nutra Supplement solutions focused on nutrition, wellness, and evolving healthcare requirements.',
    }
  }

  return {
    eyebrow:
      'Traditional Wellness',

    description:
      'Explore Ayurvedic products bringing traditional wellness together with a professional healthcare approach.',
  }
}

/* =========================================================
   COLOR UTILITIES
========================================================= */

function clamp(
  value: number,
  minimum: number,
  maximum: number
) {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  )
}

function hexToRgb(hex?: string) {
  const fallback = {
    r: 31,
    g: 111,
    b: 209,
  }

  if (!hex) return fallback

  const clean = hex
    .replace('#', '')
    .trim()

  const normalized =
    clean.length === 3
      ? clean
          .split('')
          .map(
            (character) =>
              character + character
          )
          .join('')
      : clean

  if (normalized.length !== 6) {
    return fallback
  }

  const value = Number.parseInt(
    normalized,
    16
  )

  if (Number.isNaN(value)) {
    return fallback
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function hexToHsl(hex?: string): HslColor {
  const { r, g, b } = hexToRgb(hex)

  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const maximum = Math.max(
    red,
    green,
    blue
  )

  const minimum = Math.min(
    red,
    green,
    blue
  )

  let hue = 0
  let saturation = 0

  const lightness =
    (maximum + minimum) / 2

  const delta =
    maximum - minimum

  if (delta !== 0) {
    saturation =
      lightness > 0.5
        ? delta /
          (2 - maximum - minimum)
        : delta /
          (maximum + minimum)

    switch (maximum) {
      case red:
        hue =
          (green - blue) / delta +
          (green < blue ? 6 : 0)
        break

      case green:
        hue =
          (blue - red) / delta + 2
        break

      default:
        hue =
          (red - green) / delta + 4
    }

    hue /= 6
  }

  return {
    h: hue * 360,
    s: saturation * 100,
    l: lightness * 100,
  }
}

function hsl(
  hue: number,
  saturation: number,
  lightness: number,
  alpha = 1
) {
  return `hsla(${Math.round(
    hue
  )}, ${Math.round(
    saturation
  )}%, ${Math.round(
    lightness
  )}%, ${alpha})`
}

/* =========================================================
   FIND BEST COLOR FROM IMAGE
========================================================= */

/*
  Sanity dominant color aksar white/light background
  pakad sakta hai.

  Isliye saare palette swatches ko evaluate karke
  sabse useful actual image color choose karte hain.
*/
function getBestImageColor(category: Category) {
  const palette = category.palette

  const candidates = [
    palette?.vibrant?.background,
    palette?.muted?.background,
    palette?.darkVibrant?.background,
    palette?.lightVibrant?.background,
    palette?.dominant?.background,
    palette?.darkMuted?.background,
    palette?.lightMuted?.background,
  ].filter(
    (color): color is string =>
      Boolean(color)
  )

  if (candidates.length === 0) {
    return {
      h: 210,
      s: 48,
      l: 50,
    }
  }

  let bestColor =
    hexToHsl(candidates[0])

  let bestScore =
    Number.NEGATIVE_INFINITY

  for (const candidate of candidates) {
    const color =
      hexToHsl(candidate)

    let score = 0

    /*
      Saturation 25-70 range useful hoti hai.
    */
    if (
      color.s >= 25 &&
      color.s <= 75
    ) {
      score += 40
    } else if (
      color.s >= 15
    ) {
      score += 18
    }

    /*
      White / grey ko avoid.
    */
    if (color.s < 10) {
      score -= 70
    }

    /*
      Bahut white colors avoid.
    */
    if (color.l > 88) {
      score -= 60
    }

    /*
      Bahut dark almost black colors avoid.
    */
    if (color.l < 16) {
      score -= 45
    }

    /*
      Mid-range visual colors preferred.
    */
    score -=
      Math.abs(color.l - 52) * 0.6

    /*
      Some saturation is desirable.
    */
    score +=
      Math.min(color.s, 65) * 0.45

    if (score > bestScore) {
      bestScore = score
      bestColor = color
    }
  }

  return bestColor
}

/* =========================================================
   PREMIUM IMAGE PALETTE
========================================================= */

/*
  Image ka HUE exactly retain karte hain.

  Saturation ko na dead-grey banate hain,
  na neon.

  Result:
  green -> rich sage/herbal
  pink -> blush/rose
  orange -> warm sand/peach
  blue -> powder/steel blue
*/
function getCardColors(
  category: Category
) {
  const source =
    getBestImageColor(category)

  const hue = source.h

  /*
    Image ka saturation preserve karenge,
    bas safe premium range me.
  */
  const strength = clamp(
    source.s,
    32,
    52
  )

  return {
    hue,

    /*
      Main visual accent.
    */
    accent: hsl(
      hue,
      strength,
      52
    ),

    accentStrong: hsl(
      hue,
      clamp(
        strength + 7,
        38,
        58
      ),
      43
    ),

    /*
      Dark button/text shade.
    */
    deep: hsl(
      hue,
      clamp(
        strength + 5,
        36,
        56
      ),
      30
    ),

    /*
      Clearly colored card surfaces.
      Not white / not grey.
    */
    surfaceOne: hsl(
      hue,
      clamp(
        strength - 8,
        24,
        42
      ),
      93
    ),

    surfaceTwo: hsl(
      hue,
      clamp(
        strength - 4,
        28,
        46
      ),
      86
    ),

    surfaceThree: hsl(
      hue,
      clamp(
        strength - 10,
        22,
        38
      ),
      90
    ),

    /*
      Image stage stronger tint.
    */
    stageOne: hsl(
      hue,
      clamp(
        strength - 4,
        28,
        48
      ),
      88
    ),

    stageTwo: hsl(
      hue,
      clamp(
        strength,
        32,
        52
      ),
      82
    ),

    /*
      Border.
    */
    border: hsl(
      hue,
      clamp(
        strength,
        30,
        50
      ),
      72,
      0.55
    ),

    /*
      Glow.
    */
    glow: hsl(
      hue,
      clamp(
        strength + 4,
        34,
        58
      ),
      55,
      0.25
    ),

    glowStrong: hsl(
      hue,
      clamp(
        strength + 4,
        34,
        58
      ),
      50,
      0.34
    ),
  }
}

/* =========================================================
   IMAGE RATIO
========================================================= */

function getImageStageRatio(
  category: Category
) {
  const ratio =
    category.imageAspectRatio

  if (
    !ratio ||
    !Number.isFinite(ratio)
  ) {
    return '4 / 3'
  }

  if (ratio > 2.2) {
    return '16 / 9'
  }

  if (ratio < 0.72) {
    return '4 / 5'
  }

  return `${ratio}`
}

/* =========================================================
   DATA
========================================================= */

async function getCategories(): Promise<
  Category[]
> {
  try {
    const data =
      await client.fetch<Category[]>(
        HOME_CATEGORIES_QUERY,
        {},
        {
          next: {
            revalidate: 60,
          },
        }
      )

    return Array.isArray(data)
      ? data
      : []
  } catch (error) {
    console.error(
      'CategoryShowcase: unable to fetch Sanity categories:',
      error
    )

    return []
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default async function CategoryShowcase() {
  const allCategories =
    await getCategories()

  const categories =
    selectHomeCategories(
      allCategories
    )

  return (
    <section
      className="relative isolate overflow-hidden px-4 py-16 md:px-8 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(
            circle at 7% 10%,
            rgba(78,163,241,0.26) 0%,
            rgba(169,213,255,0.12) 22%,
            transparent 42%
          ),
          radial-gradient(
            circle at 93% 16%,
            rgba(31,111,209,0.16) 0%,
            transparent 42%
          ),
          linear-gradient(
            180deg,
            #ffffff 0%,
            #f7fbff 22%,
            #eef6ff 52%,
            #e8f3ff 80%,
            #f7fbff 100%
          )
        `,
      }}
    >
      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes categoryBorderFlow {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes categoryAuraMove {
          0%, 100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-16px, 14px, 0)
              scale(1.14);
          }
        }

        @keyframes categoryImageAmbient {
          0%, 100% {
            transform: scale(1.10);
          }

          50% {
            transform: scale(1.16);
          }
        }

        @keyframes categoryShine {
          0% {
            transform:
              translateX(-180%)
              skewX(-18deg);
          }

          100% {
            transform:
              translateX(360%)
              skewX(-18deg);
          }
        }

        .premium-category-card {
          transform: translateZ(0);
        }

        .premium-category-card:hover {
          transform: translateY(-9px);
        }

        .premium-category-card:hover
        .category-inner-card {
          box-shadow:
            0 32px 80px rgba(15, 23, 42, 0.14),
            0 12px 36px rgba(15, 23, 42, 0.07);
        }

        .premium-category-card:hover
        .category-image-main {
          transform: scale(1.012);
        }

        .premium-category-card:hover
        .category-arrow {
          transform:
            translate3d(4px, -3px, 0)
            scale(1.08);
        }

        .premium-category-card:hover
        .category-bottom-line {
          transform: scaleX(1);
        }

        .premium-category-card:hover
        .category-button-shine {
          animation:
            categoryShine
            0.9s
            ease-out;
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .category-gradient-border,
          .category-dynamic-aura,
          .category-image-ambient {
            animation: none !important;
          }

          .premium-category-card,
          .category-inner-card,
          .category-image-main,
          .category-arrow,
          .category-bottom-line {
            transition: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          SECTION BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-28 top-10 h-[390px] w-[390px] rounded-full blur-[130px]"
          style={{
            background:
              'rgba(78,163,241,0.16)',
          }}
        />

        <div
          className="absolute -right-28 top-20 h-[430px] w-[430px] rounded-full blur-[145px]"
          style={{
            background:
              'rgba(31,111,209,0.11)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.13]"
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

            backgroundSize:
              '84px 84px',

            WebkitMaskImage:
              'radial-gradient(circle at center, black, transparent 88%)',

            maskImage:
              'radial-gradient(circle at center, black, transparent 88%)',
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <div
              className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: '#1f6fd1',

                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.92), rgba(232,243,255,0.80))',

                border:
                  '1px solid rgba(31,111,209,0.12)',

                boxShadow:
                  '0 10px 28px rgba(11,63,112,0.06)',
              }}
            >
              Product Categories
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-4xl md:text-5xl lg:text-[56px]">
              Explore Our Core{' '}
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(90deg,#0b3f70,#145da0,#1f6fd1,#4ea3f1)',

                  WebkitBackgroundClip:
                    'text',

                  backgroundClip:
                    'text',

                  WebkitTextFillColor:
                    'transparent',
                }}
              >
                Product Divisions
              </span>
            </h2>

            <div
              className="mt-5 h-1.5 w-24 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg,#0b3f70,#1f6fd1,#4ea3f1)',
              }}
            />

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-[17px]">
              Browse our focused pharmaceutical
              portfolio across Cosmetic, Nutra
              Supplement, and Ayurvedic product
              categories.
            </p>
          </div>

          <Link
            href="/products"
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              background:
                'linear-gradient(135deg,#0b3f70,#145da0,#1f6fd1,#4ea3f1)',

              boxShadow:
                '0 15px 34px rgba(31,111,209,0.24)',
            }}
          >
            <span className="pointer-events-none absolute inset-y-0 -left-14 w-12 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[125%]" />

            <span className="relative z-10">
              View All Categories
            </span>

            <span className="relative z-10 ml-2">
              ↗
            </span>
          </Link>
        </div>

        {/* =====================================================
            CARDS
        ===================================================== */}

        {categories.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {categories.map(
              ({ category, key }) => {
                const meta =
                  getCategoryMeta(key)

                const colors =
                  getCardColors(category)

                const displayTitle =
                  getDisplayTitle(
                    category,
                    key
                  )

                const imageRatio =
                  getImageStageRatio(
                    category
                  )

                const imageUrl =
                  category.image
                    ? urlFor(category.image)
                        .width(1600)
                        .url()
                    : null

                return (
                  <Link
                    key={category._id}
                    href={`/products/${category.slug}`}
                    className="premium-category-card group relative block h-full transition-transform duration-500"
                  >
                    {/* =======================================
                        IMAGE COLOR AURA
                    ======================================= */}

                    <div
                      className="category-dynamic-aura pointer-events-none absolute -inset-5 rounded-[40px] blur-[40px]"
                      style={{
                        background: `
                          radial-gradient(
                            circle at 72% 18%,
                            ${colors.glowStrong},
                            transparent 64%
                          )
                        `,

                        animation:
                          'categoryAuraMove 8s ease-in-out infinite',
                      }}
                    />

                    {/* =======================================
                        IMAGE COLOR BORDER
                    ======================================= */}

                    <div
                      className="category-gradient-border relative h-full rounded-[34px] p-[1px]"
                      style={{
                        backgroundImage: `
                          linear-gradient(
                            125deg,
                            ${colors.surfaceOne},
                            ${colors.border},
                            ${colors.accent},
                            ${colors.surfaceTwo},
                            ${colors.border}
                          )
                        `,

                        backgroundSize:
                          '240% 240%',

                        animation:
                          'categoryBorderFlow 9s ease-in-out infinite',

                        boxShadow:
                          `0 20px 58px ${colors.glow}`,
                      }}
                    >
                      {/* =====================================
                          CARD
                      ===================================== */}

                      <div
                        className="category-inner-card relative flex h-full flex-col overflow-hidden rounded-[33px] transition-shadow duration-500"
                        style={{
                          /*
                            THIS IS NOW CLEARLY COLORED.

                            Card image ke hue se hi
                            background ban raha hai.
                          */
                          background: `
                            radial-gradient(
                              circle at 90% 6%,
                              ${colors.surfaceTwo},
                              transparent 38%
                            ),

                            radial-gradient(
                              circle at 5% 96%,
                              ${colors.surfaceThree},
                              transparent 42%
                            ),

                            linear-gradient(
                              145deg,
                              ${colors.surfaceOne} 0%,
                              ${colors.surfaceTwo} 48%,
                              ${colors.surfaceThree} 100%
                            )
                          `,

                          boxShadow:
                            `0 18px 48px ${colors.glow}`,
                        }}
                      >
                        {/* ===================================
                            IMAGE AREA
                        =================================== */}

                        <div className="relative p-3 sm:p-4">
                          <div
                            className="relative w-full overflow-hidden rounded-[24px]"
                            style={{
                              aspectRatio:
                                imageRatio,

                              background: `
                                linear-gradient(
                                  145deg,
                                  ${colors.stageOne},
                                  ${colors.stageTwo}
                                )
                              `,

                              border:
                                `1px solid ${colors.border}`,

                              boxShadow:
                                `0 14px 34px ${colors.glow}`,
                            }}
                          >
                            {/* =================================
                                AUTOMATIC AMBIENT IMAGE
                            ================================= */}

                            {imageUrl && (
                              <>
                                <Image
                                  src={imageUrl}
                                  alt=""
                                  fill
                                  aria-hidden="true"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                  className="category-image-ambient scale-110 object-cover opacity-[0.24] blur-2xl"
                                  style={{
                                    animation:
                                      'categoryImageAmbient 8s ease-in-out infinite',
                                  }}
                                />

                                {/* Palette tint over blurred image */}

                                <div
                                  className="pointer-events-none absolute inset-0"
                                  style={{
                                    background: `
                                      linear-gradient(
                                        145deg,
                                        ${hsl(
                                          colors.hue,
                                          35,
                                          92,
                                          0.34
                                        )},
                                        ${hsl(
                                          colors.hue,
                                          42,
                                          78,
                                          0.20
                                        )}
                                      )
                                    `,
                                  }}
                                />
                              </>
                            )}

                            {/* =================================
                                ACTUAL FULL IMAGE
                            ================================= */}

                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={displayTitle}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="category-image-main relative z-10 object-contain transition-transform duration-500"
                              />
                            ) : (
                              <div
                                className="absolute inset-0 flex items-center justify-center p-8"
                                style={{
                                  background: `
                                    linear-gradient(
                                      135deg,
                                      ${colors.deep},
                                      ${colors.accentStrong},
                                      ${colors.accent}
                                    )
                                  `,
                                }}
                              >
                                <p className="text-center text-2xl font-bold text-white">
                                  {displayTitle}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* ===================================
                            CONTENT
                        =================================== */}

                        <div
                          className="relative flex flex-1 flex-col px-6 pb-7 pt-4 md:px-7 md:pb-8"
                          style={{
                            background: `
                              radial-gradient(
                                circle at 100% 0%,
                                ${hsl(
                                  colors.hue,
                                  42,
                                  68,
                                  0.12
                                )},
                                transparent 38%
                              )
                            `,
                          }}
                        >
                          {/* Eyebrow */}

                          <p
                            className="text-[10px] font-extrabold uppercase tracking-[0.18em]"
                            style={{
                              color:
                                colors.deep,
                            }}
                          >
                            {meta.eyebrow}
                          </p>

                          {/* Title */}

                          <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-slate-900 sm:text-[27px]">
                            {displayTitle}
                          </h3>

                          {/* Colored accent */}

                          <div
                            className="mt-4 h-[3px] w-14 rounded-full"
                            style={{
                              background: `
                                linear-gradient(
                                  90deg,
                                  ${colors.deep},
                                  ${colors.accentStrong},
                                  ${colors.accent}
                                )
                              `,

                              boxShadow:
                                `0 0 14px ${colors.glowStrong}`,
                            }}
                          />

                          {/* Description */}

                          <p className="mt-5 flex-1 text-sm leading-7 text-slate-700/80 md:text-[15px]">
                            {category.description ||
                              meta.description}
                          </p>

                          {/* Divider */}

                          <div
                            className="my-5 h-px"
                            style={{
                              background: `
                                linear-gradient(
                                  90deg,
                                  ${hsl(
                                    colors.hue,
                                    40,
                                    52,
                                    0.34
                                  )},
                                  ${hsl(
                                    colors.hue,
                                    36,
                                    76,
                                    0.20
                                  )},
                                  transparent
                                )
                              `,
                            }}
                          />

                          {/* =================================
                              CTA
                          ================================= */}

                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p
                                className="text-[9px] font-bold uppercase tracking-[0.16em]"
                                style={{
                                  color:
                                    colors.accentStrong,
                                }}
                              >
                                Discover Range
                              </p>

                              <p className="mt-1 text-sm font-extrabold text-slate-900">
                                Explore Category
                              </p>
                            </div>

                            <span
                              className="category-arrow relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-xl text-white transition-transform duration-300"
                              style={{
                                background: `
                                  linear-gradient(
                                    135deg,
                                    ${colors.deep},
                                    ${colors.accentStrong},
                                    ${colors.accent}
                                  )
                                `,

                                boxShadow:
                                  `0 11px 28px ${colors.glowStrong}`,
                              }}
                            >
                              <span className="category-button-shine pointer-events-none absolute inset-y-0 -left-8 w-7 bg-white/25" />

                              <span className="relative z-10">
                                ↗
                              </span>
                            </span>
                          </div>

                          {/* Bottom hover */}

                          <div
                            className="category-bottom-line absolute inset-x-7 bottom-0 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-500"
                            style={{
                              background: `
                                linear-gradient(
                                  90deg,
                                  ${colors.deep},
                                  ${colors.accentStrong},
                                  ${colors.accent},
                                  transparent
                                )
                              `,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              }
            )}
          </div>
        ) : (
          <div className="mt-12 rounded-[30px] border border-blue-100 bg-white/80 px-7 py-6 text-sm text-slate-600 shadow-sm">
            Product categories are temporarily unavailable.
          </div>
        )}
      </div>
    </section>
  )
}
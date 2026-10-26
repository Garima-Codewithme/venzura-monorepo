import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/image'

type SanityPaletteSwatch = {
  background?: string
  foreground?: string
  population?: number
}

type SanityImagePalette = {
  dominant?: SanityPaletteSwatch
  vibrant?: SanityPaletteSwatch
  muted?: SanityPaletteSwatch
  lightVibrant?: SanityPaletteSwatch
  darkVibrant?: SanityPaletteSwatch
  lightMuted?: SanityPaletteSwatch
  darkMuted?: SanityPaletteSwatch
}

type AdaptiveCatalogCardProps = {
  href: string
  title: string
  description?: string
  eyebrow?: string

  image?: unknown
  imageAspectRatio?: number
  imagePalette?: SanityImagePalette

  accentColor?: string
  softColor?: string

  variant?: 'catalog' | 'product'

  badge?: string

  /*
    Compatibility ke liye rakha hai.
    Card par fake tags render nahi honge.
  */
  tags?: string[]

  ctaLabel?: string
}

type RGB = {
  r: number
  g: number
  b: number
}

type HSL = {
  h: number
  s: number
  l: number
}

/* =========================================================
   BASIC COLOR HELPERS
========================================================= */

function clamp(
  value: number,
  min: number,
  max: number
) {
  return Math.min(
    Math.max(value, min),
    max
  )
}

function normalizeHex(
  value?: string,
  fallback = '#456675'
) {
  if (!value) {
    return fallback
  }

  const color = value.trim()

  if (
    /^#[0-9a-fA-F]{6}$/.test(
      color
    )
  ) {
    return color
  }

  if (
    /^#[0-9a-fA-F]{3}$/.test(
      color
    )
  ) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
  }

  return fallback
}

function hexToRgb(
  value: string
): RGB {
  const hex =
    normalizeHex(value).replace(
      '#',
      ''
    )

  return {
    r: Number.parseInt(
      hex.slice(0, 2),
      16
    ),

    g: Number.parseInt(
      hex.slice(2, 4),
      16
    ),

    b: Number.parseInt(
      hex.slice(4, 6),
      16
    ),
  }
}

function rgbToHex({
  r,
  g,
  b,
}: RGB) {
  const convert = (
    value: number
  ) =>
    Math.round(
      clamp(value, 0, 255)
    )
      .toString(16)
      .padStart(2, '0')

  return `#${convert(r)}${convert(
    g
  )}${convert(b)}`
}

function rgbToHsl({
  r,
  g,
  b,
}: RGB): HSL {
  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const max = Math.max(
    red,
    green,
    blue
  )

  const min = Math.min(
    red,
    green,
    blue
  )

  let h = 0
  let s = 0

  const l =
    (max + min) / 2

  const delta =
    max - min

  if (delta !== 0) {
    s =
      l > 0.5
        ? delta /
          (2 - max - min)
        : delta /
          (max + min)

    switch (max) {
      case red:
        h =
          (green - blue) /
            delta +
          (green < blue ? 6 : 0)
        break

      case green:
        h =
          (blue - red) /
            delta +
          2
        break

      default:
        h =
          (red - green) /
            delta +
          4
        break
    }

    h *= 60
  }

  return {
    h,
    s,
    l,
  }
}

function hslToRgb({
  h,
  s,
  l,
}: HSL): RGB {
  const hue =
    ((h % 360) + 360) % 360

  if (s === 0) {
    const gray =
      Math.round(l * 255)

    return {
      r: gray,
      g: gray,
      b: gray,
    }
  }

  const q =
    l < 0.5
      ? l * (1 + s)
      : l + s - l * s

  const p =
    2 * l - q

  const hueToRgb = (
    first: number,
    second: number,
    tValue: number
  ) => {
    let t = tValue

    if (t < 0) t += 1
    if (t > 1) t -= 1

    if (t < 1 / 6) {
      return (
        first +
        (second - first) *
          6 *
          t
      )
    }

    if (t < 1 / 2) {
      return second
    }

    if (t < 2 / 3) {
      return (
        first +
        (second - first) *
          (2 / 3 - t) *
          6
      )
    }

    return first
  }

  const normalizedHue =
    hue / 360

  return {
    r: Math.round(
      hueToRgb(
        p,
        q,
        normalizedHue + 1 / 3
      ) * 255
    ),

    g: Math.round(
      hueToRgb(
        p,
        q,
        normalizedHue
      ) * 255
    ),

    b: Math.round(
      hueToRgb(
        p,
        q,
        normalizedHue - 1 / 3
      ) * 255
    ),
  }
}

function hslToHex(
  value: HSL
) {
  return rgbToHex(
    hslToRgb(value)
  )
}

function mixColors(
  first: string,
  second: string,
  amount: number
) {
  const a =
    hexToRgb(first)

  const b =
    hexToRgb(second)

  const ratio =
    clamp(amount, 0, 1)

  return rgbToHex({
    r:
      a.r +
      (b.r - a.r) * ratio,

    g:
      a.g +
      (b.g - a.g) * ratio,

    b:
      a.b +
      (b.b - a.b) * ratio,
  })
}

function rgba(
  color: string,
  alpha: number
) {
  const { r, g, b } =
    hexToRgb(color)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/* =========================================================
   PREMIUM COLOR ENGINE

   Sanity raw color:
   orange → refined terracotta
   green  → premium sage/forest
   red    → burgundy/rosewood
   yellow → antique gold
   blue   → elegant steel/navy
   purple → muted plum

   HUE same family me rahega.
========================================================= */

function premiumizeColor(
  rawColor: string
) {
  const input =
    rgbToHsl(
      hexToRgb(rawColor)
    )

  let saturation =
    clamp(
      input.s * 0.76,
      0.30,
      0.52
    )

  let lightness = 0.4

  const hue = input.h

  /*
    RED / BURGUNDY
  */
  if (
    hue >= 345 ||
    hue < 15
  ) {
    saturation =
      clamp(
        saturation,
        0.34,
        0.50
      )

    lightness = 0.37
  }

  /*
    TERRACOTTA / COPPER / ORANGE
  */
  else if (
    hue >= 15 &&
    hue < 48
  ) {
    saturation =
      clamp(
        saturation,
        0.36,
        0.50
      )

    lightness = 0.41
  }

  /*
    GOLD / YELLOW
    Bright mustard avoid.
  */
  else if (
    hue >= 48 &&
    hue < 76
  ) {
    saturation =
      clamp(
        saturation,
        0.30,
        0.44
      )

    lightness = 0.38
  }

  /*
    OLIVE / HERBAL GREEN
  */
  else if (
    hue >= 76 &&
    hue < 145
  ) {
    saturation =
      clamp(
        saturation,
        0.28,
        0.43
      )

    lightness = 0.35
  }

  /*
    EMERALD / TEAL
  */
  else if (
    hue >= 145 &&
    hue < 195
  ) {
    saturation =
      clamp(
        saturation,
        0.30,
        0.46
      )

    lightness = 0.36
  }

  /*
    CYAN / BLUE
  */
  else if (
    hue >= 195 &&
    hue < 255
  ) {
    saturation =
      clamp(
        saturation,
        0.32,
        0.48
      )

    lightness = 0.4
  }

  /*
    INDIGO / PURPLE
  */
  else if (
    hue >= 255 &&
    hue < 315
  ) {
    saturation =
      clamp(
        saturation,
        0.30,
        0.45
      )

    lightness = 0.39
  }

  /*
    MAGENTA / ROSE
  */
  else {
    saturation =
      clamp(
        saturation,
        0.32,
        0.48
      )

    lightness = 0.39
  }

  return hslToHex({
    h: hue,
    s: saturation,
    l: lightness,
  })
}

function buildPremiumFamily(
  rawColor: string
) {
  const accent =
    premiumizeColor(
      rawColor
    )

  const accentHsl =
    rgbToHsl(
      hexToRgb(accent)
    )

  const dark =
    hslToHex({
      h: accentHsl.h,
      s: clamp(
        accentHsl.s * 0.88,
        0.24,
        0.46
      ),
      l: 0.26,
    })

  const medium =
    hslToHex({
      h: accentHsl.h,
      s: clamp(
        accentHsl.s * 0.86,
        0.24,
        0.44
      ),
      l: 0.48,
    })

  const light =
    hslToHex({
      h: accentHsl.h,
      s: clamp(
        accentHsl.s * 0.58,
        0.18,
        0.34
      ),
      l: 0.76,
    })

  const soft =
    hslToHex({
      h: accentHsl.h,
      s: clamp(
        accentHsl.s * 0.48,
        0.12,
        0.28
      ),
      l: 0.92,
    })

  const surface =
    hslToHex({
      h: accentHsl.h,
      s: clamp(
        accentHsl.s * 0.34,
        0.08,
        0.20
      ),
      l: 0.965,
    })

  return {
    accent,
    dark,
    medium,
    light,
    soft,
    surface,
  }
}

/* =========================================================
   CHOOSE BEST IMAGE PALETTE COLOR

   Vibrant ko blindly use nahi karte.
   Usable premium-looking candidate select karte hain.
========================================================= */

function colorCandidateScore(
  color?: string,
  weight = 1
) {
  if (!color) {
    return -999
  }

  const normalized =
    normalizeHex(color)

  const hsl =
    rgbToHsl(
      hexToRgb(normalized)
    )

  /*
    We want enough saturation to identify image family,
    but not extreme neon / black / white.
  */

  const saturationScore =
    1 -
    Math.min(
      Math.abs(
        hsl.s - 0.5
      ) / 0.5,
      1
    )

  const lightScore =
    1 -
    Math.min(
      Math.abs(
        hsl.l - 0.46
      ) / 0.54,
      1
    )

  let penalty = 0

  if (hsl.l > 0.82) {
    penalty += 1.8
  }

  if (hsl.l < 0.14) {
    penalty += 1.5
  }

  if (hsl.s < 0.12) {
    penalty += 1.2
  }

  if (hsl.s > 0.88) {
    penalty += 0.5
  }

  return (
    saturationScore * 1.4 +
    lightScore *
      1.15 *
      weight -
    penalty
  )
}

function getBestPaletteColor(
  palette?: SanityImagePalette,
  fallback?: string
) {
  const candidates = [
    {
      color:
        palette?.darkVibrant
          ?.background,
      weight: 1.15,
    },
    {
      color:
        palette?.vibrant
          ?.background,
      weight: 1.08,
    },
    {
      color:
        palette?.muted
          ?.background,
      weight: 1.05,
    },
    {
      color:
        palette?.dominant
          ?.background,
      weight: 1,
    },
    {
      color:
        palette?.darkMuted
          ?.background,
      weight: 0.96,
    },
    {
      color:
        palette?.lightVibrant
          ?.background,
      weight: 0.82,
    },
  ]

  const best =
    candidates
      .filter(
        (
          item
        ): item is {
          color: string
          weight: number
        } =>
          Boolean(item.color)
      )
      .sort(
        (a, b) =>
          colorCandidateScore(
            b.color,
            b.weight
          ) -
          colorCandidateScore(
            a.color,
            a.weight
          )
      )[0]

  return normalizeHex(
    best?.color ||
      fallback ||
      '#456675'
  )
}

/* =========================================================
   IMAGE HELPERS
========================================================= */

function getImageUrl(
  image?: unknown
) {
  if (!image) {
    return null
  }

  try {
    return urlFor(
      image as Parameters<
        typeof urlFor
      >[0]
    )
      .width(1800)
      .url()
  } catch (error) {
    console.error(
      'AdaptiveCatalogCard image URL error:',
      error
    )

    return null
  }
}

function getStageAspectRatio(
  ratio?: number,
  variant:
    | 'catalog'
    | 'product' = 'product'
) {
  if (
    !ratio ||
    !Number.isFinite(ratio)
  ) {
    return variant ===
      'catalog'
      ? 1.22
      : 1.04
  }

  if (
    variant === 'catalog'
  ) {
    return Math.min(
      Math.max(
        ratio,
        1.05
      ),
      1.72
    )
  }

  return Math.min(
    Math.max(
      ratio,
      0.92
    ),
    1.36
  )
}

function sameText(
  first?: string,
  second?: string
) {
  if (
    !first ||
    !second
  ) {
    return false
  }

  return (
    first
      .trim()
      .toLowerCase() ===
    second
      .trim()
      .toLowerCase()
  )
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AdaptiveCatalogCard({
  href,
  title,
  description,
  eyebrow,
  image,
  imageAspectRatio,
  imagePalette,
  accentColor,
  softColor,
  variant = 'product',
  badge,
  ctaLabel,
}: AdaptiveCatalogCardProps) {
  const imageUrl =
    getImageUrl(image)

  /*
    Actual image family detect.
  */

  const rawImageColor =
    getBestPaletteColor(
      imagePalette,
      accentColor
    )

  /*
    Raw ugly/neon/muddy shade
    → curated premium version.
  */

  const colors =
    buildPremiumFamily(
      rawImageColor
    )

  /*
    Optional softColor ko background me
    lightly influence karne dete hain.
  */

  const rawSoft =
    softColor ||
    imagePalette?.lightMuted
      ?.background ||
    imagePalette?.muted
      ?.background

  const additionalSoft =
    rawSoft
      ? buildPremiumFamily(
          normalizeHex(rawSoft)
        ).soft
      : colors.soft

  const stageRatio =
    getStageAspectRatio(
      imageAspectRatio,
      variant
    )

  const finalBadge =
    badge ||
    eyebrow ||
    (variant === 'catalog'
      ? 'Category'
      : 'Product')

  const finalCta =
    ctaLabel ||
    (variant === 'catalog'
      ? 'Explore Category'
      : 'Explore Product')

  const showEyebrow =
    Boolean(eyebrow) &&
    !sameText(
      eyebrow,
      finalBadge
    )

  return (
    <Link
      href={href}
      className="
        group
        relative
        block
        h-full
        rounded-[30px]
        outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-400
        focus-visible:ring-offset-4
      "
    >
      {/* =====================================================
          PREMIUM IMAGE-FAMILY GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-2
          rounded-[36px]
          opacity-60
          blur-[30px]
          transition-all
          duration-500
          group-hover:opacity-90
          group-hover:blur-[36px]
        "
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 42%,
              ${rgba(
                colors.accent,
                0.13
              )} 0%,
              ${rgba(
                colors.soft,
                0.07
              )} 48%,
              transparent 74%
            )
          `,
        }}
      />

      {/* =====================================================
          CARD
      ===================================================== */}

      <article
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[30px]
          border
          transition-all
          duration-500
          group-hover:-translate-y-1.5
        "
        style={{
          borderColor:
            rgba(
              colors.accent,
              0.18
            ),

          background: `
            radial-gradient(
              circle at 100% 0%,
              ${rgba(
                additionalSoft,
                0.22
              )} 0%,
              transparent 28%
            ),

            linear-gradient(
              180deg,
              #ffffff 0%,
              ${colors.surface} 100%
            )
          `,

          boxShadow: `
            0 18px 48px rgba(15,23,42,0.075),
            0 4px 16px
            ${rgba(
              colors.accent,
              0.07
            )}
          `,
        }}
      >
        {/* =====================================================
            IMAGE AREA
      ===================================================== */}

        <div
          className="
            relative
            p-3
            pb-0
            sm:p-4
            sm:pb-0
          "
        >
          <div
            className="
              relative
              w-full
              overflow-hidden
              rounded-[24px]
              border
            "
            style={{
              aspectRatio:
                stageRatio,

              borderColor:
                rgba(
                  colors.accent,
                  0.20
                ),

              background: `
                radial-gradient(
                  ellipse at 50% 90%,
                  ${rgba(
                    colors.accent,
                    0.16
                  )} 0%,
                  ${rgba(
                    colors.accent,
                    0.055
                  )} 32%,
                  transparent 58%
                ),

                radial-gradient(
                  circle at 10% 10%,
                  ${rgba(
                    additionalSoft,
                    0.35
                  )} 0%,
                  transparent 38%
                ),

                linear-gradient(
                  145deg,
                  #ffffff 0%,
                  ${colors.surface} 54%,
                  ${colors.soft} 100%
                )
              `,

              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,0.92),
                0 8px 22px
                ${rgba(
                  colors.accent,
                  0.075
                )}
              `,
            }}
          >
            {/* SOFT LIGHT */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-[15%]
                right-[15%]
                top-[-10%]
                h-[34%]
                rounded-full
                blur-[30px]
              "
              style={{
                background:
                  'rgba(255,255,255,0.76)',
              }}
            />

            {/* FLOOR GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[4%]
                left-1/2
                h-[15%]
                w-[52%]
                -translate-x-1/2
                rounded-[50%]
                blur-[18px]
              "
              style={{
                background:
                  rgba(
                    colors.accent,
                    0.15
                  ),
              }}
            />

            {/* IMAGE */}

            {imageUrl ? (
              <div
                className="
                  absolute
                  inset-3
                "
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1280px) 50vw,
                    33vw
                  "
                  className="
                    object-contain
                    object-center
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-[1.025]
                  "
                  style={{
                    filter:
                      'drop-shadow(0 13px 18px rgba(15,23,42,0.09))',
                  }}
                />
              </div>
            ) : (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  p-8
                  text-center
                "
              >
                <p
                  className="
                    text-xl
                    font-extrabold
                  "
                  style={{
                    color:
                      colors.dark,
                  }}
                >
                  {title}
                </p>
              </div>
            )}

            {/* =================================================
                PREMIUM BADGE
            ================================================= */}

            <span
              className="
                absolute
                left-4
                top-4
                z-20
                inline-flex
                max-w-[72%]
                items-center
                rounded-full
                px-3
                py-1.5
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-white
              "
              style={{
                background: `
                  linear-gradient(
                    100deg,
                    ${colors.dark} 0%,
                    ${colors.accent} 100%
                  )
                `,

                boxShadow: `
                  0 7px 18px
                  ${rgba(
                    colors.accent,
                    0.20
                  )}
                `,
              }}
            >
              {finalBadge}
            </span>

            {/* BOTTOM ACCENT */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-0
                left-[12%]
                right-[12%]
                h-[3px]
                rounded-full
              "
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    transparent,
                    ${colors.dark},
                    ${colors.accent},
                    ${colors.light},
                    transparent
                  )
                `,
              }}
            />
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            flex
            flex-1
            flex-col
            px-6
            pb-6
            pt-5
          "
        >
          {showEyebrow && (
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.20em]
              "
              style={{
                color:
                  colors.dark,
              }}
            >
              {eyebrow}
            </p>
          )}

          <h2
            className={`
              ${
                showEyebrow
                  ? 'mt-3'
                  : 'mt-0'
              }
              text-[22px]
              font-extrabold
              leading-[1.15]
              tracking-[-0.03em]
            `}
            style={{
              color:
                colors.dark,
            }}
          >
            {title}
          </h2>

          {/* PREMIUM ACCENT LINE */}

          <div
            className="
              mt-4
              h-[3px]
              w-12
              rounded-full
              transition-all
              duration-500
              group-hover:w-20
            "
            style={{
              background: `
                linear-gradient(
                  90deg,
                  ${colors.dark},
                  ${colors.accent},
                  ${colors.light}
                )
              `,
            }}
          />

          {description && (
            <p
              className="
                mt-4
                text-sm
                leading-7
                text-slate-600
              "
            >
              {description}
            </p>
          )}

          <div
            className="
              mt-6
              h-px
              w-full
            "
            style={{
              background: `
                linear-gradient(
                  90deg,
                  ${rgba(
                    colors.accent,
                    0.20
                  )},
                  transparent
                )
              `,
            }}
          />

          {/* =================================================
              PREMIUM CTA
          ================================================= */}

          <div className="mt-auto pt-6">
            <div
              className="
                relative
                flex
                min-h-[56px]
                w-full
                items-center
                justify-between
                overflow-hidden
                rounded-[18px]
                px-5
                py-3.5
                text-white
                transition-all
                duration-300
                group-hover:-translate-y-0.5
              "
              style={{
                background: `
                  linear-gradient(
                    105deg,
                    ${colors.dark} 0%,
                    ${colors.accent} 67%,
                    ${colors.medium} 100%
                  )
                `,

                boxShadow: `
                  0 12px 28px
                  ${rgba(
                    colors.accent,
                    0.20
                  )}
                `,
              }}
            >
              {/* HOVER SHINE */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-20
                  w-16
                  -skew-x-12
                  bg-white/15
                  transition-all
                  duration-700
                  group-hover:left-[115%]
                "
              />

              <span
                className="
                  relative
                  z-10
                  text-sm
                  font-extrabold
                "
              >
                {finalCta}
              </span>

              <span
                className="
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-lg
                  backdrop-blur-sm
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
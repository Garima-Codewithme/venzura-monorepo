export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import AdaptiveCatalogCard from '@/components/products/AdaptiveCatalogCard'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type PaletteSwatch = {
  background?: string
  foreground?: string
}

type ImagePalette = {
  dominant?: PaletteSwatch
  vibrant?: PaletteSwatch
  muted?: PaletteSwatch
  lightVibrant?: PaletteSwatch
  darkVibrant?: PaletteSwatch
  lightMuted?: PaletteSwatch
  darkMuted?: PaletteSwatch
}

type Category = {
  _id: string
  title: string
  slug: string
  image?: unknown
  imagePalette?: ImagePalette
}

type Subcategory = {
  _id: string
  title: string
  slug: string
  image?: unknown
  imagePalette?: ImagePalette
}

type Product = {
  _id: string
  name: string
  slug: string

  shortDescription?: string
  composition?: string
  compositionItems?: string[]

  dosageForm?: string
  packaging?: string
  division?: string

  image?: unknown
  imagePalette?: ImagePalette

  featured?: boolean

  category: Category
  subcategory?: Subcategory
}

type RelatedProduct = {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  dosageForm?: string
  packaging?: string
  division?: string
  image?: unknown
  imageAspectRatio?: number
  imagePalette?: ImagePalette
  featured?: boolean
}

type RGB = {
  r: number
  g: number
  b: number
}

const PRODUCT_QUERY = `
  *[
    _type == "product" &&
    slug.current == $slug
  ][0]{
    _id,
    name,
    "slug": slug.current,

    shortDescription,
    composition,
    compositionItems,

    dosageForm,
    packaging,
    division,

    image,
    featured,

    "imagePalette":
      image.asset->metadata.palette,

    "category":
      category->{
        _id,
        title,
        "slug": slug.current,
        image,

        "imagePalette":
          image.asset->metadata.palette
      },

    "subcategory":
      subcategory->{
        _id,
        title,
        "slug": slug.current,
        image,

        "imagePalette":
          image.asset->metadata.palette
      }
  }
`

const RELATED_PRODUCTS_QUERY = `
  *[
    _type == "product" &&
    _id != $productId &&
    (
      (
        defined($subcategoryId) &&
        subcategory._ref == $subcategoryId
      ) ||
      (
        !defined($subcategoryId) &&
        category._ref == $categoryId
      )
    )
  ]
  | order(featured desc, name asc)[0...3]{
    _id,
    name,
    "slug": slug.current,

    shortDescription,
    dosageForm,
    packaging,
    division,

    image,
    featured,

    "imageAspectRatio":
      image.asset->metadata.dimensions.aspectRatio,

    "imagePalette":
      image.asset->metadata.palette
  }
`

function normalizeHex(
  value?: string,
  fallback = '#64748b'
) {
  if (!value) {
    return fallback
  }

  const color = value.trim()

  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color
  }

  if (/^#[0-9a-fA-F]{3}$/.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
  }

  return fallback
}

function hexToRgb(
  hex: string
): RGB {
  const safe =
    normalizeHex(hex).replace('#', '')

  return {
    r: Number.parseInt(
      safe.slice(0, 2),
      16
    ),

    g: Number.parseInt(
      safe.slice(2, 4),
      16
    ),

    b: Number.parseInt(
      safe.slice(4, 6),
      16
    ),
  }
}

function rgbToHex({
  r,
  g,
  b,
}: RGB) {
  const toHex = (value: number) =>
    Math.round(
      Math.max(
        0,
        Math.min(
          255,
          value
        )
      )
    )
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixColors(
  first: string,
  second: string,
  amount: number
) {
  const a = hexToRgb(first)
  const b = hexToRgb(second)

  const ratio =
    Math.max(
      0,
      Math.min(
        1,
        amount
      )
    )

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

function resolvePalette(
  palette?: ImagePalette
) {
  const accent =
    normalizeHex(
      palette?.vibrant?.background ||
        palette?.dominant?.background ||
        palette?.darkVibrant?.background ||
        palette?.muted?.background ||
        '#64748b'
    )

  const soft =
    normalizeHex(
      palette?.lightMuted?.background ||
        palette?.lightVibrant?.background ||
        palette?.muted?.background ||
        mixColors(
          accent,
          '#ffffff',
          0.76
        )
    )

  const dark =
    normalizeHex(
      palette?.darkMuted?.background ||
        palette?.darkVibrant?.background ||
        mixColors(
          accent,
          '#0f172a',
          0.28
        )
    )

  const light =
    mixColors(
      accent,
      '#ffffff',
      0.82
    )

  const veryLight =
    mixColors(
      soft,
      '#ffffff',
      0.90
    )

  return {
    accent,
    soft,
    dark,
    light,
    veryLight,
  }
}

function getImageUrl(
  image?: unknown
) {
  if (!image) {
    return null
  }

  try {
    return urlFor(
      image as Parameters<typeof urlFor>[0]
    )
      .width(1800)
      .url()
  } catch (error) {
    console.error(
      'Product detail image URL error:',
      error
    )

    return null
  }
}

async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    return await client.fetch<Product | null>(
      PRODUCT_QUERY,
      {
        slug,
      }
    )
  } catch (error) {
    console.error(
      'Product detail fetch error:',
      error
    )

    return null
  }
}

async function getRelatedProducts(
  product: Product
): Promise<RelatedProduct[]> {
  try {
    const products =
      await client.fetch<RelatedProduct[]>(
        RELATED_PRODUCTS_QUERY,
        {
          productId:
            product._id,

          categoryId:
            product.category._id,

          subcategoryId:
            product.subcategory?._id ||
            null,
        }
      )

    return Array.isArray(products)
      ? products
      : []
  } catch (error) {
    console.error(
      'Related products fetch error:',
      error
    )

    return []
  }
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } =
    await params

  const product =
    await getProduct(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts =
    await getRelatedProducts(
      product
    )

  /*
    IMAGE FALLBACK
  */

  const displayImage =
    product.image ||
    product.subcategory?.image ||
    product.category.image

  const displayImageUrl =
    getImageUrl(
      displayImage
    )

  /*
    PALETTE FALLBACK

    Product image
    ↓
    Subcategory image
    ↓
    Category image
  */

  const displayPalette =
    product.imagePalette ||
    product.subcategory?.imagePalette ||
    product.category.imagePalette

  const palette =
    resolvePalette(
      displayPalette
    )

  const compositionItems =
    Array.isArray(
      product.compositionItems
    )
      ? product.compositionItems.filter(
          Boolean
        )
      : []

  const hasComposition =
    compositionItems.length > 0 ||
    Boolean(
      product.composition?.trim()
    )

  const metaItems = [
    product.dosageForm
      ? {
          label:
            'Dosage Form',
          value:
            product.dosageForm,
        }
      : null,

    product.packaging
      ? {
          label:
            'Packaging',
          value:
            product.packaging,
        }
      : null,

    product.division
      ? {
          label:
            'Division',
          value:
            product.division,
        }
      : null,

    product.subcategory
      ? {
          label:
            'Product Range',
          value:
            product.subcategory.title,
        }
      : null,
  ].filter(
    (
      item
    ): item is {
      label: string
      value: string
    } =>
      Boolean(item)
  )

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        px-4
        py-10
        md:px-8
        md:py-14
        lg:px-16
        lg:py-16
      "
      style={{
        background: `
          radial-gradient(
            circle at 5% 10%,
            ${rgba(
              palette.soft,
              0.30
            )} 0%,
            transparent 30%
          ),

          radial-gradient(
            circle at 94% 36%,
            ${rgba(
              palette.accent,
              0.12
            )} 0%,
            transparent 30%
          ),

          linear-gradient(
            180deg,
            #ffffff 0%,
            ${palette.veryLight} 48%,
            #ffffff 100%
          )
        `,
      }}
    >
      {/* PAGE GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-24
          h-[520px]
          w-[520px]
          rounded-full
          blur-[150px]
        "
        style={{
          background:
            rgba(
              palette.accent,
              0.11
            ),
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-[34rem]
          h-[500px]
          w-[500px]
          rounded-full
          blur-[160px]
        "
        style={{
          background:
            rgba(
              palette.soft,
              0.16
            ),
        }}
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
      >
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <nav
          className="
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <Link
            href="/products"
            className="
              font-medium
              transition
              hover:text-slate-900
            "
          >
            Products
          </Link>

          <span>/</span>

          <Link
            href={`/products/${product.category.slug}`}
            className="
              font-medium
              transition
              hover:text-slate-900
            "
          >
            {product.category.title}
          </Link>

          {product.subcategory && (
            <>
              <span>/</span>

              <Link
                href={`/products/${product.category.slug}/${product.subcategory.slug}`}
                className="
                  font-medium
                  transition
                  hover:text-slate-900
                "
              >
                {product.subcategory.title}
              </Link>
            </>
          )}

          <span>/</span>

          <span
            className="
              font-semibold
              text-slate-800
            "
          >
            {product.name}
          </span>
        </nav>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            mt-8
            grid
            items-center
            gap-10
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-16
          "
        >
          {/* ===================================================
              PRODUCT IMAGE
          =================================================== */}

          <div className="relative">
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-6
                rounded-[46px]
                blur-[48px]
              "
              style={{
                background: `
                  radial-gradient(
                    ellipse at center,
                    ${rgba(
                      palette.accent,
                      0.18
                    )},
                    transparent 68%
                  )
                `,
              }}
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[34px]
                border
                p-4
                backdrop-blur-xl
              "
              style={{
                borderColor:
                  rgba(
                    palette.accent,
                    0.20
                  ),

                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.96),
                    ${rgba(
                      palette.veryLight,
                      0.94
                    )}
                  )
                `,

                boxShadow: `
                  0 28px 80px rgba(15,23,42,0.10),
                  0 6px 20px
                  ${rgba(
                    palette.accent,
                    0.09
                  )}
                `,
              }}
            >
              <div
                className="
                  relative
                  min-h-[480px]
                  overflow-hidden
                  rounded-[26px]
                  border
                  sm:min-h-[600px]
                "
                style={{
                  borderColor:
                    rgba(
                      palette.accent,
                      0.13
                    ),

                  background: `
                    radial-gradient(
                      ellipse at 50% 87%,
                      ${rgba(
                        palette.accent,
                        0.20
                      )} 0%,
                      ${rgba(
                        palette.accent,
                        0.075
                      )} 30%,
                      transparent 60%
                    ),

                    radial-gradient(
                      circle at 12% 12%,
                      ${rgba(
                        palette.soft,
                        0.25
                      )},
                      transparent 38%
                    ),

                    linear-gradient(
                      145deg,
                      #ffffff,
                      ${palette.veryLight}
                    )
                  `,
                }}
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-[5%]
                    left-1/2
                    h-[13%]
                    w-[48%]
                    -translate-x-1/2
                    rounded-[50%]
                    blur-[20px]
                  "
                  style={{
                    background:
                      rgba(
                        palette.accent,
                        0.18
                      ),
                  }}
                />

                {displayImageUrl ? (
                  <div
                    className="
                      absolute
                      inset-4
                      sm:inset-6
                    "
                  >
                    <Image
                      src={
                        displayImageUrl
                      }
                      alt={
                        product.name
                      }
                      fill
                      priority
                      sizes="
                        (max-width: 1024px) 100vw,
                        46vw
                      "
                      className="
                        object-contain
                        object-center
                      "
                      style={{
                        filter:
                          'drop-shadow(0 18px 24px rgba(15,23,42,0.12))',
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
                      p-10
                    "
                  >
                    <p
                      className="
                        text-center
                        text-3xl
                        font-extrabold
                      "
                      style={{
                        color:
                          palette.dark,
                      }}
                    >
                      {product.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              DETAILS
          =================================================== */}

          <div>
            {/* BADGES */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              <span
                className="
                  rounded-full
                  px-4
                  py-2
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-white
                "
                style={{
                  background: `
                    linear-gradient(
                      100deg,
                      ${palette.dark},
                      ${palette.accent}
                    )
                  `,

                  boxShadow:
                    `0 8px 20px ${rgba(
                      palette.accent,
                      0.20
                    )}`,
                }}
              >
                {product.category.title}
              </span>

              {product.subcategory && (
                <span
                  className="
                    rounded-full
                    border
                    px-4
                    py-2
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                  "
                  style={{
                    color:
                      palette.dark,

                    borderColor:
                      rgba(
                        palette.accent,
                        0.18
                      ),

                    background:
                      rgba(
                        palette.soft,
                        0.12
                      ),
                  }}
                >
                  {
                    product
                      .subcategory
                      .title
                  }
                </span>
              )}

              {product.featured && (
                <span
                  className="
                    rounded-full
                    border
                    px-4
                    py-2
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                  "
                  style={{
                    color:
                      palette.dark,

                    borderColor:
                      rgba(
                        palette.accent,
                        0.16
                      ),

                    background:
                      rgba(
                        palette.light,
                        0.35
                      ),
                  }}
                >
                  Featured
                </span>
              )}
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-7
                text-4xl
                font-extrabold
                leading-[1.04]
                tracking-[-0.045em]
                md:text-5xl
                lg:text-[58px]
              "
              style={{
                color:
                  palette.dark,
              }}
            >
              {product.name}
            </h1>

            {/* ADAPTIVE LINE */}

            <div
              className="
                mt-5
                h-1
                w-24
                rounded-full
              "
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    ${palette.dark},
                    ${palette.accent},
                    ${palette.light}
                  )
                `,
              }}
            />

            {/* DESCRIPTION */}

            {product.shortDescription && (
              <p
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-8
                  text-slate-600
                  md:text-[17px]
                "
              >
                {
                  product.shortDescription
                }
              </p>
            )}

            {/* META */}

            {metaItems.length > 0 && (
              <div
                className="
                  mt-8
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                {metaItems.map(
                  (item) => (
                    <div
                      key={
                        item.label
                      }
                      className="
                        rounded-[22px]
                        border
                        p-5
                      "
                      style={{
                        borderColor:
                          rgba(
                            palette.accent,
                            0.12
                          ),

                        background: `
                          linear-gradient(
                            145deg,
                            rgba(255,255,255,0.95),
                            ${rgba(
                              palette.veryLight,
                              0.90
                            )}
                          )
                        `,

                        boxShadow:
                          `0 12px 32px ${rgba(
                            palette.accent,
                            0.055
                          )}`,
                      }}
                    >
                      <p
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.18em]
                        "
                        style={{
                          color:
                            palette.accent,
                        }}
                      >
                        {
                          item.label
                        }
                      </p>

                      <p
                        className="
                          mt-2
                          font-extrabold
                        "
                        style={{
                          color:
                            palette.dark,
                        }}
                      >
                        {
                          item.value
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

            {/* CTA */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-3
              "
            >
              <Link
                href="/contact"
                className="
                  inline-flex
                  min-h-[50px]
                  items-center
                  justify-center
                  rounded-[16px]
                  px-6
                  py-3.5
                  text-sm
                  font-extrabold
                  text-white
                  transition
                  duration-300
                  hover:-translate-y-0.5
                "
                style={{
                  background: `
                    linear-gradient(
                      100deg,
                      ${palette.dark},
                      ${palette.accent},
                      ${mixColors(
                        palette.accent,
                        '#ffffff',
                        0.12
                      )}
                    )
                  `,

                  boxShadow:
                    `0 12px 28px ${rgba(
                      palette.accent,
                      0.22
                    )}`,
                }}
              >
                Enquire About Product
                <span className="ml-2">
                  →
                </span>
              </Link>

              {product.subcategory ? (
                <Link
                  href={`/products/${product.category.slug}/${product.subcategory.slug}`}
                  className="
                    inline-flex
                    min-h-[50px]
                    items-center
                    justify-center
                    rounded-[16px]
                    border
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    transition
                    duration-300
                    hover:-translate-y-0.5
                  "
                  style={{
                    color:
                      palette.dark,

                    borderColor:
                      rgba(
                        palette.accent,
                        0.18
                      ),

                    background:
                      'rgba(255,255,255,0.82)',
                  }}
                >
                  Back to Range
                </Link>
              ) : (
                <Link
                  href={`/products/${product.category.slug}`}
                  className="
                    inline-flex
                    min-h-[50px]
                    items-center
                    justify-center
                    rounded-[16px]
                    border
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                  "
                  style={{
                    color:
                      palette.dark,

                    borderColor:
                      rgba(
                        palette.accent,
                        0.18
                      ),

                    background:
                      'rgba(255,255,255,0.82)',
                  }}
                >
                  Back to Category
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            COMPOSITION
        ===================================================== */}

        {hasComposition && (
          <section
            className="
              mt-16
              lg:mt-20
            "
          >
            <div
              className="
                rounded-[30px]
                border
                p-6
                sm:p-8
                lg:p-10
              "
              style={{
                borderColor:
                  rgba(
                    palette.accent,
                    0.13
                  ),

                background: `
                  linear-gradient(
                    145deg,
                    rgba(255,255,255,0.96),
                    ${rgba(
                      palette.veryLight,
                      0.90
                    )}
                  )
                `,

                boxShadow:
                  `0 20px 60px ${rgba(
                    palette.accent,
                    0.06
                  )}`,
              }}
            >
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color:
                    palette.accent,
                }}
              >
                Product Information
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-extrabold
                  md:text-3xl
                "
                style={{
                  color:
                    palette.dark,
                }}
              >
                Composition
              </h2>

              {compositionItems.length >
              0 ? (
                <div
                  className="
                    mt-7
                    grid
                    gap-3
                    md:grid-cols-2
                  "
                >
                  {compositionItems.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={`${item}-${index}`}
                        className="
                          flex
                          items-start
                          gap-3
                          rounded-[18px]
                          border
                          px-4
                          py-4
                          text-sm
                          leading-6
                          text-slate-700
                        "
                        style={{
                          borderColor:
                            rgba(
                              palette.accent,
                              0.10
                            ),

                          background:
                            'rgba(255,255,255,0.82)',
                        }}
                      >
                        <span
                          className="
                            mt-[7px]
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                          "
                          style={{
                            backgroundColor:
                              palette.accent,
                          }}
                        />

                        <span>
                          {item}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p
                  className="
                    mt-6
                    whitespace-pre-line
                    text-sm
                    leading-8
                    text-slate-700
                    md:text-base
                  "
                >
                  {
                    product.composition
                  }
                </p>
              )}
            </div>
          </section>
        )}

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        {relatedProducts.length >
          0 && (
          <section
            className="
              mt-16
              lg:mt-20
            "
          >
            <div className="mb-8">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                "
                style={{
                  color:
                    palette.accent,
                }}
              >
                You May Also Explore
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-extrabold
                  md:text-3xl
                "
                style={{
                  color:
                    palette.dark,
                }}
              >
                Related Products
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-7
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {relatedProducts.map(
                (
                  relatedProduct
                ) => (
                  <AdaptiveCatalogCard
                    key={
                      relatedProduct._id
                    }
                    href={`/products/item/${relatedProduct.slug}`}
                    title={
                      relatedProduct.name
                    }
                    description={
                      relatedProduct.shortDescription ||
                      `Explore ${relatedProduct.name}.`
                    }
                    eyebrow={
                      product.subcategory
                        ?.title ||
                      product.category
                        .title
                    }
                    image={
                      relatedProduct.image ||
                      product
                        .subcategory
                        ?.image ||
                      product.category
                        .image
                    }
                    imageAspectRatio={
                      relatedProduct.imageAspectRatio
                    }
                    imagePalette={
                      relatedProduct.imagePalette ||
                      product
                        .subcategory
                        ?.imagePalette ||
                      product.category
                        .imagePalette
                    }
                    variant="product"
                    badge={
                      product.category
                        .title
                    }
                    ctaLabel="Explore Product"
                  />
                )
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
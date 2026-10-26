export const dynamic = 'force-dynamic'

import { client } from '@/lib/sanity'
import AdaptiveCatalogCard from '@/components/products/AdaptiveCatalogCard'

const CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
    "imagePalette": image.asset->metadata.palette
  }
`

type SanityPaletteSwatch = {
  background?: string
  foreground?: string
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

type Category = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
  imageAspectRatio?: number
  imagePalette?: SanityImagePalette
}

async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch<Category[]>(CATEGORIES_QUERY)
    return Array.isArray(categories) ? categories : []
  } catch (error) {
    console.error('ProductsPage: unable to fetch categories:', error)
    return []
  }
}

export default async function ProductsPage() {
  const categories = await getCategories()

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-14 md:px-8 md:py-18 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(circle at 7% 8%, rgba(78,163,241,0.20) 0%, transparent 34%),
          radial-gradient(circle at 94% 22%, rgba(31,111,209,0.12) 0%, transparent 34%),
          linear-gradient(180deg, #ffffff 0%, #f7fbff 30%, #eef6ff 62%, #ffffff 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 top-16 h-[420px] w-[420px] rounded-full blur-[145px]"
          style={{ background: 'rgba(78,163,241,0.15)' }}
        />
        <div
          className="absolute -right-32 top-[24rem] h-[460px] w-[460px] rounded-full blur-[155px]"
          style={{ background: 'rgba(31,111,209,0.10)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.045) 1px, transparent 1px)
            `,
            backgroundSize: '84px 84px',
            WebkitMaskImage:
              'radial-gradient(circle at center, black, transparent 88%)',
            maskImage:
              'radial-gradient(circle at center, black, transparent 88%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{
              color: '#1f6fd1',
              background:
                'linear-gradient(135deg,rgba(255,255,255,0.94),rgba(232,243,255,0.84))',
              border: '1px solid rgba(31,111,209,0.12)',
              boxShadow: '0 10px 28px rgba(11,63,112,0.06)',
            }}
          >
            Product Categories
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-900 md:text-5xl lg:text-[60px]">
            Explore Our{' '}
            <span
              style={{
                backgroundImage:
                  'linear-gradient(90deg,#0b3f70,#145da0,#1f6fd1,#4ea3f1)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Product Divisions
            </span>
          </h1>

          <div
            className="mt-5 h-1.5 w-24 rounded-full"
            style={{
              background: 'linear-gradient(90deg,#0b3f70,#1f6fd1,#4ea3f1)',
            }}
          />

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-[17px]">
            Explore our healthcare and pharmaceutical portfolio across
            specialized product divisions. Each card automatically adapts its
            visual appearance according to the image uploaded in Sanity.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="mt-12 rounded-[30px] border border-blue-100 bg-white/80 px-7 py-7 text-sm text-slate-600 shadow-sm backdrop-blur-xl">
            Product categories are currently unavailable.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <AdaptiveCatalogCard
                key={category._id}
                href={`/products/${category.slug}`}
                title={category.title}
                description={
                  category.description ||
                  `Explore our ${category.title} product range.`
                }
                eyebrow="Product Division"
                image={category.image}
                imageAspectRatio={category.imageAspectRatio}
                imagePalette={category.imagePalette}
                variant="catalog"
                badge={category.title}
                ctaLabel="Explore Category"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
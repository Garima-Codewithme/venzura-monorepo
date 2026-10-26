export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import AdaptiveCatalogCard from '@/components/products/AdaptiveCatalogCard'

const CATEGORY_PAGE_QUERY = `
{
  "category": *[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    title,
    description,
    image,
    "slug": slug.current,
    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
    "imagePalette": image.asset->metadata.palette
  },

  "subcategories": *[
    _type == "subcategory" &&
    category->slug.current == $categorySlug
  ] | order(order asc, title asc){
    _id,
    title,
    description,
    image,
    "slug": slug.current,
    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
    "imagePalette": image.asset->metadata.palette
  },

  "products": *[
    _type == "product" &&
    category->slug.current == $categorySlug &&
    !defined(subcategory)
  ] | order(featured desc, name asc){
    _id,
    name,
    shortDescription,
    dosageForm,
    packaging,
    image,
    "slug": slug.current,
    "imageAspectRatio": image.asset->metadata.dimensions.aspectRatio,
    "imagePalette": image.asset->metadata.palette
  }
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

type CategoryData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
  imageAspectRatio?: number
  imagePalette?: SanityImagePalette
}

type SubcategoryData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
  imageAspectRatio?: number
  imagePalette?: SanityImagePalette
}

type ProductData = {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  dosageForm?: string
  packaging?: string
  image?: unknown
  imageAspectRatio?: number
  imagePalette?: SanityImagePalette
}

type CategoryPageResponse = {
  category: CategoryData | null
  subcategories: SubcategoryData[]
  products: ProductData[]
}

async function getCategoryPageData(
  categorySlug: string
): Promise<CategoryPageResponse | null> {
  try {
    const data = await client.fetch<CategoryPageResponse>(
      CATEGORY_PAGE_QUERY,
      { categorySlug }
    )

    if (!data?.category) {
      return null
    }

    return {
      category: data.category,
      subcategories: Array.isArray(data.subcategories)
        ? data.subcategories
        : [],
      products: Array.isArray(data.products) ? data.products : [],
    }
  } catch (error) {
    console.error('Category page fetch error:', error)
    return null
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params
  const data = await getCategoryPageData(categorySlug)

  if (!data || !data.category) {
    notFound()
  }

  const { category, subcategories, products } = data
  const hasSubcategories = subcategories.length > 0

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-14 md:px-8 lg:px-16 lg:py-24"
      style={{
        background: `
          radial-gradient(circle at 8% 10%, rgba(78,163,241,0.16) 0%, transparent 30%),
          radial-gradient(circle at 92% 20%, rgba(31,111,209,0.08) 0%, transparent 28%),
          linear-gradient(180deg, #ffffff 0%, #f7fbff 34%, #eef6ff 70%, #ffffff 100%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-28 top-20 h-[360px] w-[360px] rounded-full blur-[140px]"
          style={{ background: 'rgba(78,163,241,0.12)' }}
        />
        <div
          className="absolute right-[-6rem] top-[24rem] h-[380px] w-[380px] rounded-full blur-[150px]"
          style={{ background: 'rgba(31,111,209,0.08)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Explore {category.title}
          </p>

          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            {category.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {category.description ||
              `Browse our ${category.title} portfolio crafted for reliable healthcare and pharmaceutical requirements.`}
          </p>
        </div>

        {hasSubcategories ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {subcategories.map((item) => (
              <AdaptiveCatalogCard
                key={item._id}
                href={`/products/${category.slug}/${item.slug}`}
                title={item.title}
                description={
                  item.description ||
                  `${item.title} under ${category.title} category.`
                }
                eyebrow={category.title}
                image={item.image}
                imageAspectRatio={item.imageAspectRatio}
                imagePalette={item.imagePalette}
                variant="catalog"
                badge={category.title}
                ctaLabel="Explore Product"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <AdaptiveCatalogCard
                key={product._id}
                href={`/products/item/${product.slug}`}
                title={product.name}
                description={
                  product.shortDescription ||
                  `Explore ${product.name} from ${category.title}.`
                }
                eyebrow={category.title}
                image={product.image}
                imageAspectRatio={product.imageAspectRatio}
                imagePalette={product.imagePalette}
                variant="product"
                badge={category.title}
                ctaLabel="Explore Product"
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-slate-200 bg-white/80 p-8 text-slate-600 shadow-sm backdrop-blur-xl">
            No items found in this category.
          </div>
        )}
      </div>
    </main>
  )
}
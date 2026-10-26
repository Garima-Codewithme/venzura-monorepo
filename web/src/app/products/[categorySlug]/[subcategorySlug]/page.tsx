export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import AdaptiveCatalogCard from '@/components/products/AdaptiveCatalogCard'

const SUBCATEGORY_PAGE_QUERY = `
{
  "category": *[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    title,
    "slug": slug.current
  },

  "subcategory": *[
    _type == "subcategory" &&
    slug.current == $subcategorySlug &&
    category->slug.current == $categorySlug
  ][0]{
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
    subcategory->slug.current == $subcategorySlug
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

type SubcategoryPageResponse = {
  category: CategoryData | null
  subcategory: SubcategoryData | null
  products: ProductData[]
}

async function getSubcategoryPageData(
  categorySlug: string,
  subcategorySlug: string
): Promise<SubcategoryPageResponse | null> {
  try {
    const data = await client.fetch<SubcategoryPageResponse>(
      SUBCATEGORY_PAGE_QUERY,
      { categorySlug, subcategorySlug }
    )

    if (!data?.subcategory || !data?.category) {
      return null
    }

    return {
      category: data.category,
      subcategory: data.subcategory,
      products: Array.isArray(data.products) ? data.products : [],
    }
  } catch (error) {
    console.error('Subcategory page fetch error:', error)
    return null
  }
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>
}) {
  const { categorySlug, subcategorySlug } = await params
  const data = await getSubcategoryPageData(categorySlug, subcategorySlug)

  if (!data || !data.category || !data.subcategory) {
    notFound()
  }

  const { category, subcategory, products } = data

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
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            {category.title}
          </p>

          <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
            {subcategory.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {subcategory.description ||
              `Explore ${subcategory.title} products under ${category.title}.`}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-white/80 p-8 text-slate-600 shadow-sm backdrop-blur-xl">
            No products found in this subcategory.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <AdaptiveCatalogCard
                key={product._id}
                href={`/products/item/${product.slug}`}
                title={product.name}
                description={
                  product.shortDescription ||
                  `Explore ${product.name} under ${subcategory.title}.`
                }
                eyebrow={subcategory.title}
                image={product.image}
                imageAspectRatio={product.imageAspectRatio}
                imagePalette={product.imagePalette}
                variant="product"
                badge={category.title}
                ctaLabel="Explore Product"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
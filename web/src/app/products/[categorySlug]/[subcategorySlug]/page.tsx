export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const SUBCATEGORY_PAGE_QUERY = `
  *[
    _type == "subcategory" &&
    slug.current == $subcategorySlug &&
    category->slug.current == $categorySlug
  ][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current
  }
`

const PRODUCTS_BY_SUBCATEGORY_QUERY = `
  *[
    _type == "product" &&
    category->slug.current == $categorySlug &&
    subcategory->slug.current == $subcategorySlug
  ]
  | order(name asc){
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    dosageForm,
    packaging,
    image
  }
`

type SubcategoryPage = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
  categoryTitle: string
  categorySlug: string
}

type Product = {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  dosageForm?: string
  packaging?: string
  image?: unknown
}

export async function generateStaticParams() {
  const items: { categorySlug: string; subcategorySlug: string }[] =
    await client.fetch(`
      *[_type == "subcategory" && defined(slug.current) && defined(category->slug.current)]{
        "categorySlug": category->slug.current,
        "subcategorySlug": slug.current
      }
    `)

  return items
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>
}) {
  const { categorySlug, subcategorySlug } = await params

  const subcategory: SubcategoryPage | null = await client.fetch(
    SUBCATEGORY_PAGE_QUERY,
    { categorySlug, subcategorySlug }
  )

  if (!subcategory) notFound()

  const products: Product[] = await client.fetch(PRODUCTS_BY_SUBCATEGORY_QUERY, {
    categorySlug,
    subcategorySlug,
  })

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/products/${categorySlug}`}
          className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          ← Back to {subcategory.categoryTitle}
        </Link>

        <div className="mt-6 mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Subcategory
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            {subcategory.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {subcategory.description || 'No description available.'}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            No products added in this subcategory yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/item/${product.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-100">
                  {product.image ? (
                    <Image
                      src={urlFor(product.image).width(900).height(600).url()}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      No Image
                    </div>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.shortDescription || 'No description available.'}
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Dosage:</span>{' '}
                    {product.dosageForm || '-'}
                  </p>
                  <p>
                    <span className="font-medium">Packaging:</span>{' '}
                    {product.packaging || '-'}
                  </p>
                </div>

                <p className="mt-6 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                  View Product →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
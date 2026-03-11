export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import type { Metadata } from 'next'

const CATEGORY_BY_SLUG_QUERY = `
  *[_type == "category" && slug.current == $categorySlug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`

const SUBCATEGORIES_QUERY = `
  *[_type == "subcategory" && category->slug.current == $categorySlug]
  | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`

const PRODUCTS_WITHOUT_SUBCATEGORY_QUERY = `
  *[
    _type == "product" &&
    category->slug.current == $categorySlug &&
    !defined(subcategory)
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

type Category = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
}

type Subcategory = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: unknown
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
  const categories: { slug: string }[] = await client.fetch(`
    *[_type == "category" && defined(slug.current)][]{
      "slug": slug.current
    }
  `)

  return categories.map((item) => ({
    categorySlug: item.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}): Promise<Metadata> {
  const { categorySlug } = await params

  const category = await client.fetch(
    `*[_type == "category" && slug.current == $categorySlug][0]{
      title,
      description
    }`,
    { categorySlug }
  )

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: category.title,
    description: category.description || `Explore ${category.title} products.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params

  const category: Category | null = await client.fetch(CATEGORY_BY_SLUG_QUERY, {
    categorySlug,
  })

  if (!category) notFound()

  const subcategories: Subcategory[] = await client.fetch(SUBCATEGORIES_QUERY, {
    categorySlug,
  })

  const directProducts: Product[] = await client.fetch(
    PRODUCTS_WITHOUT_SUBCATEGORY_QUERY,
    { categorySlug }
  )

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/products"
          className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          ← Back to Categories
        </Link>

        <div className="mt-6 mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Category
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            {category.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {category.description || 'No description available.'}
          </p>
        </div>

        {subcategories.length > 0 ? (
          <>
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
              Subcategories
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory._id}
                  href={`/products/${category.slug}/${subcategory.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-100">
                    {subcategory.image ? (
                      <Image
                        src={urlFor(subcategory.image).width(900).height(600).url()}
                        alt={subcategory.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-slate-900">
                    {subcategory.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {subcategory.description || 'No description available.'}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                    Explore Subcategory →
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
              Products
            </h2>

            {directProducts.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
                No products added in this category yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {directProducts.map((product) => (
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

                    <p className="mt-5 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                      View Product →
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
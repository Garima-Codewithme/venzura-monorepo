import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const HOME_PRODUCTS_QUERY = `
  *[_type == "product"] | order(featured desc, name asc)[0...6]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    dosageForm,
    packaging,
    image,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    "subcategoryTitle": subcategory->title,
    "subcategorySlug": subcategory->slug.current
  }
`

type Product = {
  _id: string
  name: string
  slug: string
  shortDescription?: string
  dosageForm?: string
  packaging?: string
  image?: unknown
  categoryTitle?: string
  categorySlug?: string
  subcategoryTitle?: string
  subcategorySlug?: string
}

export default async function ProductPortfolio() {
  const products: Product[] = await client.fetch(HOME_PRODUCTS_QUERY)

  return (
    <section className="bg-white px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Products
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Featured Product Portfolio
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
          >
            View All Categories
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            Add products in Sanity Studio to show them here.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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

                <div className="mt-5 flex flex-wrap gap-2">
                  {product.categoryTitle ? (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {product.categoryTitle}
                    </span>
                  ) : null}

                  {product.subcategoryTitle ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {product.subcategoryTitle}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
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
    </section>
  )
}
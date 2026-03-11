import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const HOME_CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc, title asc)[0...6]{
    _id,
    title,
    "slug": slug.current,
    description,
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

export default async function CategoryShowcase() {
  const categories: Category[] = await client.fetch(HOME_CATEGORIES_QUERY)

  return (
    <section className="bg-white px-4 py-16 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Product Categories
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              Explore Our Core Product Divisions
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Browse our major business categories including Cosmetic,
              Supplements, Allopathy, Ayurvedic, Veterinary, and Injections.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
          >
            View All Categories
          </Link>
        </div>

        {categories.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            No categories added yet in Sanity Studio.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/products/${category.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-52 overflow-hidden rounded-2xl bg-slate-100">
                  {category.image ? (
                    <Image
                      src={urlFor(category.image).width(900).height(600).url()}
                      alt={category.title}
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
                  {category.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description || `Explore ${category.title} products.`}
                </p>

                <p className="mt-5 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                  Explore Category →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
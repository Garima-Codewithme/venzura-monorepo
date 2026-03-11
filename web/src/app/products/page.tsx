export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc, title asc){
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

export default async function ProductsPage() {
  const categories: Category[] = await client.fetch(CATEGORIES_QUERY)

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Product Categories
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold text-slate-900 md:text-5xl">
            Explore Our Product Divisions
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            Browse our categories including Cosmetic, Supplements, Allopathy,
            Ayurvedic, Veterinary, and Injections.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            No categories added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/products/${category.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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

                <h2 className="mt-5 text-2xl font-semibold text-slate-900">
                  {category.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description || 'No description available.'}
                </p>

                <p className="mt-5 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                  Explore Category →
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
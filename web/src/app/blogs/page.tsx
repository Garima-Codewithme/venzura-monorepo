export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

export const metadata: Metadata = {
  title: 'Blogs | Venzura Medcor',
  description:
    'Read updates, insights, and pharma-related content from Venzura Medcor.',
}

const BLOGS_QUERY = `
  *[_type == "blog"] | order(publishedAt desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage
  }
`

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  coverImage?: unknown
}

export default async function BlogsPage() {
  const blogs: Blog[] = await client.fetch(BLOGS_QUERY)

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Blogs
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Insights, Updates, And Healthcare-Focused Content
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Explore company updates, pharmaceutical insights, and informative
            business content.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {blogs.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
              No blogs added yet in Sanity Studio.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-100">
                    {blog.coverImage ? (
                      <Image
                        src={urlFor(blog.coverImage).width(800).height(500).url()}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>

                  <p className="mt-5 text-sm text-slate-500">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : 'Latest Update'}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    {blog.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {blog.excerpt}
                  </p>

                  <p className="mt-5 text-sm font-semibold text-blue-700">
                    Read More →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
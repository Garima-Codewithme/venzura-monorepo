export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'

const BLOG_SLUGS_QUERY = `
  *[_type == "blog" && defined(slug.current)][]{
    "slug": slug.current
  }
`

const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    content
  }
`

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  coverImage?: unknown
  content?: any[]
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(BLOG_SLUGS_QUERY)
  return slugs.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog: Blog | null = await client.fetch(BLOG_BY_SLUG_QUERY, { slug })

  if (!blog) {
    return {
      title: 'Blog Not Found | Venzura Medcor',
    }
  }

  return {
    title: `${blog.title} | Venzura Medcor`,
    description: blog.excerpt || 'Blog detail page',
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog: Blog | null = await client.fetch(BLOG_BY_SLUG_QUERY, { slug })

  if (!blog) notFound()

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm text-blue-700">
          {blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString()
            : 'Latest Update'}
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          {blog.title}
        </h1>

        {blog.excerpt ? (
          <p className="mt-6 text-lg leading-8 text-slate-600">{blog.excerpt}</p>
        ) : null}

        {blog.coverImage ? (
          <div className="relative mt-10 h-[320px] overflow-hidden rounded-3xl bg-slate-100 md:h-[460px]">
            <Image
              src={urlFor(blog.coverImage).width(1200).height(700).url()}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="prose prose-slate mt-10 max-w-none">
          <PortableText value={blog.content || []} />
        </div>
      </article>
    </main>
  )
}
import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories: { slug: string }[] = await client.fetch(`
    *[_type == "category" && defined(slug.current)][]{
      "slug": slug.current
    }
  `)

  const subcategories: { categorySlug: string; subcategorySlug: string }[] =
    await client.fetch(`
      *[_type == "subcategory" && defined(slug.current) && defined(category->slug.current)]{
        "categorySlug": category->slug.current,
        "subcategorySlug": slug.current
      }
    `)

  const products: { slug: string }[] = await client.fetch(`
    *[_type == "product" && defined(slug.current)][]{
      "slug": slug.current
    }
  `)

  const blogs: { slug: string }[] = await client.fetch(`
    *[_type == "blog" && defined(slug.current)][]{
      "slug": slug.current
    }
  `)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/products`, lastModified: new Date() },
    { url: `${BASE_URL}/manufacturing`, lastModified: new Date() },
    { url: `${BASE_URL}/services`, lastModified: new Date() },
    { url: `${BASE_URL}/infrastructure`, lastModified: new Date() },
    { url: `${BASE_URL}/blogs`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
  ]

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((item) => ({
    url: `${BASE_URL}/products/${item.slug}`,
    lastModified: new Date(),
  }))

  const subcategoryRoutes: MetadataRoute.Sitemap = subcategories.map((item) => ({
    url: `${BASE_URL}/products/${item.categorySlug}/${item.subcategorySlug}`,
    lastModified: new Date(),
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((item) => ({
    url: `${BASE_URL}/products/item/${item.slug}`,
    lastModified: new Date(),
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((item) => ({
    url: `${BASE_URL}/blogs/${item.slug}`,
    lastModified: new Date(),
  }))

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...productRoutes,
    ...blogRoutes,
  ]
}
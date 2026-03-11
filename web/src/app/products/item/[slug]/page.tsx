export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/image'
import type { Metadata } from 'next'

const PRODUCT_SLUGS_QUERY = `
  *[_type == "product" && defined(slug.current)][]{
    "slug": slug.current
  }
`

const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    composition,
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
  composition?: string
  dosageForm?: string
  packaging?: string
  image?: unknown
  categoryTitle?: string
  categorySlug?: string
  subcategoryTitle?: string
  subcategorySlug?: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      name,
      shortDescription
    }`,
    { slug }
  )

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description:
      product.shortDescription || `${product.name} from Venzura Medcor.`,
  }
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(PRODUCT_SLUGS_QUERY)

  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product: Product | null = await client.fetch(PRODUCT_BY_SLUG_QUERY, {
    slug,
  })

  if (!product) notFound()

  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap gap-3 text-sm text-slate-600">
          <Link href="/products" className="text-blue-700 hover:text-blue-800">
            Products
          </Link>

          {product.categorySlug ? (
            <>
              <span>/</span>
              <Link
                href={`/products/${product.categorySlug}`}
                className="text-blue-700 hover:text-blue-800"
              >
                {product.categoryTitle}
              </Link>
            </>
          ) : null}

          {product.subcategorySlug ? (
            <>
              <span>/</span>
              <Link
                href={`/products/${product.categorySlug}/${product.subcategorySlug}`}
                className="text-blue-700 hover:text-blue-800"
              >
                {product.subcategoryTitle}
              </Link>
            </>
          ) : null}

          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="relative h-[320px] overflow-hidden rounded-2xl bg-slate-200 md:h-[460px]">
              {product.image ? (
                <Image
                  src={urlFor(product.image).width(1200).height(900).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              {product.categoryTitle || 'Product'}
            </p>

            <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            {product.subcategoryTitle ? (
              <p className="mt-3 text-sm font-medium text-slate-500">
                Subcategory: {product.subcategoryTitle}
              </p>
            ) : null}

            <p className="mt-5 text-base leading-7 text-slate-600">
              {product.shortDescription || 'Detailed product information will appear here.'}
            </p>

            <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-medium text-slate-500">Composition</p>
                <p className="mt-1 text-slate-800">{product.composition || '-'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">Dosage Form</p>
                <p className="mt-1 text-slate-800">{product.dosageForm || '-'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">Packaging</p>
                <p className="mt-1 text-slate-800">{product.packaging || '-'}</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
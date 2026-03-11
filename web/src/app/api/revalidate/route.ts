import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type WebhookBody = {
  _type?: string
  slug?: string
  categorySlug?: string
  subcategorySlug?: string
  secret?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WebhookBody

    if (body.secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 })
    }

    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/blogs')

    if (body.categorySlug) {
      revalidatePath(`/products/${body.categorySlug}`)
    }

    if (body.categorySlug && body.subcategorySlug) {
      revalidatePath(`/products/${body.categorySlug}/${body.subcategorySlug}`)
    }

    if (body._type === 'product' && body.slug) {
      revalidatePath(`/products/item/${body.slug}`)
    }

    if (body._type === 'blog' && body.slug) {
      revalidatePath(`/blogs/${body.slug}`)
    }

    if (body._type === 'category' && body.slug) {
      revalidatePath(`/products/${body.slug}`)
    }

    return NextResponse.json({ ok: true, revalidated: true })
  } catch {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}
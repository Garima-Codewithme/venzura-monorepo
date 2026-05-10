export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Merriweather } from 'next/font/google'
import ManufacturingPageContent from '@/components/sections/ManufacturingPageContent'

export const metadata: Metadata = {
  title: 'Manufacturing | Venzura Medcor',
  description:
    'Learn about our manufacturing-focused pharmaceutical capabilities, operational standards, and quality-led production approach.',
}

const manufacturingHeadingFont = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export default function ManufacturingPage() {
  return <ManufacturingPageContent titleClassName={manufacturingHeadingFont.className} />
}
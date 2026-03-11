export const dynamic = 'force-dynamic'

import Hero from '@/components/sections/Hero'
import SectionVideo from '@/components/sections/SectionVideo'
import CategoryShowcase from '@/components/sections/CategoryShowcase'
import AboutPreview from '@/components/sections/AboutPreview'
import ManufacturingServices from '@/components/sections/ManufacturingServices'
import BusinessEnquiry from '@/components/sections/BusinessEnquiry'
import ScrollReveal from '@/components/common/ScrollReveal'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />

      <ScrollReveal>
        <SectionVideo />
      </ScrollReveal>

      <ScrollReveal>
        <CategoryShowcase />
      </ScrollReveal>

      <ScrollReveal>
        <AboutPreview />
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <ManufacturingServices />
      </ScrollReveal>

      <ScrollReveal delay={0.16}>
        <BusinessEnquiry />
      </ScrollReveal>
    </main>
  )
}
export type ProductMegaMenuItem = {
  label: string
  description: string
  href: string
}

export type ProductMegaMenuSection = {
  title: string
  items: ProductMegaMenuItem[]
}

export const productMegaMenu: ProductMegaMenuSection[] = [
  {
    title: 'Core Categories',
    items: [
      {
        label: 'Cosmetic',
        description: 'Personal care and cosmetic product range.',
        href: '/products/cosmetic',
      },
      {
        label: 'Supplements',
        description: 'Wellness and nutritional support products.',
        href: '/products/supplements',
      },
      {
        label: 'Allopathy',
        description: 'Standard pharmaceutical product category.',
        href: '/products/allopathy',
      },
    ],
  },
  {
    title: 'Specialized Categories',
    items: [
      {
        label: 'Ayurvedic',
        description: 'Traditional and herbal product segment.',
        href: '/products/ayurvedic',
      },
      {
        label: 'Veterinary',
        description: 'Animal healthcare and veterinary products.',
        href: '/products/veterinary',
      },
      {
        label: 'Injections',
        description: 'Focused injectable product category.',
        href: '/products/injections',
      },
    ],
  },
]
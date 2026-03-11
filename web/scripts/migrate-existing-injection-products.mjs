import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

if (
  !process.env.SANITY_PROJECT_ID ||
  !process.env.SANITY_DATASET ||
  !process.env.SANITY_API_WRITE_TOKEN
) {
  console.error('Missing SANITY env values in .env.local')
  process.exit(1)
}

const categoryDocs = [
  {
    _id: 'category_cosmetic',
    _type: 'category',
    title: 'Cosmetic',
    slug: { _type: 'slug', current: 'cosmetic' },
    description: 'Cosmetic product category.',
    order: 1,
  },
  {
    _id: 'category_supplements',
    _type: 'category',
    title: 'Supplements',
    slug: { _type: 'slug', current: 'supplements' },
    description: 'Supplements product category.',
    order: 2,
  },
  {
    _id: 'category_allopathy',
    _type: 'category',
    title: 'Allopathy',
    slug: { _type: 'slug', current: 'allopathy' },
    description: 'Allopathy product category.',
    order: 3,
  },
  {
    _id: 'category_ayurvedic',
    _type: 'category',
    title: 'Ayurvedic',
    slug: { _type: 'slug', current: 'ayurvedic' },
    description: 'Ayurvedic product category.',
    order: 4,
  },
  {
    _id: 'category_veterinary',
    _type: 'category',
    title: 'Veterinary',
    slug: { _type: 'slug', current: 'veterinary' },
    description: 'Veterinary product category.',
    order: 5,
  },
  {
    _id: 'category_injections',
    _type: 'category',
    title: 'Injections',
    slug: { _type: 'slug', current: 'injections' },
    description: 'Injection product category.',
    order: 6,
  },
]

const subcategoryDocs = [
  {
    _id: 'subcategory_dry_injection',
    _type: 'subcategory',
    title: 'Dry Injection',
    slug: { _type: 'slug', current: 'dry-injection' },
    description: 'Dry injection products.',
    order: 1,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
  {
    _id: 'subcategory_liquid_injection',
    _type: 'subcategory',
    title: 'Liquid Injection',
    slug: { _type: 'slug', current: 'liquid-injection' },
    description: 'Liquid injection products.',
    order: 2,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
  {
    _id: 'subcategory_lyophilized',
    _type: 'subcategory',
    title: 'Lyophilized',
    slug: { _type: 'slug', current: 'lyophilized' },
    description: 'Lyophilized / cake form products.',
    order: 3,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
  {
    _id: 'subcategory_pre_filled_syringe',
    _type: 'subcategory',
    title: 'Pre-Filled Syringe',
    slug: { _type: 'slug', current: 'pre-filled-syringe' },
    description: 'Pre-filled syringe products.',
    order: 4,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
  {
    _id: 'subcategory_ppi',
    _type: 'subcategory',
    title: 'PPI',
    slug: { _type: 'slug', current: 'ppi' },
    description: 'PPI products.',
    order: 5,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
  {
    _id: 'subcategory_infusion_ivs',
    _type: 'subcategory',
    title: 'Infusion IVs',
    slug: { _type: 'slug', current: 'infusion-ivs' },
    description: 'Infusion IV products.',
    order: 6,
    category: {
      _type: 'reference',
      _ref: 'category_injections',
    },
  },
]

const oldCategoryMap = {
  'Dry Injection': 'subcategory_dry_injection',
  'Liquid Injection': 'subcategory_liquid_injection',
  'Lyophilized (Cake Form)': 'subcategory_lyophilized',
  'Pre-Filled Syringe': 'subcategory_pre_filled_syringe',
  PPI: 'subcategory_ppi',
  'Infusion IVs': 'subcategory_infusion_ivs',
}

async function seedCategories() {
  console.log('Creating categories...')

  for (const doc of categoryDocs) {
    await client.createIfNotExists(doc)
    console.log(`Category ready: ${doc.title}`)
  }
}

async function seedSubcategories() {
  console.log('Creating subcategories...')

  for (const doc of subcategoryDocs) {
    await client.createIfNotExists(doc)
    console.log(`Subcategory ready: ${doc.title}`)
  }
}

async function migrateProducts() {
  console.log('Fetching existing imported products...')

  const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      name,
      category,
      subcategory,
      division
    }
  `)

  let updatedCount = 0
  let skippedCount = 0

  for (const product of products) {
    if (product?.category && typeof product.category === 'object' && product.category._ref) {
      skippedCount++
      continue
    }

    const oldCategory = typeof product.category === 'string' ? product.category : ''
    const subcategoryRef = oldCategoryMap[oldCategory]

    const patch = client.patch(product._id).set({
      category: {
        _type: 'reference',
        _ref: 'category_injections',
      },
      division: 'Injections',
    })

    if (subcategoryRef) {
      patch.set({
        subcategory: {
          _type: 'reference',
          _ref: subcategoryRef,
        },
      })
    } else {
      patch.unset(['subcategory'])
    }

    await patch.commit()
    updatedCount++
    console.log(`Migrated: ${product.name}`)
  }

  console.log('\nMigration complete.')
  console.log(`Updated: ${updatedCount}`)
  console.log(`Skipped already migrated: ${skippedCount}`)
}

async function run() {
  await seedCategories()
  await seedSubcategories()
  await migrateProducts()
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
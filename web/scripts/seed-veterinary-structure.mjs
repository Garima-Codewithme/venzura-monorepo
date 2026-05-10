import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const categoryDoc = {
  _id: 'category_veterinary',
  _type: 'category',
  title: 'Veterinary',
  slug: {
    _type: 'slug',
    current: 'veterinary',
  },
  description: 'Veterinary product category.',
  order: 5,
}

const subcategories = [
  ['subcategory_veterinary_liquid_tonics', 'Liquid Tonics & Supplements', 'liquid-tonics-supplements'],
  ['subcategory_veterinary_bolus_tablets_kits', 'Bolus / Tablets / Kits', 'bolus-tablets-kits'],
  ['subcategory_veterinary_ointment', 'Ointment', 'ointment'],
  ['subcategory_veterinary_spray', 'Spray', 'spray'],
  ['subcategory_veterinary_shampoo', 'Shampoo', 'shampoo'],
  ['subcategory_veterinary_injections', 'Injections', 'injections'],
  ['subcategory_veterinary_feed_supplements', 'Feed Supplements', 'feed-supplements'],
]

async function run() {
  await client.createIfNotExists(categoryDoc)
  console.log('Category ready: Veterinary')

  for (let index = 0; index < subcategories.length; index++) {
    const [id, title, slug] = subcategories[index]

    await client.createIfNotExists({
      _id: id,
      _type: 'subcategory',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: `${title} under Veterinary category.`,
      order: index + 1,
      category: {
        _type: 'reference',
        _ref: 'category_veterinary',
      },
    })

    console.log(`Subcategory ready: ${title}`)
  }

  console.log('\nVeterinary structure seeded successfully.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const categoryDoc = {
  _id: 'category_nutra_supplement',
  _type: 'category',
  title: 'Nutra Supplement',
  slug: {
    _type: 'slug',
    current: 'nutra-supplement',
  },
  description: 'Nutra supplement product category.',
  order: 2,
}

const subcategories = [
  ['subcategory_nutra_tablet', 'Tablet', 'tablet'],
  ['subcategory_nutra_capsule', 'Capsule', 'capsule'],
  ['subcategory_nutra_syrup', 'Syrup', 'syrup'],
  ['subcategory_nutra_sachet', 'Sachet', 'sachet'],
  ['subcategory_nutra_powder', 'Powder', 'powder'],
  ['subcategory_nutra_softgel', 'Softgel', 'softgel'],
  ['subcategory_nutra_drops', 'Drops', 'drops'],
  ['subcategory_nutra_liquid', 'Liquid', 'liquid'],
]

async function run() {
  await client.createIfNotExists(categoryDoc)
  console.log('Category ready: Nutra Supplement')

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
      description: `${title} products under Nutra Supplement category.`,
      order: index + 1,
      category: {
        _type: 'reference',
        _ref: 'category_nutra_supplement',
      },
    })

    console.log(`Subcategory ready: ${title}`)
  }

  console.log('\nNutra Supplement structure seeded successfully.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
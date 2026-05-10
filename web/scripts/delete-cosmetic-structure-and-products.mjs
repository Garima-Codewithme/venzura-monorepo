import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const CATEGORY_ID = 'category_cosmetic'

async function run() {
  console.log('Deleting cosmetic products...')

  const productIds = await client.fetch(
    `*[_type == "product" && category._ref == $categoryId]._id`,
    { categoryId: CATEGORY_ID }
  )

  for (const id of productIds) {
    await client.delete(id)
    console.log(`Deleted product: ${id}`)
  }

  console.log('Deleting cosmetic subcategories...')

  const subcategoryIds = await client.fetch(
    `*[_type == "subcategory" && category._ref == $categoryId]._id`,
    { categoryId: CATEGORY_ID }
  )

  for (const id of subcategoryIds) {
    await client.delete(id)
    console.log(`Deleted subcategory: ${id}`)
  }

  console.log('Deleting cosmetic category...')

  const categoryExists = await client.fetch(
    `*[_type == "category" && _id == $categoryId][0]._id`,
    { categoryId: CATEGORY_ID }
  )

  if (categoryExists) {
    await client.delete(CATEGORY_ID)
    console.log(`Deleted category: ${CATEGORY_ID}`)
  }

  console.log('\nCosmetic structure and products deleted successfully.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
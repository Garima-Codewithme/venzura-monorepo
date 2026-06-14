import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const DUPLICATE_ID = 'baf1656f-1f79-4cec-991d-c57f08253c6a'
const KEEP_ID = 'category_ayurvedic'

async function run() {
  const linkedProducts = await client.fetch(
    `count(*[_type == "product" && category._ref == $id])`,
    { id: DUPLICATE_ID }
  )

  const linkedSubcategories = await client.fetch(
    `count(*[_type == "subcategory" && category._ref == $id])`,
    { id: DUPLICATE_ID }
  )

  console.log(`Products linked to duplicate: ${linkedProducts}`)
  console.log(`Subcategories linked to duplicate: ${linkedSubcategories}`)
  console.log(`Keeping category: ${KEEP_ID}`)

  if (linkedProducts > 0 || linkedSubcategories > 0) {
    console.log('Duplicate category is still linked somewhere. Delete stopped.')
    process.exit(1)
  }

  await client.delete(DUPLICATE_ID)
  console.log(`Deleted duplicate Ayurvedic category: ${DUPLICATE_ID}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
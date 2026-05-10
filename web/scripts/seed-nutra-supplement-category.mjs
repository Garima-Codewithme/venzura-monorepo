import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function run() {
  await client.createIfNotExists({
    _id: 'category_nutra_supplement',
    _type: 'category',
    title: 'Nutra Supplement',
    slug: {
      _type: 'slug',
      current: 'nutra-supplement',
    },
    description: 'Nutra supplement product category.',
    order: 2,
  })

  console.log('Category ready: Nutra Supplement')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
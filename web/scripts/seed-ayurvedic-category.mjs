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
    _id: 'category_ayurvedic',
    _type: 'category',
    title: 'Ayurvedic',
    slug: {
      _type: 'slug',
      current: 'ayurvedic',
    },
    description: 'Ayurvedic product category.',
    order: 4,
  })

  console.log('Category ready: Ayurvedic')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
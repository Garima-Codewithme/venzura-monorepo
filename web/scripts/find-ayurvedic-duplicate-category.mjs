import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function run() {
  const categories = await client.fetch(`
    *[_type == "category" && title == "Ayurvedic"]{
      _id,
      title,
      "slug": slug.current
    }
  `)

  console.log('\nAyurvedic categories found:')
  console.table(categories)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function run() {
  const items = await client.fetch(`
    *[_type == "subcategory"] | order(category->title asc, title asc){
      _id,
      title,
      "slug": slug.current,
      "categoryId": category->_id,
      "categoryTitle": category->title,
      "categorySlug": category->slug.current
    }
  `)

  console.log('\nAll subcategories with parent category:\n')
  console.table(items)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
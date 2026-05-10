import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createClient } from '@sanity/client'

const ROOT = process.cwd()
const INPUT_FILE = path.join(ROOT, 'src', 'data', 'generated', 'ayurvedic-products.json')

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`Ayurvedic JSON not found: ${INPUT_FILE}`)
  process.exit(1)
}

const products = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'))

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function makeDocumentId(item) {
  const seed = `${item.categorySlug}|${item.slug}|${item.name}`
  const hash = crypto.createHash('sha1').update(seed).digest('hex').slice(0, 18)
  return `product_${hash}`
}

async function run() {
  for (const item of products) {
    await client.createOrReplace({
      _id: makeDocumentId(item),
      _type: 'product',
      name: item.name,
      slug: {
        _type: 'slug',
        current: item.slug,
      },
      category: {
        _type: 'reference',
        _ref: item.categoryId,
      },
      shortDescription: item.shortDescription,
      composition: item.compositionItems?.join(', ') || '',
      compositionItems: item.compositionItems || [],
      dosageForm: item.dosageForm,
      packaging: item.packaging,
      division: item.division,
      featured: item.featured,
    })

    console.log(`Imported: ${item.name} -> ${item.dosageForm}`)
  }

  console.log(`\nDone. Imported ${products.length} ayurvedic products.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
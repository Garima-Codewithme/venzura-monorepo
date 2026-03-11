import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createClient } from '@sanity/client'

const ROOT = process.cwd()
const INPUT_FILE = path.join(ROOT, 'src', 'data', 'generated', 'products.json')

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`Products JSON not found: ${INPUT_FILE}`)
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

if (
  !process.env.SANITY_PROJECT_ID ||
  !process.env.SANITY_DATASET ||
  !process.env.SANITY_API_WRITE_TOKEN
) {
  console.error('Missing SANITY env values in .env.local')
  process.exit(1)
}

function makeDocumentId(item) {
  const seed = `${item.slug}|${item.category}|${item.sourceSheet}|${item.sourceRow}`
  const hash = crypto.createHash('sha1').update(seed).digest('hex').slice(0, 16)
  return `product_${hash}`
}

async function deletePreviousImportedProducts() {
  const ids = await client.fetch(
    `*[_type == "product" && defined(sourceSheet)]._id`
  )

  if (!ids.length) {
    console.log('No previous imported product docs found.')
    return
  }

  console.log(`Deleting ${ids.length} previously imported product docs...`)

  for (const id of ids) {
    await client.delete(id)
    console.log(`Deleted: ${id}`)
  }
}

async function run() {
  await deletePreviousImportedProducts()

  for (const item of products) {
    const doc = {
      _id: makeDocumentId(item),
      _type: 'product',
      name: item.name,
      slug: {
        _type: 'slug',
        current: item.slug,
      },
      division: item.division,
      category: item.category,
      dosageForm: item.dosageForm,
      shortDescription: item.shortDescription,
      composition: item.composition,
      packaging: item.packaging,
      featured: item.featured,
      sourceSheet: item.sourceSheet,
      sourceRow: item.sourceRow,
    }

    await client.createOrReplace(doc)
    console.log(`Imported: ${item.name}`)
  }

  console.log(`\nDone. Imported ${products.length} products.`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
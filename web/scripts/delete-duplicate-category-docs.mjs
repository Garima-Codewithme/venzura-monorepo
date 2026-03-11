import { createClient } from '@sanity/client'

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

const canonicalCategoryIds = [
  'category_cosmetic',
  'category_supplements',
  'category_allopathy',
  'category_ayurvedic',
  'category_veterinary',
  'category_injections',
]

const canonicalSubcategoryIds = [
  'subcategory_dry_injection',
  'subcategory_liquid_injection',
  'subcategory_lyophilized',
  'subcategory_pre_filled_syringe',
  'subcategory_ppi',
  'subcategory_infusion_ivs',
]

async function run() {
  const duplicateCategories = await client.fetch(
    `*[
      _type == "category" &&
      title in [
        "Cosmetic",
        "Supplements",
        "Allopathy",
        "Ayurvedic",
        "Veterinary",
        "Injections"
      ] &&
      !(_id in $canonicalCategoryIds)
    ]{
      _id,
      title
    }`,
    { canonicalCategoryIds }
  )

  const duplicateSubcategories = await client.fetch(
    `*[
      _type == "subcategory" &&
      title in [
        "Dry Injection",
        "Liquid Injection",
        "Lyophilized",
        "Pre-Filled Syringe",
        "PPI",
        "Infusion IVs"
      ] &&
      !(_id in $canonicalSubcategoryIds)
    ]{
      _id,
      title
    }`,
    { canonicalSubcategoryIds }
  )

  for (const doc of duplicateSubcategories) {
    await client.delete(doc._id)
    console.log(`Deleted duplicate subcategory: ${doc.title} (${doc._id})`)
  }

  for (const doc of duplicateCategories) {
    await client.delete(doc._id)
    console.log(`Deleted duplicate category: ${doc.title} (${doc._id})`)
  }

  console.log('\nDuplicate cleanup complete.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: 'raw',
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

const canonicalCategoryByTitle = {
  Cosmetic: 'category_cosmetic',
  Supplements: 'category_supplements',
  Allopathy: 'category_allopathy',
  Ayurvedic: 'category_ayurvedic',
  Veterinary: 'category_veterinary',
  Injections: 'category_injections',
}

const canonicalSubcategoryByTitle = {
  'Dry Injection': 'subcategory_dry_injection',
  'Liquid Injection': 'subcategory_liquid_injection',
  Lyophilized: 'subcategory_lyophilized',
  'Pre-Filled Syringe': 'subcategory_pre_filled_syringe',
  PPI: 'subcategory_ppi',
  'Infusion IVs': 'subcategory_infusion_ivs',
}

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

  const duplicateCategoryRefMap = Object.fromEntries(
    duplicateCategories
      .map((doc) => [doc._id, canonicalCategoryByTitle[doc.title]])
      .filter(([, canonicalId]) => Boolean(canonicalId))
  )

  const duplicateSubcategoryRefMap = Object.fromEntries(
    duplicateSubcategories
      .map((doc) => [doc._id, canonicalSubcategoryByTitle[doc.title]])
      .filter(([, canonicalId]) => Boolean(canonicalId))
  )

  const duplicateCategoryIds = Object.keys(duplicateCategoryRefMap)
  const duplicateSubcategoryIds = Object.keys(duplicateSubcategoryRefMap)

  const affectedProducts = await client.fetch(
    `*[
      _type == "product" &&
      (
        category._ref in $duplicateCategoryIds ||
        subcategory._ref in $duplicateSubcategoryIds
      )
    ]{
      _id,
      name,
      "categoryRef": category._ref,
      "subcategoryRef": subcategory._ref
    }`,
    {
      duplicateCategoryIds,
      duplicateSubcategoryIds,
    }
  )

  console.log('\nAffected product docs:')
  console.table(affectedProducts)

  let updatedCount = 0

  for (const product of affectedProducts) {
    const setData = {}

    if (product.categoryRef && duplicateCategoryRefMap[product.categoryRef]) {
      setData.category = {
        _type: 'reference',
        _ref: duplicateCategoryRefMap[product.categoryRef],
      }
    }

    if (product.subcategoryRef && duplicateSubcategoryRefMap[product.subcategoryRef]) {
      setData.subcategory = {
        _type: 'reference',
        _ref: duplicateSubcategoryRefMap[product.subcategoryRef],
      }
    }

    if (Object.keys(setData).length === 0) continue

    await client.patch(product._id).set(setData).commit()
    updatedCount++

    console.log(`Repointed: ${product.name} (${product._id})`)
  }

  const remaining = await client.fetch(
    `count(*[
      _type == "product" &&
      (
        category._ref in $duplicateCategoryIds ||
        subcategory._ref in $duplicateSubcategoryIds
      )
    ])`,
    {
      duplicateCategoryIds,
      duplicateSubcategoryIds,
    }
  )

  console.log('\nRepoint complete.')
  console.log(`Updated: ${updatedCount}`)
  console.log(`Remaining docs with duplicate refs: ${remaining}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
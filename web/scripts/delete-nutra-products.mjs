import nextEnv from '@next/env'
import { createClient } from '@sanity/client'

const { loadEnvConfig } = nextEnv

loadEnvConfig(process.cwd())

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

const apiVersion =
  process.env.SANITY_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2026-03-06'

const token =
  process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  throw new Error('Missing Sanity project ID')
}

if (!token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN in web/.env.local'
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: 'raw',
})

const DELETE_MODE = process.argv.includes('--delete')

/*
  Nutra aur purane Supplements naming variants
  dono ko same logical category maana jayega.
*/
const NUTRA_TITLES = [
  'Nutra Supplement',
  'Nutra Supplements',
  'Supplement',
  'Supplements',
  'Nutraceutical',
  'Nutraceuticals',
]

const NUTRA_SLUGS = [
  'nutra-supplement',
  'nutra-supplements',
  'supplement',
  'supplements',
  'nutraceutical',
  'nutraceuticals',
]

async function run() {
  console.log('')
  console.log('==========================================')
  console.log(' NUTRA COMPLETE RESET')
  console.log('==========================================')
  console.log(`Project : ${projectId}`)
  console.log(`Dataset : ${dataset}`)
  console.log(
    `Mode    : ${DELETE_MODE ? 'DELETE' : 'PREVIEW ONLY'}`
  )
  console.log('')

  /*
    STEP 1:
    Find every Nutra / Supplements category document.
  */
  const categories = await client.fetch(
    `
      *[
        _type == "category" &&
        (
          title in $titles ||
          slug.current in $slugs
        )
      ]{
        _id,
        title,
        "slug": slug.current
      }
    `,
    {
      titles: NUTRA_TITLES,
      slugs: NUTRA_SLUGS,
    }
  )

  if (!Array.isArray(categories) || categories.length === 0) {
    console.log('No Nutra / Supplement category documents found.')
    console.log('')
    return
  }

  const categoryIds = categories.map(
    (category) => category._id
  )

  console.log('CATEGORY DOCUMENTS FOUND')
  console.log('------------------------------------------')

  categories.forEach((category, index) => {
    console.log(
      `${index + 1}. ${category.title || '(Untitled)'}`
    )
    console.log(`   Slug: ${category.slug || '-'}`)
    console.log(`   ID:   ${category._id}`)
    console.log('')
  })

  /*
    STEP 2:
    Find products belonging to those categories.
  */
  const products = await client.fetch(
    `
      *[
        _type == "product" &&
        category._ref in $categoryIds
      ]{
        _id,
        title,
        "slug": slug.current,
        "categoryTitle": category->title,
        "subcategoryTitle": subcategory->title
      }
    `,
    {
      categoryIds,
    }
  )

  console.log('PRODUCTS FOUND')
  console.log('------------------------------------------')
  console.log(`Total products: ${products.length}`)
  console.log('')

  products.forEach((product, index) => {
    console.log(
      `${index + 1}. ${product.title || '(Untitled product)'}`
    )

    if (product.subcategoryTitle) {
      console.log(
        `   Subcategory: ${product.subcategoryTitle}`
      )
    }

    console.log(`   ID: ${product._id}`)
    console.log('')
  })

  /*
    STEP 3:
    Find subcategories belonging to Nutra categories.
  */
  const subcategories = await client.fetch(
    `
      *[
        _type == "subcategory" &&
        category._ref in $categoryIds
      ]{
        _id,
        title,
        "slug": slug.current,
        "categoryTitle": category->title
      }
    `,
    {
      categoryIds,
    }
  )

  console.log('SUBCATEGORIES FOUND')
  console.log('------------------------------------------')
  console.log(`Total subcategories: ${subcategories.length}`)
  console.log('')

  subcategories.forEach((subcategory, index) => {
    console.log(
      `${index + 1}. ${subcategory.title || '(Untitled subcategory)'}`
    )

    console.log(
      `   Slug: ${subcategory.slug || '-'}`
    )

    console.log(`   ID: ${subcategory._id}`)
    console.log('')
  })

  console.log('==========================================')
  console.log('RESET SUMMARY')
  console.log('==========================================')
  console.log(`Products      : ${products.length}`)
  console.log(`Subcategories : ${subcategories.length}`)
  console.log(`Categories    : ${categories.length}`)
  console.log('')

  /*
    PREVIEW MODE:
    Nothing is deleted until --delete is supplied.
  */
  if (!DELETE_MODE) {
    console.log('PREVIEW ONLY — nothing deleted.')
    console.log('')
    console.log(
      'Agar upar sab Nutra/Supplement data hi hai, run:'
    )
    console.log('')
    console.log(
      'node scripts/delete-nutra-products.mjs --delete'
    )
    console.log('')
    return
  }

  console.log('==========================================')
  console.log('STARTING DELETE')
  console.log('==========================================')
  console.log('')

  /*
    IMPORTANT DELETE ORDER:

    1. Products
    2. Subcategories
    3. Categories

    Is order se Sanity reference errors avoid honge.
  */

  console.log('1. Deleting products...')
  console.log('')

  let deletedProducts = 0

  for (const product of products) {
    await client.delete(product._id)

    deletedProducts++

    console.log(
      `[${deletedProducts}/${products.length}] Deleted product: ${
        product.title || product._id
      }`
    )
  }

  console.log('')
  console.log('2. Deleting subcategories...')
  console.log('')

  let deletedSubcategories = 0

  for (const subcategory of subcategories) {
    await client.delete(subcategory._id)

    deletedSubcategories++

    console.log(
      `[${deletedSubcategories}/${subcategories.length}] Deleted subcategory: ${
        subcategory.title || subcategory._id
      }`
    )
  }

  console.log('')
  console.log('3. Deleting category documents...')
  console.log('')

  let deletedCategories = 0

  for (const category of categories) {
    /*
      Safety check:
      Category ko delete karne se pehle check karega
      ki koi product/subcategory reference bacha to nahi.
    */
    const remainingReferences = await client.fetch(
      `
        count(
          *[
            (
              _type == "product" ||
              _type == "subcategory"
            ) &&
            category._ref == $categoryId
          ]
        )
      `,
      {
        categoryId: category._id,
      }
    )

    if (remainingReferences > 0) {
      console.log(
        `SKIPPED category ${category.title}: ${remainingReferences} reference(s) still exist.`
      )

      continue
    }

    await client.delete(category._id)

    deletedCategories++

    console.log(
      `[${deletedCategories}/${categories.length}] Deleted category: ${
        category.title || category._id
      }`
    )
  }

  console.log('')
  console.log('==========================================')
  console.log(' NUTRA RESET COMPLETE')
  console.log('==========================================')
  console.log(`Products deleted      : ${deletedProducts}`)
  console.log(
    `Subcategories deleted : ${deletedSubcategories}`
  )
  console.log(
    `Categories deleted    : ${deletedCategories}`
  )
  console.log('')
  console.log(
    'Frontend/Home CategoryShowcase code was NOT changed.'
  )
  console.log('')
}

run().catch((error) => {
  console.error('')
  console.error('Nutra reset failed:')
  console.error(error)
  console.error('')

  process.exit(1)
})
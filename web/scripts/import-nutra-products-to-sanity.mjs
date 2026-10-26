import nextEnv from '@next/env'
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

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

const IMPORT_MODE =
  process.argv.includes('--import')

const DATA_FILE = path.join(
  process.cwd(),
  'src',
  'data',
  'generated',
  'nutra-products.json'
)

const CATEGORY_ID =
  'category_nutra_supplement'

function makeIdPart(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

function cleanComposition(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items
    .map((item) =>
      String(item || '').trim()
    )
    .filter(Boolean)
}

function validateData(data) {
  if (!data?.category) {
    throw new Error(
      'Missing category in generated JSON'
    )
  }

  if (
    data.category.slug !==
    'nutra-supplement'
  ) {
    throw new Error(
      `Unexpected category slug: ${data.category.slug}`
    )
  }

  if (
    !Array.isArray(data.subcategories)
  ) {
    throw new Error(
      'Missing subcategories array'
    )
  }

  if (!Array.isArray(data.products)) {
    throw new Error(
      'Missing products array'
    )
  }

  const subcategorySlugs = new Set()

  for (
    const subcategory
    of data.subcategories
  ) {
    if (
      !subcategory.title ||
      !subcategory.slug
    ) {
      throw new Error(
        `Invalid subcategory: ${JSON.stringify(
          subcategory
        )}`
      )
    }

    if (
      subcategorySlugs.has(
        subcategory.slug
      )
    ) {
      throw new Error(
        `Duplicate subcategory slug: ${subcategory.slug}`
      )
    }

    subcategorySlugs.add(
      subcategory.slug
    )
  }

  const productSlugs = new Set()

  for (const product of data.products) {
    if (!product.title) {
      throw new Error(
        'Product without title found'
      )
    }

    if (!product.slug) {
      throw new Error(
        `Product without slug: ${product.title}`
      )
    }

    if (!product.subcategorySlug) {
      throw new Error(
        `Missing subcategory for: ${product.title}`
      )
    }

    if (
      !subcategorySlugs.has(
        product.subcategorySlug
      )
    ) {
      throw new Error(
        `Unknown subcategory "${product.subcategorySlug}" for product "${product.title}"`
      )
    }

    if (
      productSlugs.has(product.slug)
    ) {
      throw new Error(
        `Duplicate product slug: ${product.slug}`
      )
    }

    productSlugs.add(product.slug)
  }
}

function getSubcategoryDescription(
  title
) {
  const descriptions = {
    Tablets:
      'Nutra Supplement tablet formulations.',

    Sachets:
      'Nutra Supplement formulations supplied in convenient sachet format.',

    Liquids:
      'Liquid Nutra Supplement formulations.',

    Drops:
      'Nutra Supplement formulations available in drop format.',

    Powders:
      'Nutra Supplement powder formulations.',

    'Effervescent Tablets':
      'Effervescent Nutra Supplement tablet formulations.',

    Gummies:
      'Nutra Supplement formulations available in gummy format.',
  }

  return (
    descriptions[title] ||
    `${title} Nutra Supplement formulations.`
  )
}

async function run() {
  console.log('')
  console.log(
    '=========================================='
  )
  console.log(
    ' NUTRA SUPPLEMENT SANITY IMPORT'
  )
  console.log(
    '=========================================='
  )

  console.log(
    `Mode: ${
      IMPORT_MODE
        ? 'IMPORT'
        : 'PREVIEW ONLY'
    }`
  )

  console.log('')

  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(
      `Generated data file not found:\n${DATA_FILE}`
    )
  }

  const data = JSON.parse(
    fs.readFileSync(
      DATA_FILE,
      'utf8'
    )
  )

  validateData(data)

  console.log(
    `Category      : ${data.category.title}`
  )

  console.log(
    `Subcategories : ${data.subcategories.length}`
  )

  console.log(
    `Products      : ${data.products.length}`
  )

  console.log('')

  console.log(
    '------------------------------------------'
  )

  console.log(
    'SUBCATEGORY SUMMARY'
  )

  console.log(
    '------------------------------------------'
  )

  for (
    const subcategory
    of data.subcategories
  ) {
    const count =
      data.products.filter(
        (product) =>
          product.subcategorySlug ===
          subcategory.slug
      ).length

    console.log(
      `${subcategory.title}: ${count}`
    )
  }

  console.log('')

  if (!IMPORT_MODE) {
    console.log(
      '=========================================='
    )

    console.log('PREVIEW COMPLETE')

    console.log(
      'Nothing has been written to Sanity.'
    )

    console.log(
      '=========================================='
    )

    console.log('')

    console.log(
      'If everything above is correct, run:'
    )

    console.log('')

    console.log(
      'node scripts/import-nutra-products-to-sanity.mjs --import'
    )

    console.log('')

    return
  }

  /*
    ========================================================
    CATEGORY
    ========================================================
  */

  console.log(
    'Creating Nutra Supplement category...'
  )

  await client.createOrReplace({
    _id: CATEGORY_ID,

    _type: 'category',

    title:
      'Nutra Supplement',

    slug: {
      _type: 'slug',
      current:
        'nutra-supplement',
    },

    description:
      'Nutraceutical and wellness formulations across multiple dosage forms.',

    order: 2,
  })

  console.log(
    `✓ Category ready: ${CATEGORY_ID}`
  )

  console.log('')

  /*
    ========================================================
    SUBCATEGORIES
    ========================================================
  */

  console.log(
    'Creating subcategories...'
  )

  console.log('')

  const subcategoryMap =
    new Map()

  for (
    let index = 0;
    index <
    data.subcategories.length;
    index++
  ) {
    const subcategory =
      data.subcategories[index]

    const subcategoryId =
      `subcategory_nutra_${makeIdPart(
        subcategory.slug
      )}`

    subcategoryMap.set(
      subcategory.slug,
      subcategoryId
    )

    await client.createOrReplace({
      _id: subcategoryId,

      _type: 'subcategory',

      title:
        subcategory.title,

      slug: {
        _type: 'slug',
        current:
          subcategory.slug,
      },

      category: {
        _type: 'reference',
        _ref: CATEGORY_ID,
      },

      description:
        getSubcategoryDescription(
          subcategory.title
        ),

      order:
        index + 1,
    })

    console.log(
      `[${index + 1}/${
        data.subcategories.length
      }] ${subcategory.title}`
    )
  }

  console.log('')

  /*
    ========================================================
    PRODUCTS
    ========================================================
  */

  console.log(
    'Creating products...'
  )

  console.log('')

  let imported = 0

  for (
    const product
    of data.products
  ) {
    const subcategoryId =
      subcategoryMap.get(
        product.subcategorySlug
      )

    if (!subcategoryId) {
      throw new Error(
        `Missing subcategory reference for ${product.title}`
      )
    }

    const compositionItems =
      cleanComposition(
        product.composition
      )

    const productId =
      `product_nutra_${makeIdPart(
        product.slug
      )}`

    const document = {
      _id: productId,

      _type: 'product',

      /*
        IMPORTANT:
        Tumhare schema me field "name" hai,
        "title" nahi.
      */
      name:
        product.title,

      slug: {
        _type: 'slug',
        current:
          product.slug,
      },

      category: {
        _type: 'reference',
        _ref: CATEGORY_ID,
      },

      subcategory: {
        _type: 'reference',
        _ref: subcategoryId,
      },

      /*
        Excel ke Category:
        labels ko benefit/segment ke
        form me preserve kar rahe hain.
      */
      shortDescription:
        product.segment ||
        undefined,

      /*
        Full readable composition.
      */
      composition:
        compositionItems.length
          ? compositionItems.join(
              '\n'
            )
          : undefined,

      /*
        Structured composition.
        Website separate lines me
        easily render kar sakti hai.
      */
      compositionItems,

      /*
        Tablets / Sachets /
        Gummies etc.
      */
      dosageForm:
        product.subcategory,

      /*
        Source files me packaging
        available nahi hai,
        isliye fake value nahi dalenge.
      */

      division:
        'Nutra Supplement',

      featured: false,
    }

    await client.createOrReplace(
      document
    )

    imported++

    console.log(
      `[${imported}/${data.products.length}] ${product.title}`
    )
  }

  /*
    ========================================================
    VERIFICATION
    ========================================================
  */

  console.log('')
  console.log(
    'Verifying Sanity data...'
  )

  const verification =
    await client.fetch(
      `
        {
          "category": *[
            _type == "category" &&
            _id == $categoryId
          ][0]{
            _id,
            title,
            "slug": slug.current
          },

          "subcategoryCount":
            count(
              *[
                _type == "subcategory" &&
                category._ref == $categoryId
              ]
            ),

          "productCount":
            count(
              *[
                _type == "product" &&
                category._ref == $categoryId
              ]
            )
        }
      `,
      {
        categoryId:
          CATEGORY_ID,
      }
    )

  console.log('')
  console.log(
    '=========================================='
  )
  console.log(
    ' IMPORT COMPLETE'
  )
  console.log(
    '=========================================='
  )

  console.log(
    JSON.stringify(
      verification,
      null,
      2
    )
  )

  console.log('')

  if (
    verification.subcategoryCount !==
    data.subcategories.length
  ) {
    console.warn(
      `WARNING: Expected ${data.subcategories.length} subcategories but Sanity has ${verification.subcategoryCount}.`
    )
  }

  if (
    verification.productCount !==
    data.products.length
  ) {
    console.warn(
      `WARNING: Expected ${data.products.length} products but Sanity has ${verification.productCount}.`
    )
  }

  console.log('')
}

run().catch((error) => {
  console.error('')
  console.error(
    'Nutra import failed:'
  )

  console.error(error)

  console.error('')

  process.exit(1)
})
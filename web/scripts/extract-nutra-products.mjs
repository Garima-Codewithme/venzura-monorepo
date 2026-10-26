import fs from 'node:fs'
import path from 'node:path'
import XLSX from 'xlsx'

const ROOT = process.cwd()

const INPUT_DIR = path.join(
  ROOT,
  'data-source',
  'nutra'
)

const OUTPUT_DIR = path.join(
  ROOT,
  'src',
  'data',
  'generated'
)

const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  'nutra-products.json'
)

function slugify(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function cleanText(value) {
  if (value === null || value === undefined) {
    return ''
  }

  return String(value)
    .replace(/\r/g, '')
    .trim()
}

function isProductHeading(value) {
  return /^\d+\.\s+/.test(cleanText(value))
}

function getProductNumber(value) {
  const match = cleanText(value).match(/^(\d+)\./)

  return match
    ? Number(match[1])
    : null
}

function removeProductNumber(value) {
  return cleanText(value).replace(
    /^\d+\.\s*/,
    ''
  )
}

function getSubcategoryFromFileName(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function determineSubcategory(
  sourceSubcategory,
  productTitle
) {
  const normalizedSource =
    sourceSubcategory.toLowerCase()

  const normalizedTitle =
    productTitle.toLowerCase()

  /*
    Drops _ Powders file ko website ke liye
    clean Drops + Powders me split karenge.
  */
  if (
    normalizedSource.includes('drops') &&
    normalizedSource.includes('powders')
  ) {
    if (
      normalizedTitle.includes('drop') ||
      normalizedTitle.includes('drops')
    ) {
      return 'Drops'
    }

    return 'Powders'
  }

  return sourceSubcategory
}

function readExcelRows(filePath) {
  const workbook = XLSX.readFile(
    filePath,
    {
      cellDates: false,
      raw: false,
    }
  )

  const firstSheetName =
    workbook.SheetNames[0]

  if (!firstSheetName) {
    throw new Error(
      `No worksheet found in ${path.basename(filePath)}`
    )
  }

  const worksheet =
    workbook.Sheets[firstSheetName]

  /*
    header: 1 means raw row arrays.

    Files abhi mainly first column me structured hain,
    so blank rows preserve karke parser safely chalega.
  */
  return XLSX.utils.sheet_to_json(
    worksheet,
    {
      header: 1,
      defval: '',
      blankrows: true,
      raw: false,
    }
  )
}

function parseNutraFile(filePath) {
  const fileName =
    path.basename(filePath)

  const rows =
    readExcelRows(filePath)

  const firstColumn = rows.map(
    (row) => cleanText(row?.[0])
  )

  /*
    Actual first non-empty heading use karenge.
    Agar heading missing ho to filename fallback.
  */
  const firstNonEmpty =
    firstColumn.find(Boolean)

  const fileSubcategory =
    firstNonEmpty &&
    !isProductHeading(firstNonEmpty)
      ? firstNonEmpty
      : getSubcategoryFromFileName(fileName)

  const products = []

  for (
    let index = 0;
    index < firstColumn.length;
    index++
  ) {
    const current =
      firstColumn[index]

    if (!isProductHeading(current)) {
      continue
    }

    const sourceNumber =
      getProductNumber(current)

    const title =
      removeProductNumber(current)

    const composition = []

    let segment = ''

    let cursor = index + 1

    while (
      cursor < firstColumn.length
    ) {
      const value =
        firstColumn[cursor]

      /*
        Next numbered product aa gaya.
      */
      if (isProductHeading(value)) {
        break
      }

      if (!value) {
        cursor++
        continue
      }

      /*
        Files me Category:
        product benefit/segment hai.
        Main Sanity category nahi.
      */
      if (
        value
          .toLowerCase()
          .startsWith('category:')
      ) {
        segment = value
          .split(':')
          .slice(1)
          .join(':')
          .trim()

        cursor++
        continue
      }

      /*
        Baaki meaningful lines composition /
        ingredients ke roop me preserve hongi.
      */
      composition.push(value)

      cursor++
    }

    const subcategory =
      determineSubcategory(
        fileSubcategory,
        title
      )

    products.push({
      mainCategory:
        'Nutra Supplement',

      mainCategorySlug:
        'nutra-supplement',

      subcategory,

      subcategorySlug:
        slugify(subcategory),

      title,

      slug:
        slugify(title),

      segment,

      composition,

      sourceFile:
        fileName,

      sourceNumber,
    })
  }

  return products
}

function validateProducts(products) {
  const slugMap = new Map()

  const duplicateSlugs = []

  for (const product of products) {
    if (!product.title) {
      throw new Error(
        `Product without title found in ${product.sourceFile}`
      )
    }

    if (!product.subcategory) {
      throw new Error(
        `Product without subcategory: ${product.title}`
      )
    }

    if (!product.slug) {
      throw new Error(
        `Product without slug: ${product.title}`
      )
    }

    if (slugMap.has(product.slug)) {
      duplicateSlugs.push({
        slug: product.slug,
        first:
          slugMap.get(product.slug),
        second: product.title,
      })
    } else {
      slugMap.set(
        product.slug,
        product.title
      )
    }
  }

  return {
    duplicateSlugs,
  }
}

function run() {
  console.log('')
  console.log(
    '=========================================='
  )
  console.log(
    ' NUTRA EXCEL EXTRACTOR'
  )
  console.log(
    '=========================================='
  )
  console.log('')

  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(
      `Nutra input folder not found:\n${INPUT_DIR}`
    )
  }

  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((file) =>
      file.toLowerCase().endsWith('.xlsx')
    )
    .filter(
      (file) =>
        !file.startsWith('~$')
    )
    .sort((a, b) =>
      a.localeCompare(b)
    )

  if (files.length === 0) {
    throw new Error(
      `No .xlsx files found in:\n${INPUT_DIR}`
    )
  }

  console.log(
    `Excel files found: ${files.length}`
  )

  console.log('')

  const allProducts = []

  for (const file of files) {
    const fullPath =
      path.join(
        INPUT_DIR,
        file
      )

    const products =
      parseNutraFile(fullPath)

    allProducts.push(
      ...products
    )

    console.log(
      `✓ ${file}: ${products.length} product(s)`
    )
  }

  const validation =
    validateProducts(allProducts)

  /*
    Build subcategory summary dynamically.
    Future me new Excel file add hogi to
    automatically new subcategory create hogi.
  */

  const subcategoryMap =
    new Map()

  for (const product of allProducts) {
    if (
      !subcategoryMap.has(
        product.subcategorySlug
      )
    ) {
      subcategoryMap.set(
        product.subcategorySlug,
        {
          title:
            product.subcategory,

          slug:
            product.subcategorySlug,

          productCount: 0,
        }
      )
    }

    subcategoryMap.get(
      product.subcategorySlug
    ).productCount++
  }

  const subcategories =
    Array.from(
      subcategoryMap.values()
    )

  const output = {
    generatedAt:
      new Date().toISOString(),

    category: {
      title:
        'Nutra Supplement',

      slug:
        'nutra-supplement',
    },

    sourceFiles:
      files,

    subcategories,

    products:
      allProducts,

    validation: {
      totalFiles:
        files.length,

      totalSubcategories:
        subcategories.length,

      totalProducts:
        allProducts.length,

      duplicateProductSlugs:
        validation.duplicateSlugs,
    },
  }

  fs.mkdirSync(
    OUTPUT_DIR,
    {
      recursive: true,
    }
  )

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(
      output,
      null,
      2
    ),
    'utf8'
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
    of subcategories
  ) {
    console.log(
      `${subcategory.title}: ${subcategory.productCount}`
    )
  }

  console.log('')
  console.log(
    '=========================================='
  )
  console.log(
    ' EXTRACTION COMPLETE'
  )
  console.log(
    '=========================================='
  )

  console.log(
    `Files         : ${files.length}`
  )

  console.log(
    `Subcategories : ${subcategories.length}`
  )

  console.log(
    `Products      : ${allProducts.length}`
  )

  console.log(
    `Duplicates    : ${validation.duplicateSlugs.length}`
  )

  console.log('')

  console.log(
    `Output:\n${OUTPUT_FILE}`
  )

  console.log('')

  if (
    validation.duplicateSlugs.length
  ) {
    console.log(
      'WARNING: Duplicate product slugs detected:'
    )

    console.log(
      JSON.stringify(
        validation.duplicateSlugs,
        null,
        2
      )
    )

    process.exitCode = 1
  }
}

try {
  run()
} catch (error) {
  console.error('')
  console.error(
    'Nutra extraction failed:'
  )

  console.error(error)

  console.error('')

  process.exit(1)
}
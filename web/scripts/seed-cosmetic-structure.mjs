import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const categoryDoc = {
  _id: 'category_cosmetic',
  _type: 'category',
  title: 'Cosmetic',
  slug: {
    _type: 'slug',
    current: 'cosmetic',
  },
  description: 'Cosmetic product category.',
  order: 1,
}

const subcategories = [
  ['subcategory_cosmetic_lotions', 'Lotions', 'lotions'],
  ['subcategory_cosmetic_face_wash', 'Face Wash', 'face-wash'],
  ['subcategory_cosmetic_cream', 'Cream', 'cream'],
  ['subcategory_cosmetic_shampoo_conditioner', 'Shampoo & Conditioner', 'shampoo-conditioner'],
  ['subcategory_cosmetic_hair_oil', 'Hair Oil', 'hair-oil'],
  ['subcategory_cosmetic_soap', 'Soap', 'soap'],
  ['subcategory_cosmetic_body_wash', 'Body Wash', 'body-wash'],
  ['subcategory_cosmetic_face_toner', 'Face Toner', 'face-toner'],
  ['subcategory_cosmetic_face_serum', 'Face Serum', 'face-serum'],
  ['subcategory_cosmetic_body_scrub', 'Body Scrub', 'body-scrub'],
  ['subcategory_cosmetic_hair_serum', 'Hair Serum', 'hair-serum'],
  ['subcategory_cosmetic_facial_kit', 'Facial Kit', 'facial-kit'],
  ['subcategory_cosmetic_hair_mask', 'Hair Mask', 'hair-mask'],
  ['subcategory_cosmetic_lip_balm', 'Lip Balm', 'lip-balm'],
  ['subcategory_cosmetic_under_eye_cream', 'Under Eye Cream', 'under-eye-cream'],
  ['subcategory_cosmetic_hair_removal_cream', 'Hair Removal Cream', 'hair-removal-cream'],
  ['subcategory_cosmetic_face_mask', 'Face Mask', 'face-mask'],
  ['subcategory_cosmetic_face_scrub', 'Face Scrub', 'face-scrub'],
  ['subcategory_cosmetic_skin_care_gel', 'Skin Care Gel', 'skin-care-gel'],
  ['subcategory_cosmetic_foaming_face_wash', 'Foaming Face Wash', 'foaming-face-wash'],
  ['subcategory_cosmetic_hand_wash', 'Hand Wash', 'hand-wash'],
  ['subcategory_cosmetic_intimate_hygiene_wash', 'Intimate Hygiene Wash', 'intimate-hygiene-wash'],
  ['subcategory_cosmetic_essential_oil', 'Essential Oil', 'essential-oil'],
  ['subcategory_cosmetic_intimate_products', 'Intimate Products', 'intimate-products'],
  ['subcategory_cosmetic_beard_range', 'Beard Range', 'beard-range'],
  ['subcategory_cosmetic_baby_body_wash', 'Baby Body Wash', 'baby-body-wash'],
  ['subcategory_cosmetic_baby_soap', 'Baby Soap', 'baby-soap'],
  ['subcategory_cosmetic_baby_lotion', 'Baby Lotion', 'baby-lotion'],
  ['subcategory_cosmetic_baby_shampoo', 'Baby Shampoo', 'baby-shampoo'],
  ['subcategory_cosmetic_baby_hair_oil', 'Baby Hair Oil', 'baby-hair-oil'],
  ['subcategory_cosmetic_baby_massage_oil', 'Baby Massage Oil', 'baby-massage-oil'],
  ['subcategory_cosmetic_baby_powder', 'Baby Powder', 'baby-powder'],
]

async function run() {
  await client.createIfNotExists(categoryDoc)
  console.log('Category ready: Cosmetic')

  for (let index = 0; index < subcategories.length; index++) {
    const [id, title, slug] = subcategories[index]

    await client.createIfNotExists({
      _id: id,
      _type: 'subcategory',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: `${title} under Cosmetic category.`,
      order: index + 1,
      category: {
        _type: 'reference',
        _ref: 'category_cosmetic',
      },
    })

    console.log(`Subcategory ready: ${title}`)
  }

  console.log('\nCosmetic structure seeded successfully.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
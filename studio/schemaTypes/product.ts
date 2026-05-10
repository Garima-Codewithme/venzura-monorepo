import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 120,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: true,
      },
    }),

    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      description: 'Optional. Leave empty if product belongs directly to category.',
      options: {
        disableNew: true,
      },
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'composition',
      title: 'Composition',
      type: 'text',
      rows: 4,
      description: 'Optional plain text composition.',
    }),

    defineField({
      name: 'compositionItems',
      title: 'Composition Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use this for products where each composition item should be shown in separate lines.',
    }),

    defineField({
      name: 'dosageForm',
      title: 'Dosage Form',
      type: 'string',
      description: 'Example: Syrup, Capsules, Oil, Tablet, Injection.',
    }),

    defineField({
      name: 'packaging',
      title: 'Packaging',
      type: 'string',
      description: 'Example: 200ml, 60 Capsule, 10x10 Blister Pack.',
    }),

    defineField({
      name: 'division',
      title: 'Division',
      type: 'string',
      description: 'Example: Ayurvedic, Cosmetic, Veterinary, Nutra Supplement.',
    }),

    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      categoryTitle: 'category.title',
      subcategoryTitle: 'subcategory.title',
      dosageForm: 'dosageForm',
      packaging: 'packaging',
    },
    prepare(selection) {
      const { title, media, categoryTitle, subcategoryTitle, dosageForm, packaging } = selection

      const parts = [categoryTitle, subcategoryTitle, dosageForm, packaging].filter(Boolean)

      return {
        title,
        media,
        subtitle: parts.join(' • '),
      }
    },
  },
})
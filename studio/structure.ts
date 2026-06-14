import type { StructureResolver } from 'sanity/structure'

const HIDDEN_DOC_TYPES = ['category', 'subcategory', 'product', 'blog', 'enquiry']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Manager')
    .items([
      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
            .child((categoryId) =>
              S.list()
                .title('Category Manager')
                .items([
                  S.listItem()
                    .title('Edit Category')
                    .child(
                      S.document()
                        .schemaType('category')
                        .documentId(categoryId)
                    ),

                  S.listItem()
                    .title('Subcategories')
                    .child(
                      S.documentTypeList('subcategory')
                        .title('Subcategories')
                        .filter('_type == "subcategory" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([
                          { field: 'order', direction: 'asc' },
                          { field: 'title', direction: 'asc' },
                        ])
                        .child((subcategoryId) =>
                          S.list()
                            .title('Subcategory Manager')
                            .items([
                              S.listItem()
                                .title('Edit Subcategory')
                                .child(
                                  S.document()
                                    .schemaType('subcategory')
                                    .documentId(subcategoryId)
                                ),

                              S.listItem()
                                .title('Products In This Subcategory')
                                .child(
                                  S.documentTypeList('product')
                                    .title('Products In This Subcategory')
                                    .filter(
                                      '_type == "product" && category._ref == $categoryId && subcategory._ref == $subcategoryId'
                                    )
                                    .params({ categoryId, subcategoryId })
                                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                                ),

                              S.listItem()
                                .title('Featured Products In This Subcategory')
                                .child(
                                  S.documentTypeList('product')
                                    .title('Featured Products In This Subcategory')
                                    .filter(
                                      '_type == "product" && category._ref == $categoryId && subcategory._ref == $subcategoryId && featured == true'
                                    )
                                    .params({ categoryId, subcategoryId })
                                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                                ),

                              S.listItem()
                                .title('Products Missing Image')
                                .child(
                                  S.documentTypeList('product')
                                    .title('Products Missing Image')
                                    .filter(
                                      '_type == "product" && category._ref == $categoryId && subcategory._ref == $subcategoryId && !defined(image)'
                                    )
                                    .params({ categoryId, subcategoryId })
                                    .defaultOrdering([{ field: 'name', direction: 'asc' }])
                                ),
                            ])
                        )
                    ),

                  S.listItem()
                    .title('Direct Products')
                    .child(
                      S.documentTypeList('product')
                        .title('Direct Products')
                        .filter(
                          '_type == "product" && category._ref == $categoryId && !defined(subcategory)'
                        )
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'name', direction: 'asc' }])
                    ),

                  S.listItem()
                    .title('All Products In This Category')
                    .child(
                      S.documentTypeList('product')
                        .title('All Products In This Category')
                        .filter('_type == "product" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'name', direction: 'asc' }])
                    ),

                  S.listItem()
                    .title('Featured Products In This Category')
                    .child(
                      S.documentTypeList('product')
                        .title('Featured Products In This Category')
                        .filter(
                          '_type == "product" && category._ref == $categoryId && featured == true'
                        )
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'name', direction: 'asc' }])
                    ),

                  S.listItem()
                    .title('Products Missing Image In This Category')
                    .child(
                      S.documentTypeList('product')
                        .title('Products Missing Image In This Category')
                        .filter(
                          '_type == "product" && category._ref == $categoryId && !defined(image)'
                        )
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'name', direction: 'asc' }])
                    ),

                  S.listItem()
                    .title('Products Missing Packaging In This Category')
                    .child(
                      S.documentTypeList('product')
                        .title('Products Missing Packaging In This Category')
                        .filter(
                          '_type == "product" && category._ref == $categoryId && (!defined(packaging) || packaging == "")'
                        )
                        .params({ categoryId })
                        .defaultOrdering([{ field: 'name', direction: 'asc' }])
                    ),
                ])
            )
        ),

      S.divider(),

      S.listItem()
        .title('All Products')
        .child(
          S.documentTypeList('product')
            .title('All Products')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Featured Products')
        .child(
          S.documentTypeList('product')
            .title('Featured Products')
            .filter('_type == "product" && featured == true')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Products Missing Image')
        .child(
          S.documentTypeList('product')
            .title('Products Missing Image')
            .filter('_type == "product" && !defined(image)')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Products Missing Packaging')
        .child(
          S.documentTypeList('product')
            .title('Products Missing Packaging')
            .filter('_type == "product" && (!defined(packaging) || packaging == "")')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Products Missing Description')
        .child(
          S.documentTypeList('product')
            .title('Products Missing Description')
            .filter(
              '_type == "product" && (!defined(shortDescription) || shortDescription == "")'
            )
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Products Missing Category')
        .child(
          S.documentTypeList('product')
            .title('Products Missing Category')
            .filter('_type == "product" && !defined(category)')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.listItem()
        .title('Products Missing Subcategory')
        .child(
          S.documentTypeList('product')
            .title('Products Missing Subcategory')
            .filter('_type == "product" && defined(category) && !defined(subcategory)')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.divider(),

      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('blog')
            .title('Blog Posts')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      S.listItem()
        .title('Enquiries')
        .child(
          S.documentTypeList('enquiry')
            .title('Enquiries')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      S.listItem()
        .title('Recent Enquiries')
        .child(
          S.documentTypeList('enquiry')
            .title('Recent Enquiries')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id ? !HIDDEN_DOC_TYPES.includes(id) : true
      }),
    ])
import { defineField, defineType } from 'sanity'

export const servicesType = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Services',
    }),
    defineField({
      name: 'layoutVariant',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (Default)', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Cards', value: 'cards' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'services',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
            }),
            defineField({
              name: 'price',
              title: 'Starting Price (Optional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})

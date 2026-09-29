import { defineField, defineType } from 'sanity'

export const servicesType = defineType({
  name: 'servicesSection',
  title: 'My Services',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      description: 'The heading visitors see above your services (e.g. "What I Offer")',
      initialValue: 'Services',
    }),
    defineField({
      name: 'layoutVariant',
      title: 'Display Layout',
      type: 'string',
      description: 'Choose how your services are arranged on the page.',
      options: {
        list: [
          { title: '🔲 Grid — Side-by-side cards', value: 'grid' },
          { title: '📋 List — Stacked, one per row', value: 'list' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'services',
      title: 'Your Services',
      type: 'array',
      description: 'Add each service you offer. Visitors will see these on your homepage.',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          title: 'Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Name',
              type: 'string',
              description: 'e.g. "UGC Content Creation"',
              validation: (Rule) => Rule.required().error('Give this service a name.'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'A brief explanation of what this service includes.',
            }),
            defineField({
              name: 'price',
              title: 'Starting Price (optional)',
              type: 'string',
              description: 'e.g. "$200" or "Starting at $500/mo". Leave empty to hide pricing.',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'price',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled Service',
                subtitle: subtitle ? `Starting at ${subtitle}` : 'No price set',
              }
            },
          },
        },
      ],
    }),
  ],
})

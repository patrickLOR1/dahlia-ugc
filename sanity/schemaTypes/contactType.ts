import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contactSection',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Heading',
      type: 'string',
      description: 'The heading visitors see above your contact form (e.g. "Let\'s Work Together")',
      initialValue: "Let's Work Together",
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'A brief message inviting brands to reach out (e.g. "I\'m always looking for exciting new collaborations")',
    }),
    defineField({
      name: 'email',
      title: 'Your Email Address',
      type: 'string',
      description: 'This email is displayed publicly so brands can contact you directly.',
      validation: (Rule) => Rule.email().error('Please enter a valid email address.'),
    }),
    defineField({
      name: 'formLayout',
      title: 'Form Style',
      type: 'string',
      description: 'Choose how the contact form looks.',
      options: {
        list: [
          { title: '✉️ Minimal — Clean, simple form', value: 'minimal' },
          { title: '🖼️ Split — Form alongside an image', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'minimal',
    }),
  ],
})

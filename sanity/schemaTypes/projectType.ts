import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'brand',
      title: 'Brand / Client',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Beauty', value: 'beauty' },
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Travel', value: 'travel' },
          { title: 'Food', value: 'food' },
          { title: 'Fashion', value: 'fashion' },
        ],
      },
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail Image URL (Temporary)',
      type: 'url',
      description: 'Temporary URL for video thumbnail poster',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video File URL (Temporary)',
      type: 'url',
      description: 'Temporary URL for the actual video file',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
    },
  },
})

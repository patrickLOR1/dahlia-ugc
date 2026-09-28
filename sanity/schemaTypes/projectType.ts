import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

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
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Upload a thumbnail poster for the video',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      description: 'Upload the actual video file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Highlight this project on the homepage',
      initialValue: false,
    }),
    orderRankField({ type: 'project' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
    },
  },
})

import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const projectType = defineType({
  name: 'project',
  title: 'Video Project',
  type: 'document',
  groups: [
    { name: 'media', title: '📹 Media', default: true },
    { name: 'details', title: '📝 Details' },
    { name: 'advanced', title: '⚙️ Advanced' },
  ],
  fields: [
    defineField({
      name: 'video',
      title: 'Your Video',
      type: 'file',
      group: 'media',
      description: 'Upload your video here. Drag and drop or click to browse. Supports MP4, MOV, and other common formats.',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required().error('Every project needs a video — upload yours to get started!'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      description: 'This image represents your video in the portfolio. Upload a still frame or a custom poster.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Add a cover image so visitors can preview your video.'),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'details',
      description: 'A short name for this project (e.g. "Summer Beach Campaign")',
      validation: (Rule) => Rule.required().min(2).max(80).error('Give your project a name so people know what it is.'),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'advanced',
      description: 'Auto-generated from the title. You usually don\'t need to change this.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: () => true,
      },
    }),
    defineField({
      name: 'brand',
      title: 'Brand or Client',
      type: 'string',
      group: 'details',
      description: 'Who was this project for? (e.g. "Sephora", "Personal Project")',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'details',
      description: 'Helps visitors filter your portfolio by type.',
      options: {
        list: [
          { title: '💄 Beauty', value: 'beauty' },
          { title: '🌿 Lifestyle', value: 'lifestyle' },
          { title: '✈️ Travel', value: 'travel' },
          { title: '🍽️ Food', value: 'food' },
          { title: '👗 Fashion', value: 'fashion' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required().error('Pick a category so visitors can find this project.'),
    }),
    defineField({
      name: 'featured',
      title: '⭐ Featured Project',
      type: 'boolean',
      group: 'details',
      description: 'Highlight this project with a special badge. (Note: Project order is controlled by dragging and dropping in the "My Videos & Projects" list.)',
      initialValue: false,
    }),
    orderRankField({ type: 'project' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'brand',
      media: 'thumbnail',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle || 'No brand specified',
        media,
      }
    },
  },
})

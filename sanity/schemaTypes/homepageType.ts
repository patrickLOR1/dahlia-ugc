import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'My Homepage',
  type: 'document',
  groups: [
    { name: 'intro', title: '✨ Introduction', default: true },
    { name: 'hero', title: '🎬 Hero Media' },
    { name: 'portfolio', title: '📁 Portfolio Layout' },
  ],
  fields: [
    // --- Introduction Group ---
    defineField({
      name: 'heroHeadline',
      title: 'Your Name / Headline',
      type: 'string',
      group: 'intro',
      description: 'The big text visitors see first (e.g. "Dahlia Renae"). Use \\n for a line break.',
      validation: (Rule) => Rule.required().error('Add your name or headline so visitors know who you are.'),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Tagline',
      type: 'text',
      group: 'intro',
      rows: 2,
      description: 'A short description under your name (e.g. "Travel & Lifestyle Creator"). Use \\n for a line break.',
    }),

    // --- Hero Media Group ---
    defineField({
      name: 'heroVariant',
      title: 'Hero Style',
      type: 'string',
      group: 'hero',
      description: 'Choose how your homepage hero section looks.',
      options: {
        list: [
          { title: '🎬 Floating Videos — Playful video cards float beside your name', value: 'floatingVideos' },
          { title: '🔤 Giant Typography — Bold, full-screen text with minimal decoration', value: 'giantTypography' },
          { title: '📸 Editorial Portrait — Clean, magazine-style layout', value: 'editorialPortrait' },
        ],
        layout: 'radio',
      },
      initialValue: 'floatingVideos',
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero Videos & Images',
      type: 'array',
      group: 'hero',
      description: 'Upload up to 2 videos or images that appear in your hero section. These are the first thing visitors see!',
      validation: (Rule) => Rule.max(2).warning('The hero section displays up to 2 media items.'),
      of: [
        {
          type: 'object',
          name: 'heroMediaItem',
          title: 'Media Item',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Label',
              description: 'A short label shown under this media (e.g. "Travel Reel")',
            }),
            defineField({
              name: 'video',
              type: 'file',
              title: 'Video',
              description: 'Upload a short video clip. It will autoplay on loop.',
              options: { accept: 'video/*' },
            }),
            defineField({
              name: 'thumbnail',
              type: 'image',
              title: 'Poster Image',
              description: 'Shown while the video loads, or used as a standalone image.',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'thumbnail',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Media Item',
                media,
              }
            },
          },
        },
      ],
    }),

    // --- Portfolio Layout Group ---
    defineField({
      name: 'showPortfolio',
      title: 'Show Portfolio on Homepage',
      type: 'boolean',
      group: 'portfolio',
      description: 'Turn this off to temporarily hide your portfolio section.',
      initialValue: true,
    }),
    defineField({
      name: 'portfolioVariant',
      title: 'Portfolio Display Style',
      type: 'string',
      group: 'portfolio',
      description: 'Choose how your video projects are displayed.',
      options: {
        list: [
          { title: '↔️ Horizontal Reel — Drag to scroll through projects', value: 'horizontalReel' },
          { title: '🔲 Grid — Projects displayed in a magazine-style grid', value: 'editorialGrid' },
        ],
        layout: 'radio',
      },
      initialValue: 'horizontalReel',
    }),
  ],
})

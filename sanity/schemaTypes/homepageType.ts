import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroVariant',
      title: 'Hero Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Floating Videos (Default)', value: 'floatingVideos' },
          { title: 'Giant Typography', value: 'giantTypography' },
          { title: 'Editorial Portrait', value: 'editorialPortrait' },
        ],
      },
      initialValue: 'floatingVideos',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'showPortfolio',
      title: 'Show Portfolio Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'portfolioVariant',
      title: 'Portfolio Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal Reel (Default)', value: 'horizontalReel' },
          { title: 'Editorial Grid', value: 'editorialGrid' },
        ],
      },
      initialValue: 'horizontalReel',
    }),
  ],
})

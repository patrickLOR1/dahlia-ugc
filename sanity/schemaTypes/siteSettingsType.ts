import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'theme',
      title: 'Theme Preset',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial (Default)', value: 'editorial' },
          { title: 'Scrapbook', value: 'scrapbook' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'editorial',
    }),
    defineField({
      name: 'animationIntensity',
      title: 'Animation Intensity',
      type: 'string',
      options: {
        list: [
          { title: 'Subtle', value: 'subtle' },
          { title: 'Balanced (Default)', value: 'balanced' },
          { title: 'Expressive', value: 'expressive' },
        ],
      },
      initialValue: 'balanced',
    }),
  ],
})

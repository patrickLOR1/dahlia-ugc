import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website Appearance',
  type: 'document',
  groups: [
    { name: 'theme', title: '🎨 Theme', default: true },
    { name: 'animations', title: '✨ Animations' },
    { name: 'branding', title: '📛 Branding' },
  ],
  fields: [
    defineField({
      name: 'theme',
      title: 'Website Theme',
      type: 'string',
      group: 'theme',
      description: 'Choose the overall look and feel of your website. Each theme changes colors, fonts, and mood.',
      options: {
        list: [
          { title: '📰 Editorial — Warm tones, elegant serif fonts, magazine-inspired', value: 'editorial' },
          { title: '📒 Scrapbook — Earthy textures, handcrafted feel, bold accent colors', value: 'scrapbook' },
          { title: '⬜ Minimal — Clean black & white, modern sans-serif, no distractions', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'editorial',
    }),
    defineField({
      name: 'animationIntensity',
      title: 'Animation Style',
      type: 'string',
      group: 'animations',
      description: 'Control how much animation your website uses.',
      options: {
        list: [
          { title: '🌊 Subtle — Gentle fade-ins, minimal movement', value: 'subtle' },
          { title: '⚖️ Balanced — Smooth animations without being distracting', value: 'balanced' },
          { title: '🎆 Expressive — Bold, dynamic animations everywhere', value: 'expressive' },
        ],
        layout: 'radio',
      },
      initialValue: 'balanced',
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'branding',
      description: 'Your website name (used for browser tabs and SEO).',
    }),
  ],
})

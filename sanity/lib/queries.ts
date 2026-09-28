import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    ...,
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    ...,
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    brand,
    category,
    thumbnailUrl,
    videoUrl,
    featured
  }
`

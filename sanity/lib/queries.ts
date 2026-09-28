import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    ...,
    heroMedia[]{
      title,
      "videoUrl": video.asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    ...,
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(orderRank) {
    _id,
    title,
    brand,
    category,
    "thumbnailUrl": thumbnail.asset->url,
    "videoUrl": video.asset->url,
    featured
  }
`

export const servicesQuery = groq`
  *[_type == "servicesSection"][0] {
    ...,
  }
`

export const contactQuery = groq`
  *[_type == "contactSection"][0] {
    ...,
  }
`

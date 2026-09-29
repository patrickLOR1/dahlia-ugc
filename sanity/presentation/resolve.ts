import type { PresentationPluginOptions } from 'sanity/presentation'
import type { DocumentLocationsState } from 'sanity/presentation'

// Maps document types to the pages where their content appears
const locations: Record<string, DocumentLocationsState> = {
  homepage: {
    locations: [{ title: 'Homepage', href: '/' }],
  },
  siteSettings: {
    locations: [{ title: 'Homepage', href: '/' }],
  },
  servicesSection: {
    locations: [{ title: 'Homepage — Services', href: '/' }],
  },
  contactSection: {
    locations: [{ title: 'Homepage — Contact', href: '/' }],
  },
  project: {
    locations: [{ title: 'Homepage — Portfolio', href: '/' }],
  },
}

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: [
    {
      route: '/',
      filter: '_type == "homepage"',
    },
  ],
  locations,
}

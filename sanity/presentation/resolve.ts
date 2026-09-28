import { type PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: [
    {
      route: '/',
      filter: '_type == "homepage"',
    },
  ],
}

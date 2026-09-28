import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Our singleton type has a list item with a custom child
      S.listItem()
        .title('Homepage Settings')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Services Section')
        .id('servicesSection')
        .child(
          S.document()
            .schemaType('servicesSection')
            .documentId('servicesSection')
        ),
      S.listItem()
        .title('Contact Section')
        .id('contactSection')
        .child(
          S.document()
            .schemaType('contactSection')
            .documentId('contactSection')
        ),
      // Minimum required configuration for orderable projects
      orderableDocumentListDeskItem({type: 'project', S, context}),
    ])

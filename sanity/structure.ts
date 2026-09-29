import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Dahlia Studio')
    .items([
      // --- Primary editing workflows ---
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'My Videos & Projects',
        icon: () => '📹',
        S,
        context,
      }),
      S.divider(),

      // --- Page content ---
      S.listItem()
        .title('Edit My Homepage')
        .id('homepage')
        .icon(() => '🏠')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Edit My Homepage')
        ),

      S.listItem()
        .title('Services')
        .id('servicesSection')
        .icon(() => '💼')
        .child(
          S.document()
            .schemaType('servicesSection')
            .documentId('servicesSection')
            .title('My Services')
        ),

      S.listItem()
        .title('Contact Information')
        .id('contactSection')
        .icon(() => '📬')
        .child(
          S.document()
            .schemaType('contactSection')
            .documentId('contactSection')
            .title('Contact Information')
        ),

      S.divider(),

      // --- Site-wide settings ---
      S.listItem()
        .title('Website Appearance')
        .id('siteSettings')
        .icon(() => '🎨')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Website Appearance')
        ),
    ])

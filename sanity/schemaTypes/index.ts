import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { siteSettingsType } from './siteSettingsType'
import { homepageType } from './homepageType'
import { servicesType } from './servicesType'
import { contactType } from './contactType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, siteSettingsType, homepageType, servicesType, contactType],
}

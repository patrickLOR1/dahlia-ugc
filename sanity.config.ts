import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schema } from './sanity/schemaTypes'
import { dataset, projectId } from './sanity/env'
import { resolve } from './sanity/presentation/resolve'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Dahlia Studio',
  schema,
  plugins: [
    structureTool({
      structure,
      title: 'Edit Content',
    }),
    presentationTool({
      resolve,
      title: 'Preview Website',
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
})

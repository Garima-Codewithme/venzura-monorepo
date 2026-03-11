import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Venzura-Medcor',
  projectId: 'ioszmhmf',
  dataset: 'production',

  plugins: [structureTool()],

  releases: {
    enabled: false,
  },

  schema: {
    types: schemaTypes,
  },
})
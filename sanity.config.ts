import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './lib/sanity/schemas'

const projectId = 'id5e9a8v'
const dataset = 'production'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})

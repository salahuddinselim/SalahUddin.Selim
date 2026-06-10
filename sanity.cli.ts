import { defineCliConfig } from 'sanity/cli'

const projectId = 'id5e9a8v'
const dataset = 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'salahuddin-portfolio',
  deployment: { autoUpdates: true },
})

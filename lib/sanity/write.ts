import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const VISITOR_DOC_ID = 'visitorStats'

export interface CountryStat {
  name: string
  code: string
  flag: string
  count: number
}

export interface DeviceStat {
  name: string
  count: number
}

export interface MonthlyStat {
  month: string
  views: number
}

export interface VisitorStats {
  totalViews: number
  thisMonthViews: number
  thisMonth: string
  countries: CountryStat[]
  devices: DeviceStat[]
  monthlyHistory: MonthlyStat[]
  lastUpdated: string
}

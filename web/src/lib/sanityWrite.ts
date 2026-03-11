import { createClient } from 'next-sanity'

export const sanityWriteClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || '2026-03-06',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})
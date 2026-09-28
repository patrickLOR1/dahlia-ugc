import 'server-only'

import { draftMode } from 'next/headers'
import { client } from './client'
import { type QueryParams } from 'next-sanity'

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}) {
  const draft = await draftMode()
  const isDraftMode = draft.isEnabled

  return client.fetch<QueryResponse>(query, params, {
    cache: isDraftMode ? 'no-cache' : 'force-cache',
    ...(isDraftMode && {
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
      stega: true,
    }),
    next: {
      revalidate: isDraftMode ? 0 : 60,
      tags,
    },
  })
}

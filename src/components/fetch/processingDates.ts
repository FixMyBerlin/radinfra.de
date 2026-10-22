import { z } from 'astro/zod'
import { tildaApiTimeoutMs, tildaApiUrl } from './tildaApiUrl.const'

const DatesSchema = z.object({
  osm_data_from: z.coerce.date(),
})

export const processingDates = async () => {
  // Fetch data from the API
  const apiUrl = `${tildaApiUrl}/processing-dates`
  const response = await fetch(apiUrl, { signal: AbortSignal.timeout(tildaApiTimeoutMs) })
  if (!response.ok) {
    throw new Error(`ERROR fetching ${apiUrl}: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()

  return DatesSchema.parse(data)
}

import { z } from 'astro/zod'
import { tildaApiUrl } from './tildaApiUrl.const'

const DatesSchema = z.object({
  processed_at: z.coerce.date(),
  osm_data_from: z.coerce.date(),
})

export const processingDates = async () => {
  // Fetch data from the API
  const response = await fetch(`${tildaApiUrl}/processing-dates`)
  const data = await response.json()

  return DatesSchema.parse(data)
}

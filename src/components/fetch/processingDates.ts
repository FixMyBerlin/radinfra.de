import { z } from 'astro:content'
import { radverkehrsatlasApiUrl } from './radverkehrsatlasApiUrl.const'

const DatesSchema = z.object({
  processed_at: z.coerce.date(),
  osm_data_from: z.coerce.date(),
})

export const processingDates = async () => {
  // Fetch data from the API
  const response = await fetch(`${radverkehrsatlasApiUrl}/processing-dates`)
  const data = await response.json()

  return DatesSchema.parse(data)
}

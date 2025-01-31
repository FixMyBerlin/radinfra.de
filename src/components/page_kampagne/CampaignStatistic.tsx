import { linkStyles } from '@components/Link/Link'
import { queryClient } from '@components/store/tanstackQuery'
import { useQuery } from '@tanstack/react-query'
import { z } from 'astro/zod'
import { twJoin } from 'tailwind-merge'

const statisticSchema = z.object({
  total: z.number(),
  available: z.number(),
  fixed: z.number(),
  falsePositive: z.number(),
  skipped: z.number(),
  deleted: z.number(),
  alreadyFixed: z.number(),
  tooHard: z.number(),
  answered: z.number(),
  validated: z.number(),
  disabled: z.number(),
  avgTimeSpent: z.number(),
  tasksWithTime: z.number(),
})

const getChallengeStatistic = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()

  const parsed = statisticSchema.safeParse(json)
  if (parsed.success === false) {
    console.error('ERROR parsing response', json, parsed)
    return []
  }
  return parsed.data
}

type Props = { challengeId: number }

export const CampaignStatistic = ({ challengeId }: Props) => {
  const url = `http://127.0.0.1:5173/api/maproulette/statistics/${challengeId}`

  const {
    data: statistic,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['statistic', challengeId],
      queryFn: () => getChallengeStatistic(url),
    },
    queryClient,
  )

  return (
    <>
      {isLoading && <p>Lade Statistik …</p>}
      {error && <p>Fehler beim Laden des Statistics</p>}

      <details className="text-xs">
        <summary className={twJoin('cursor-pointer font-bold', linkStyles)}>Source</summary>
        Proxied MapRoulette API:{' '}
        <a href={url} target="_blank">
          <code>{url}</code>
        </a>
        <pre>{JSON.stringify(statistic, undefined, 2)}</pre>
      </details>
    </>
  )
}

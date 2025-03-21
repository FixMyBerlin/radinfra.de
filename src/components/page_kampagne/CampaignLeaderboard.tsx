import { linkStyles } from '@components/links/styles'
import { queryClient } from '@components/store/tanstackQuery'
import { BugAntIcon } from '@heroicons/react/20/solid'
import { useQuery } from '@tanstack/react-query'
import { z } from 'astro/zod'
import { twJoin } from 'tailwind-merge'
import { maprouletteProjectId } from './maprouletteProjectId.const'

const leaderboardSchema = z.array(
  z.object({
    userId: z.number(),
    name: z.string(),
    avatarURL: z.string().optional(),
    score: z.number(),
    rank: z.number(),
    created: z.string().datetime(),
    topChallenges: z.array(z.any()),
  }),
)

const getProjectLeaderboard = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()

  const parsed = leaderboardSchema.safeParse(json)
  if (parsed.success === false) {
    console.error('ERROR parsing response', json, parsed)
    return []
  }
  return parsed.data.toSorted((a, b) => a.rank - b.rank)
}

type Props = { challengeId?: number }
export const CampaignLeaderboard = ({ challengeId }: Props) => {
  // https://maproulette.org/docs/swagger-ui/index.html#/Leaderboard/getChallengeLeaderboard
  const month = 6
  const url = challengeId
    ? `https://maproulette.org/api/v2/data/user/challengeLeaderboard?challengeId=${challengeId}&monthDuration=${month}&limit=10&offset=0`
    : `https://maproulette.org/api/v2/data/user/projectLeaderboard?projectId=${maprouletteProjectId}&monthDuration=${month}&limit=10&offset=0`

  const {
    data: leaderboard,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['leaderboard', maprouletteProjectId, challengeId],
      queryFn: () => getProjectLeaderboard(url),
    },
    queryClient,
  )

  return (
    <>
      <h2>{challengeId ? 'Leaderboard' : 'Leaderboard aller Kampagnen'}</h2>
      <p className="text-xs">
        Die Top 10 Mapper:innen aus MapRoulette der letzten {month} Monate. Änderungen außerhalb von
        MapRoulette werden leider nicht gezählt.
      </p>

      <div className="mt-5">
        {isLoading && <p>Lade Daten …</p>}
        {error && <p>Fehler beim Laden des Leaderboards.</p>}
        {leaderboard?.length === 0 && <p>Das Leaderboard ist noch leer.</p>}

        {leaderboard?.map((entry) => (
          <p key={entry.userId} className="inline-block pt-2 pr-4">
            <span className="font-base mr-1.5 inline-flex size-6 items-center justify-center rounded-full bg-amber-300 font-medium tracking-tighter text-teal-900">
              {entry.rank}
            </span>{' '}
            <a href={`https://www.openstreetmap.org/user/${entry.name}/history`} target="_blank">
              {entry.name}
            </a>
          </p>
        ))}
      </div>

      <details className="-mt-4 text-xs text-gray-400 open:mt-0">
        <summary
          className={twJoin(
            'cursor-pointer list-none text-right font-bold',
            linkStyles,
            'text-gray-400',
          )}
        >
          <BugAntIcon className="inline-block size-4 text-gray-400" />
        </summary>
        MapRoulette API:{' '}
        <a href={url} target="_blank">
          <code>{url}</code>
        </a>
        <pre>{JSON.stringify(leaderboard, undefined, 2)}</pre>
      </details>
    </>
  )
}

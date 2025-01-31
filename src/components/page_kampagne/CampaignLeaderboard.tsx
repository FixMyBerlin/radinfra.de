import { linkStyles } from '@components/Link/Link'
import { queryClient } from '@components/store/tanstackQuery'
import { useQuery } from '@tanstack/react-query'
import { z } from 'astro/zod'
import { maprouletteProjectId } from 'scripts/maproulette/maprouletteProjectId.const'
import { twJoin } from 'tailwind-merge'

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

// NOTE: There is also a API endpoint per Challenge
// https://maproulette.org/docs/swagger-ui/index.html#/Leaderboard/getChallengeLeaderboard
// const url = `https://maproulette.org/api/v2/data/user/challengeLeaderboard?challengeId=${challengeId}&monthDuration=6&limit=20&offset=0`
const url = `https://maproulette.org/api/v2/data/user/projectLeaderboard?projectId=${maprouletteProjectId}&monthDuration=3&limit=10&offset=0`

const getProjectLeaderboard = async () => {
  const response = await fetch(url)
  const json = await response.json()

  const parsed = leaderboardSchema.safeParse(json)
  if (parsed.success === false) {
    console.error('ERROR parsing response', json, parsed)
    return []
  }
  return parsed.data.toSorted((a, b) => a.rank - b.rank)
}

export const CampaignLeaderboard = () => {
  const {
    data: leaderboard,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['leaderboard', maprouletteProjectId],
      queryFn: getProjectLeaderboard,
    },
    queryClient,
  )

  return (
    <>
      <h2>Leaderboard aller Kampagnen</h2>
      <p>
        Top 10 Mapper:innen in MapRoulette. Änderungen außerhalb von MapRoulette werden leider nicht
        gezählt.
      </p>

      {isLoading && <p>Lade Daten …</p>}
      {error && <p>Fehler beim Laden des Leaderboards</p>}

      <div className="my-5 flex flex-col gap-2">
        {leaderboard?.map((entry) => (
          <p key={entry.userId}>
            <span className="font-base mr-2 inline-flex size-6 items-center justify-center rounded-full bg-pink-100 font-medium tracking-tighter text-pink-800">
              {entry.rank}
            </span>{' '}
            <a href={`https://www.openstreetmap.org/user/${entry.name}/history`} target="_blank">
              {entry.name}
            </a>
          </p>
        ))}
      </div>

      <details className="text-xs">
        <summary className={twJoin('cursor-pointer font-bold', linkStyles)}>Source</summary>
        MapRoulette API:{' '}
        <a href={url} target="_blank">
          <code>{url}</code>
        </a>
        <pre>{JSON.stringify(leaderboard, undefined, 2)}</pre>
      </details>
    </>
  )
}

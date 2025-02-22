import { queryClient } from '@components/store/tanstackQuery'
import { useQuery } from '@tanstack/react-query'
import { z } from 'astro/zod'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { maprouletteProjectId } from './maprouletteProjectId.const'

const progressSchema = z.object({
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

const getProxiedProgress = async (url: string) => {
  const response = await fetch(url)
  const json = await response.json()

  const parsed = progressSchema.safeParse(json)
  if (parsed.success === false) {
    console.error('ERROR parsing response', json, parsed)
    return undefined
  }
  return parsed.data
}

type Props = { challengeId: number }
export const CampaignProgress = ({ challengeId }: Props) => {
  const [view, setView] = useState<'simple' | 'detailed'>('simple')

  const url = `https://radverkehrsatlas.de/api/maproulette/statistic-proxy/${challengeId}`
  const {
    data: progress,
    error,
    isLoading,
  } = useQuery(
    {
      queryKey: ['progress', maprouletteProjectId],
      queryFn: () => getProxiedProgress(url),
    },
    queryClient,
  )

  const total = progress?.total

  const done =
    (progress?.fixed ?? 0) +
    (progress?.alreadyFixed ?? 0) +
    (progress?.falsePositive ?? 0) +
    (progress?.skipped ?? 0) +
    (progress?.tooHard ?? 0)
  const progressData = {
    simple: [
      {
        label: 'Erledigt',
        value: done ?? 0,
        bgColorClass: 'bg-teal-600',
        textColorClass: 'text-teal-50',
      },
      {
        label: 'Offen',
        value: progress?.available ?? 0,
        bgColorClass: 'bg-teal-950',
        textColorClass: 'text-teal-50',
      },
    ],
    detailed: [
      {
        label: 'Behoben',
        value: progress?.fixed ?? 0,
        bgColorClass: 'bg-teal-600',
        textColorClass: 'text-teal-50',
      },
      {
        label: 'Bereits behoben',
        value: progress?.alreadyFixed ?? 0,
        bgColorClass: 'bg-blue-500',
        textColorClass: 'text-blue-50',
      },
      {
        label: 'Kein Fehler',
        value: progress?.falsePositive ?? 0,
        bgColorClass: 'bg-yellow-500',
        textColorClass: 'text-yellow-950',
      },
      {
        label: 'Übersprungen',
        value: progress?.skipped ?? 0,
        bgColorClass: 'bg-orange-500',
        textColorClass: 'text-orange-950',
      },
      {
        label: 'Zu schwierig',
        value: progress?.tooHard ?? 0,
        bgColorClass: 'bg-red-500',
        textColorClass: 'text-red-50',
      },
      {
        label: 'Offen',
        value: progress?.available ?? 0,
        bgColorClass: 'bg-teal-950',
        textColorClass: 'text-teal-50',
      },
    ],
  }

  return (
    <figure
      className="not-prose leading-snug"
      onClick={() => {
        view === 'simple' ? setView('detailed') : setView('simple')
      }}
    >
      <figcaption className="sr-only">Kampagnenfortschritt</figcaption>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3 text-xs">
          {(isLoading || error) && (
            <div className="min-h-5">
              {isLoading && <p>Kampagnenfortschritt: Lade Daten …</p>}
              {error && <p>Kampagnenfortschritt: Fehler beim Laden der Daten</p>}
            </div>
          )}
          {progressData[view].map(({ label, value, bgColorClass, textColorClass }) => {
            if (!total) return null
            return (
              <p
                key={label}
                className="flex items-center justify-center gap-1"
                aria-hidden={true}
                aria-label={`${label}: ${value.toLocaleString('de-DE')} Aufgaben`}
              >
                {/* <div
                  className={twJoin('size-1.5 rounded-full', bgColorClass)}
                /> */}
                <span
                  className={twJoin(
                    'flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold tracking-tighter',
                    textColorClass,
                    bgColorClass,
                  )}
                >
                  {value.toLocaleString('de-DE')}
                </span>
                {label}
              </p>
            )
          })}
        </div>
        <div className="w-full rounded-sm bg-teal-700">
          <div className="flex h-5 w-full shrink justify-start overflow-clip rounded-sm">
            {progressData[view].map(({ label, value, bgColorClass }) => {
              if (!total) return null
              const relativeWidth = (value / total) * 100
              return (
                <div
                  key={label}
                  style={{ width: `max(0px, ${relativeWidth}%)` }}
                  className={twJoin('h-5 first:min-w-0.5', bgColorClass)}
                  aria-label={`${label}: ${value} %`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </figure>
  )
}

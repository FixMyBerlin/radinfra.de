import { radverkehrsatlasApiUrl } from '@components/fetch/radverkehrsatlasApiUrl.const'
import { ApiStatisticsSchema } from 'cms/statisticsSchema'
import { bikelaneSums } from './utils/bikelane_sum'
import { roadSums } from './utils/road_sum'

async function main() {
  const url = `${radverkehrsatlasApiUrl}/stats`
  console.log('  FETCHING', url)
  const raw = await fetch(url)

  console.log('  TRANSFORMING')
  const json = await raw.json()
  const parsed = ApiStatisticsSchema.parse(json)

  parsed.features.forEach((f) => {
    // @ts-expect-error we expand the type here
    f.properties.road_sum =
      // (but this method should not be ts-ignored)
      roadSums(f.properties.road_length)
    // @ts-expect-error we expand the type here
    f.properties.bikelane_sum =
      // (but this method should not be ts-ignored)
      bikelaneSums(f.properties.bikelane_length)
  })

  const resultLines: string[] = []
  parsed.features
    .sort((f1, f2) => f1.id.localeCompare(f2.id))
    .forEach((f) => resultLines.push(`  ${JSON.stringify(f, undefined, 0)}`))
  const result = `[\n${resultLines.join(',\n')}\n]`

  const file = './src/content/statistics/index.json'
  console.log('  WRITING', file)
  Bun.write(file, result)
  console.log('  DONE')
}

console.log('STARTING statistic/process')
main()

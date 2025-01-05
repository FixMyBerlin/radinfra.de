import { radverkehrsatlasApiUrl } from '@components/fetch/radverkehrsatlasApiUrl.const'
import { AstroStatisticsSchema } from 'cms/statisticsSchema'

async function main() {
  const url = `${radverkehrsatlasApiUrl}/stats`
  console.log('  FETCHING', url)
  const raw = await fetch(url)

  console.log('  TRANSFORMING')
  const json = await raw.json()
  const parsed = AstroStatisticsSchema.parse(json)
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

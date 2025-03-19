import { tildaStatisticsApiUrl } from '@components/fetch/tildaApiUrl.const'
import { addProperties } from 'cms/statistics/addProperties'
import { ApiStatisticsSchema } from 'cms/statisticsSchema'

async function main() {
  const apiUrl = tildaStatisticsApiUrl
  console.log('  FETCHING', apiUrl)
  const raw = await fetch(apiUrl)

  console.log('  TRANSFORMING')
  const json = await raw.json()
  const parsed = ApiStatisticsSchema.parse(json)

  const features = await addProperties(parsed.features)

  const resultLines: string[] = []
  features
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

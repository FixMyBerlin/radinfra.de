export const prerender = true
//
import { getStatistics } from '@components/page_statistik/utils/getStatistics'

// Docs https://docs.astro.build/en/guides/endpoints/

export async function GET() {
  const statistics = await getStatistics({})

  const flattenProperties = (prefix: string, obj: Record<string, number | undefined>) => {
    const flatObj: Record<string, number | undefined> = {}
    Object.entries(obj).forEach(([key, value]) => {
      flatObj[`${prefix}_${key}`] = value
    })
    return flatObj
  }

  const ensureSameProperties = (data: Record<string, number | undefined | any>[]) => {
    const allKeys = new Set<string>()
    data.forEach((item) => Object.keys(item).forEach((key) => allKeys.add(key)))
    const sortedKeys = Array.from(allKeys).sort((a, b) => a.localeCompare(b))

    return data.map((item) => {
      const newItem: Record<string, string> = {}
      sortedKeys.forEach((key) => {
        newItem[key] = item[key] !== undefined ? String(item[key]) : ''
      })
      return newItem
    })
  }

  const csvData = statistics.map(({ data: { properties } }) => {
    const { slug: _, road_length, bikelane_length, road_sum, bikelane_sum, ...rest } = properties
    const flat_road_length = flattenProperties('road_length', road_length)
    const flat_bikelane_length = bikelane_length
      ? flattenProperties('bikelane_length', bikelane_length)
      : {}
    const flat_road_sum = flattenProperties('road_sum', road_sum)
    const flat_bikelane_sum = flattenProperties('bikelane_sum', bikelane_sum)
    return {
      ...rest,
      ...flat_road_length,
      ...flat_bikelane_length,
      ...flat_road_sum,
      ...flat_bikelane_sum,
    }
  })

  const normalizedCsvData = ensureSameProperties(csvData)

  const escapeCsvValue = (value: any) => {
    if (value === null || value === undefined) {
      return ''
    }
    const stringValue = String(value).replace(/"/g, '""')
    return `"${stringValue}"`
  }

  const csvHeader = Object.keys(normalizedCsvData[0]!)

  const csvRows = normalizedCsvData.map((row) => {
    return csvHeader.map((key) => escapeCsvValue(row[key])).join(';')
  })

  const csvString = [csvHeader.join(';'), ...csvRows].join('\n')

  return new Response(csvString, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="radinfra-statistics.csv"',
    },
  })
}

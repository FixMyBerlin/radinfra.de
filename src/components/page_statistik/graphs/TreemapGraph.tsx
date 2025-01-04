// Example from https://airbnb.io/visx/treemap
// TODO: Does not show the data, yet

import { Group } from '@visx/group'
import {
  Treemap,
  hierarchy,
  stratify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
} from '@visx/hierarchy'
import { type TileMethod } from '@visx/hierarchy/lib/types'
import { scaleLinear } from '@visx/scale'
import type { InferEntrySchema } from 'astro:content'
import { useState } from 'react'

type Props = {
  rawData: InferEntrySchema<'statistics'>[]
  width: number
  height: number
}

export const TreemapGraph = ({ rawData, width, height }: Props) => {
  const margin = { top: 10, left: 10, right: 10, bottom: 10 }

  type PreparedData = {
    id: string
    parent: string | null
    size: number | null
  }
  const sumsBikelane = new Map<string, number>([])
  const sumsRoads = new Map<string, number>([])
  rawData.forEach((data) => {
    Object.entries(data.properties.bikelane_length || {}).forEach(([key, value]) => {
      sumsBikelane.set(key, (sumsBikelane.get(key) || 0) + value)
    })
    Object.entries(data.properties.road_length || {}).forEach(([key, value]) => {
      sumsRoads.set(key, (sumsRoads.get(key) || 0) + value)
    })
  })
  const preparedData: PreparedData[] = [
    { id: 'total', parent: null, size: 0 },
    { id: 'roads', parent: 'total', size: null },
    { id: 'bikelanes', parent: 'total', size: null },
    ...Array.from(sumsBikelane).map(([key, value]) => {
      return { id: key, parent: 'bikelanes', size: value }
    }),
    ...Array.from(sumsRoads).map(([key, value]) => {
      return { id: key, parent: 'roads', size: value }
    }),
  ]
  console.log('DEBUGGING', { preparedData, rawData })

  const color1 = '#f3e9d2'
  const color2 = '#4281a4'
  const background = '#114b5f'

  const colorScale = scaleLinear<string>({
    domain: [0, Math.max(...preparedData.map((d) => d.size ?? 0))],
    range: [color2, color1],
  })

  const data = stratify<PreparedData>()
    .id((d) => d.id)
    .parentId((d) => d.parent)(preparedData)
    .sum((d) => d.size ?? 0)

  const tileMethods: { [tile: string]: TileMethod<typeof data> } = {
    treemapSquarify,
    treemapBinary,
    treemapDice,
    treemapResquarify,
    treemapSlice,
    treemapSliceDice,
  }

  const [tileMethod, setTileMethod] = useState<string>('treemapSquarify')
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0))

  return width < 10 ? null : (
    <>
      <label>tile method</label>{' '}
      <select
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setTileMethod(e.target.value)}
        value={tileMethod}
      >
        {Object.keys(tileMethods).map((tile) => (
          <option key={tile} value={tile}>
            {tile}
          </option>
        ))}
      </select>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <rect width={width} height={height} rx={14} fill={background} />
        <Treemap<typeof data>
          top={margin.top}
          root={root}
          size={[xMax, yMax]}
          tile={tileMethods[tileMethod]!}
          round
        >
          {(treemap) => (
            <Group>
              {treemap
                .descendants()
                .reverse()
                .map((node, i) => {
                  const nodeWidth = node.x1 - node.x0
                  const nodeHeight = node.y1 - node.y0
                  return (
                    <Group
                      key={`node-${i}`}
                      top={node.y0 + margin.top}
                      left={node.x0 + margin.left}
                    >
                      {node.depth === 1 && (
                        <rect
                          width={nodeWidth}
                          height={nodeHeight}
                          stroke={background}
                          strokeWidth={4}
                          fill="transparent"
                        />
                      )}
                      {node.depth > 2 && (
                        <rect
                          width={nodeWidth}
                          height={nodeHeight}
                          stroke={background}
                          fill={colorScale(node.value || 0)}
                        />
                      )}
                    </Group>
                  )
                })}
            </Group>
          )}
        </Treemap>
      </svg>
    </>
  )
}

// Example from https://airbnb.io/visx/radial-bars

import { GradientLightgreenGreen } from '@visx/gradient'
import { Group } from '@visx/group'
import { scaleBand, scaleRadial } from '@visx/scale'
import { Arc } from '@visx/shape'
import { Text } from '@visx/text'
import { Fragment, useMemo } from 'react'

type Data = { label: string; value: number; title: string }

const getLabelFrequency = (d: Data) => Number(d.value) * 100
const toDegrees = (x: number) => (x * 180) / Math.PI

const barColor = '#93F9B9'
const margin = { top: 20, bottom: 20, left: 20, right: 20 }

export type RadialBarsProps = {
  data: Data[]
  width: number
  height: number
  showControls?: boolean
}

export const RadialBars = ({ data, width, height }: RadialBarsProps) => {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  const radiusMax = Math.min(xMax, yMax) / 2

  const innerRadius = radiusMax / 3

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, 2 * Math.PI],
        domain: data.sort((a, b) => a.title.localeCompare(b.title)).map((d) => d.label),
        padding: 0.15,
      }),
    [],
  )

  const yScale = useMemo(
    () =>
      scaleRadial<number>({
        range: [innerRadius, radiusMax],
        domain: [0, Math.max(...data.map(getLabelFrequency))],
      }),
    [innerRadius, radiusMax],
  )

  if (width < 10) return null

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <GradientLightgreenGreen id="radial-bars-green" />
      <rect width={width} height={height} fill="url(#radial-bars-green)" rx={14} />
      <Group top={yMax / 2 + margin.top} left={xMax / 2 + margin.left}>
        {data.map((d) => {
          const startAngle = xScale(d.label)!
          const midAngle = startAngle + xScale.bandwidth() / 2
          const endAngle = startAngle + xScale.bandwidth()

          const outerRadius = yScale(getLabelFrequency(d)) ?? 0

          // convert polar coordinates to cartesian for drawing labels
          const textRadius = outerRadius + 4
          const textX = textRadius * Math.cos(midAngle - Math.PI / 2)
          const textY = textRadius * Math.sin(midAngle - Math.PI / 2)

          return (
            <Fragment key={`bar-text-${d.title}`}>
              <Arc
                key={`bar-${d.title}`}
                cornerRadius={4}
                startAngle={startAngle}
                endAngle={endAngle}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill={barColor}
              />
              <Text
                x={textX}
                y={textY}
                dominantBaseline="end"
                textAnchor="middle"
                fontSize={16}
                fontWeight="bold"
                fill={barColor}
                angle={toDegrees(midAngle)}
              >
                {d.label}
              </Text>
            </Fragment>
          )
        })}
      </Group>
    </svg>
  )
}

// @ts-nocheck

// Demo from https://airbnb.io/visx/sankey
// IDEA: Could be used to visualize how the data for germany splits up
// 1. Lane: Bike vs. Car Roads
// 2. Lane: Infra Categories (Protected, Unprotected – Autobahn, Nebenstraße)
// 3. Lane: Infra Kind (Details)

import { localPoint } from '@visx/event'
import { Group } from '@visx/group'
import {
  Sankey,
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  type SankeyNode,
  sankeyRight,
} from '@visx/sankey'
import { BarRounded, LinkHorizontal } from '@visx/shape'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { ASTRO_ENV } from 'astro:env/client'
import { useState } from 'react'

export const background = '#84dccf'
export const color = '#392f5a'

type NodeDatum = { name: string }
type LinkDatum = {}

const nodeAlignments = {
  sankeyCenter,
  sankeyJustify,
  sankeyLeft,
  sankeyRight,
} as const

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 }

type Props = {
  data: any // TODO see below
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

const showControls = ASTRO_ENV === 'development'

export const SankeyGraph = ({ data, width, height, margin = defaultMargin }: Props) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip()
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const [nodeAlignment, setTileMethod] = useState<keyof typeof nodeAlignments>('sankeyCenter')
  const [nodePadding, setNodePadding] = useState(10)
  const [nodeWidth, setNodeWidth] = useState(10)

  if (width < 10) return null

  return (
    <div>
      <style>{`
        .visx-sankey-link:hover {
          stroke-opacity: 0.7;
        }
        .visx-sankey-node:hover {
          filter: brightness(1.3);
        }
        .visx-sankey-demo-container {
          background: ${background};
          padding: ${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px;
          border-radius: 5px;
          position: relative;
        }
        .visx-sankey-demo-controls {
          font-size: 12px;
        }
      `}</style>
      {showControls && (
        <div className="visx-sankey-demo-controls">
          <label>
            node alignment{' '}
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setTileMethod(e.target.value as keyof typeof nodeAlignments)}
              value={nodeAlignment}
            >
              {Object.keys(nodeAlignments).map((alignment) => (
                <option key={alignment} value={alignment}>
                  {alignment}
                </option>
              ))}
            </select>
          </label>{' '}
          <label>
            node padding{' '}
            <input
              type="number"
              value={nodePadding}
              onChange={(e) => setNodePadding(Number(e.target.value))}
            />
          </label>{' '}
          <label>
            node width{' '}
            <input
              type="number"
              value={nodeWidth}
              onChange={(e) => setNodeWidth(Number(e.target.value))}
            />
          </label>
        </div>
      )}
      <div className="visx-sankey-demo-container">
        <svg width={xMax} height={yMax}>
          <Sankey<NodeDatum, LinkDatum>
            root={data}
            nodeWidth={nodeWidth}
            size={[xMax, yMax]}
            nodePadding={nodePadding}
            nodeAlign={nodeAlignments[nodeAlignment]}
          >
            {({ graph, createPath }) => (
              <>
                <Group>
                  {graph.links.map((link, i) => (
                    <LinkHorizontal
                      key={i}
                      className="visx-sankey-link"
                      data={link}
                      path={createPath}
                      fill="transparent"
                      stroke={color}
                      strokeWidth={link.width}
                      strokeOpacity={0.5}
                      onPointerMove={(event) => {
                        const coords = localPoint(
                          (event.target as SVGElement).ownerSVGElement,
                          event,
                        )
                        showTooltip({
                          tooltipData: `${
                            (link.source as SankeyNode<NodeDatum, LinkDatum>).name
                          } > ${(link.target as SankeyNode<NodeDatum, LinkDatum>).name} = ${
                            link.value
                          }`,
                          tooltipTop: (coords?.y ?? 0) + 10,
                          tooltipLeft: (coords?.x ?? 0) + 10,
                        })
                      }}
                      onMouseOut={hideTooltip}
                    />
                  ))}
                </Group>
                <Group>
                  {graph.nodes.map(({ y0, y1, x0, x1, name }, i) => (
                    <BarRounded
                      key={i}
                      className="visx-sankey-node"
                      width={x1 - x0}
                      height={y1 - y0}
                      x={x0}
                      y={y0}
                      radius={3}
                      all
                      fill={color}
                      onPointerMove={(event) => {
                        const coords = localPoint(
                          (event.target as SVGElement).ownerSVGElement,
                          event,
                        )
                        showTooltip({
                          tooltipData: name,
                          tooltipTop: (coords?.y ?? 0) + 10,
                          tooltipLeft: (coords?.x ?? 0) + 10,
                        })
                      }}
                      onMouseOut={hideTooltip}
                    />
                  ))}
                </Group>
              </>
            )}
          </Sankey>
        </svg>
        {tooltipOpen && (
          <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft}>
            {tooltipData}
          </TooltipWithBounds>
        )}
      </div>
    </div>
  )
}

// Data from https://codesandbox.io/p/sandbox/github/airbnb/visx/tree/master/packages/visx-demo/src/sandboxes/visx-sankey?file=%2Fenergy.json%3A2%2C1
// {
//   "nodes": [
//     { "name": "Agricultural 'waste'" },
//     { "name": "Bio-conversion" },
//     { "name": "Liquid" },
//     { "name": "Losses" },
//     { "name": "Solid" },
//     { "name": "Gas" },
//     { "name": "Biofuel imports" },
//     { "name": "Biomass imports" },
//     { "name": "Coal imports" },
//     { "name": "Coal" },
//     { "name": "Coal reserves" },
//     { "name": "District heating" },
//     { "name": "Industry" },
//     { "name": "Heating and cooling - commercial" },
//     { "name": "Heating and cooling - homes" },
//     { "name": "Electricity grid" },
//     { "name": "Over generation / exports" },
//     { "name": "H2 conversion" },
//     { "name": "Road transport" },
//     { "name": "Agriculture" },
//     { "name": "Rail transport" },
//     { "name": "Lighting & appliances - commercial" },
//     { "name": "Lighting & appliances - homes" },
//     { "name": "Gas imports" },
//     { "name": "Ngas" },
//     { "name": "Gas reserves" },
//     { "name": "Thermal generation" },
//     { "name": "Geothermal" },
//     { "name": "H2" },
//     { "name": "Hydro" },
//     { "name": "International shipping" },
//     { "name": "Domestic aviation" },
//     { "name": "International aviation" },
//     { "name": "National navigation" },
//     { "name": "Marine algae" },
//     { "name": "Nuclear" },
//     { "name": "Oil imports" },
//     { "name": "Oil" },
//     { "name": "Oil reserves" },
//     { "name": "Other waste" },
//     { "name": "Pumped heat" },
//     { "name": "Solar PV" },
//     { "name": "Solar Thermal" },
//     { "name": "Solar" },
//     { "name": "Tidal" },
//     { "name": "UK land based bioenergy" },
//     { "name": "Wave" },
//     { "name": "Wind" }
//   ],
//   "links": [
//     { "source": 0, "target": 1, "value": 124.729 },
//     { "source": 1, "target": 2, "value": 0.597 },
//     { "source": 1, "target": 3, "value": 26.862 },
//     { "source": 1, "target": 4, "value": 280.322 },
//     { "source": 1, "target": 5, "value": 81.144 },
//     { "source": 6, "target": 2, "value": 35 },
//     { "source": 7, "target": 4, "value": 35 },
//     { "source": 8, "target": 9, "value": 11.606 },
//     { "source": 10, "target": 9, "value": 63.965 },
//     { "source": 9, "target": 4, "value": 75.571 },
//     { "source": 11, "target": 12, "value": 10.639 },
//     { "source": 11, "target": 13, "value": 22.505 },
//     { "source": 11, "target": 14, "value": 46.184 },
//     { "source": 15, "target": 16, "value": 104.453 },
//     { "source": 15, "target": 14, "value": 113.726 },
//     { "source": 15, "target": 17, "value": 27.14 },
//     { "source": 15, "target": 12, "value": 342.165 },
//     { "source": 15, "target": 18, "value": 37.797 },
//     { "source": 15, "target": 19, "value": 4.412 },
//     { "source": 15, "target": 13, "value": 40.858 },
//     { "source": 15, "target": 3, "value": 56.691 },
//     { "source": 15, "target": 20, "value": 7.863 },
//     { "source": 15, "target": 21, "value": 90.008 },
//     { "source": 15, "target": 22, "value": 93.494 },
//     { "source": 23, "target": 24, "value": 40.719 },
//     { "source": 25, "target": 24, "value": 82.233 },
//     { "source": 5, "target": 13, "value": 0.129 },
//     { "source": 5, "target": 3, "value": 1.401 },
//     { "source": 5, "target": 26, "value": 151.891 },
//     { "source": 5, "target": 19, "value": 2.096 },
//     { "source": 5, "target": 12, "value": 48.58 },
//     { "source": 27, "target": 15, "value": 7.013 },
//     { "source": 17, "target": 28, "value": 20.897 },
//     { "source": 17, "target": 3, "value": 6.242 },
//     { "source": 28, "target": 18, "value": 20.897 },
//     { "source": 29, "target": 15, "value": 6.995 },
//     { "source": 2, "target": 12, "value": 121.066 },
//     { "source": 2, "target": 30, "value": 128.69 },
//     { "source": 2, "target": 18, "value": 135.835 },
//     { "source": 2, "target": 31, "value": 14.458 },
//     { "source": 2, "target": 32, "value": 206.267 },
//     { "source": 2, "target": 19, "value": 3.64 },
//     { "source": 2, "target": 33, "value": 33.218 },
//     { "source": 2, "target": 20, "value": 4.413 },
//     { "source": 34, "target": 1, "value": 4.375 },
//     { "source": 24, "target": 5, "value": 122.952 },
//     { "source": 35, "target": 26, "value": 839.978 },
//     { "source": 36, "target": 37, "value": 504.287 },
//     { "source": 38, "target": 37, "value": 107.703 },
//     { "source": 37, "target": 2, "value": 611.99 },
//     { "source": 39, "target": 4, "value": 56.587 },
//     { "source": 39, "target": 1, "value": 77.81 },
//     { "source": 40, "target": 14, "value": 193.026 },
//     { "source": 40, "target": 13, "value": 70.672 },
//     { "source": 41, "target": 15, "value": 59.901 },
//     { "source": 42, "target": 14, "value": 19.263 },
//     { "source": 43, "target": 42, "value": 19.263 },
//     { "source": 43, "target": 41, "value": 59.901 },
//     { "source": 4, "target": 19, "value": 0.882 },
//     { "source": 4, "target": 26, "value": 400.12 },
//     { "source": 4, "target": 12, "value": 46.477 },
//     { "source": 26, "target": 15, "value": 525.531 },
//     { "source": 26, "target": 3, "value": 787.129 },
//     { "source": 26, "target": 11, "value": 79.329 },
//     { "source": 44, "target": 15, "value": 9.452 },
//     { "source": 45, "target": 1, "value": 182.01 },
//     { "source": 46, "target": 15, "value": 19.013 },
//     { "source": 47, "target": 15, "value": 289.366 }
//   ]
// }

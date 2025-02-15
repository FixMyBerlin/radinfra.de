import { maprouletteProjectId } from './maprouletteProjectId.const'
import type { CreateMapRouletteChallengeType } from './schema'

export const defaultChallenge = {
  defaultBasemap: -1,
  defaultBasemapId: '',
  instruction:
    ' \n## Kontext {{osmIdentifier}} \n \n{{task_markdown}}\n(Letzte Aktualisierung der Aufgabe: {{task_updated_at}})\n \n {{blank}}{{blank}}{{blank}}{{blank}}{{blank}}{{blank}}',
  difficulty: 2,
  defaultPriority: 0,
  // Format: {"condition":"AND","rules":[{"value":"priority.prio1","type":"string","operator":"equal"}]}
  highPriorityRule: JSON.stringify(
    {
      condition: 'AND',
      rules: [{ type: 'string', operator: 'equal', value: 'priority.prio1' }],
    },
    undefined,
    0,
  ),
  mediumPriorityRule: JSON.stringify(
    {
      condition: 'AND',
      rules: [{ type: 'string', operator: 'equal', value: 'priority.prio2' }],
    },
    undefined,
    0,
  ),
  lowPriorityRule: JSON.stringify(
    {
      condition: 'AND',
      rules: [{ type: 'string', operator: 'equal', value: 'priority.prio3' }],
    },
    undefined,
    0,
  ),
  overpassTargetType: null,
  parent: maprouletteProjectId,
  tags: 'highway',
  presets: [],
  taskStyles: [],
} satisfies Partial<CreateMapRouletteChallengeType>

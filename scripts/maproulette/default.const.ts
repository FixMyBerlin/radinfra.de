import { maprouletteProjectId } from './maprouletteProjectId.const'
import type { CreateMapRouletteChallengeType } from './schema'

export const defaultChallenge = {
  defaultBasemap: -1,
  defaultBasemapId: '',
  instruction:
    '{{task_markdown}}\n \n \n \n . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ',
  difficulty: 2,
  // instruction:'',
  defaultPriority: 0,
  highPriorityRule: {
    condition: 'AND',
    rules: [{ type: 'string', operator: 'equal', value: 'priority.prio1' }],
  },
  mediumPriorityRule: {
    condition: 'AND',
    rules: [{ type: 'string', operator: 'equal', value: 'priority.prio2' }],
  },
  lowPriorityRule: {
    condition: 'AND',
    rules: [{ type: 'string', operator: 'equal', value: 'priority.prio3' }],
  },
  overpassTargetType: null,
  parent: maprouletteProjectId,
  tags: 'highway',
  presets: [],
  taskStyles: [],
} satisfies Partial<CreateMapRouletteChallengeType>

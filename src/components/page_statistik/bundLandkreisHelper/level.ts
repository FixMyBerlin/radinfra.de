export type Level = 'bund' | 'landkreis'

export const levelMap: Map<Level, string> = new Map([
  ['bund', '4'],
  ['landkreis', '6'],
])

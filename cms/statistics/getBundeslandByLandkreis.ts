import { bundeslandLandkreis } from './bundeslandLandkreis.const'

export const getBundeslandByLandkreis = (landkreisId: string) => {
  for (const [bundesland, landkreise] of bundeslandLandkreis.entries()) {
    if (landkreise.includes(landkreisId)) {
      return bundesland
    }
  }
  return undefined
}

import type { InferEntrySchema } from 'astro:content'

// Gem. Fahrstreifen mit Bus
// Gem. Fahrstreifen mit Kfz (Markiert)
// Führungsform unklar

export const bikelaneLegend: {
  id: keyof NonNullable<InferEntrySchema<'statistics'>['properties']['bikelane_length']>
  name: string
  color: string
}[] = [
  {
    id: 'footAndCyclewaySegregated_adjoiningOrIsolated',
    name: 'Getrennter Rad- und Gehweg',
    color: '#818cf8',
  },
  {
    id: 'footAndCyclewaySegregated_adjoining',
    name: 'Getrennter Rad- und Gehweg (Straßenbegleitend)',
    color: '#818cf8',
  },
  {
    id: 'footAndCyclewaySegregated_isolated',
    name: 'Getrennter Rad- und Gehweg (separat geführt)',
    color: '#818cf8',
  },
  { id: 'cycleway_adjoiningOrIsolated', name: 'Getrennter Radweg', color: '#174ed9' },
  { id: 'cycleway_adjoining', name: 'Getrennter Radweg (Straßenbegleitend)', color: '#174ed9' },
  { id: 'cycleway_isolated', name: 'Getrennter Radweg (separat geführt)', color: '#174ed9' },
  { id: 'cyclewayOnHighwayProtected', name: 'Geschuetzter Radfahrstreifen', color: '#2dd4bf' },
  { id: 'cyclewayOnHighway_advisory', name: 'Schutzstreifen', color: '#2dd4bf' },
  { id: 'cyclewayOnHighway_exclusive', name: 'Radfahrstreifen', color: '#2dd4bf' },
  {
    id: 'cyclewayOnHighway_advisoryOrExclusive',
    name: 'Schutzstreifen oder Radfahrstreifen',
    color: '#2dd4bf',
  },
  { id: 'cyclewayOnHighwayBetweenLanes', name: 'Schutzstreifen in Mittellage', color: '#2dd4bf' },
  { id: 'crossing', name: 'Markierung Kreuzungsbereich', color: '#748b82' },
  {
    id: 'footAndCyclewayShared_adjoiningOrIsolated',
    name: 'Gemeinsamer Geh- & Radweg',
    color: '#e949ac',
  },
  {
    id: 'footAndCyclewayShared_adjoining',
    name: 'Gemeinsamer Geh- & Radweg (Straßenbegleitend)',
    color: '#e949ac',
  },
  {
    id: 'footAndCyclewayShared_isolated',
    name: 'Gemeinsamer Geh- & Radweg (separat geführt)',
    color: '#e949ac',
  },
  { id: 'pedestrianAreaBicycleYes', name: 'Gehweg mit Rad frei (Fußgängerzone)', color: '#f08ed5' },
  {
    id: 'footwayBicycleYes_adjoining',
    name: 'Gehweg mit Rad frei (Straßenbegleitend)',
    color: '#f08ed5',
  },
  {
    id: 'footwayBicycleYes_isolated',
    name: 'Gehweg mit Rad frei (separat geführt)',
    color: '#f08ed5',
  },
  { id: 'footwayBicycleYes_adjoiningOrIsolated', name: 'Gehweg mit Rad frei', color: '#f08ed5' },
  { id: 'bicycleRoad', name: 'Fahrradstraße (keine Kfz)', color: '#fb923c' },
  {
    id: 'bicycleRoad_vehicleDestination',
    name: 'Fahrradstraße (Mischverkehr)',
    color: '#fb923c',
  },
  {
    id: 'sharedBusLaneBikeWithBus',
    name: 'Gem. Fahrstreifen mit Bus (Radfahrstreifen mit Freigabe Busverkehr)',
    color: '#059669',
  },
  {
    id: 'sharedBusLaneBusWithBike',
    name: 'Gem. Fahrstreifen mit Bus (Bussonderfahrstreifen mit Fahrrad frei)',
    color: '#059669',
  },
  {
    id: 'sharedMotorVehicleLane',
    name: 'Gem. Fahrstreifen mit Kfz (Markiert)',
    color: '#059669',
  },
  { id: 'needsClarification', name: 'Führungsform unklar', color: '#b50382' },
  // { id: 'cyclewayLink', name: '', color: '' }, // SKIP
  // { id: 'livingStreet', name: '', color: '' }, // SKIP
]

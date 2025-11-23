// Fixed Tailwind colors for each Bundesland (German state)
// Maps state relation IDs to Tailwind color classes
export const bundeslandColors: Record<string, string> = {
  'relation/2145268': 'bg-blue-500', // Bayern
  'relation/62611': 'bg-green-500', // Baden-Württemberg
  'relation/62718': 'bg-red-500', // Bremen
  'relation/62761': 'bg-yellow-500', // Nordrhein-Westfalen
  'relation/62372': 'bg-purple-500', // Saarland
  'relation/62771': 'bg-pink-500', // Niedersachsen
  'relation/62341': 'bg-indigo-500', // Mecklenburg-Vorpommern
  'relation/62650': 'bg-orange-500', // Hessen
  'relation/62607': 'bg-teal-500', // Sachsen-Anhalt
  'relation/62467': 'bg-cyan-500', // Sachsen
  'relation/62504': 'bg-amber-500', // Brandenburg
  'relation/62366': 'bg-emerald-500', // Thüringen
  'relation/51529': 'bg-lime-500', // Schleswig-Holstein
  'relation/28322': 'bg-violet-500', // Rheinland-Pfalz
  'relation/62422': 'bg-rose-500', // Berlin
  'relation/62782': 'bg-sky-500', // Hamburg
}

// Fallback color for states not in the mapping
export const defaultBundeslandColor = 'bg-gray-400'

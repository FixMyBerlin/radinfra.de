export const tildaApiUrl = 'https://tilda-geo.de/api'
// export const tildaApiUrl = 'https://staging.tilda-geo.de/api'
// export const tildaApiUrl = 'http://127.0.0.1:5173/api'

export const tildaStatisticsApiUrl = `${tildaApiUrl}/stats`

// TILDA has been slow enough to stall builds; abort instead of waiting forever.
export const tildaApiTimeoutMs = 30_000

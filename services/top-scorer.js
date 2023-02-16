import { useFetch } from './utils'

export async function getTopScorerPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-scorer'

  const topPlayerScorers = await useFetch(URL)
  return topPlayerScorers[0]
}

export async function getTopScorerPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-scorer'

  const topPlayersScorers = await useFetch(URL)
  return topPlayersScorers
}

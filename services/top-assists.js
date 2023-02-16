import { useFetch } from './utils'

export async function getTopAssistsPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-assists'

  const topPlayerAssists = await useFetch(URL)
  return topPlayerAssists[0]
}

export async function getTopAssistsPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-assists'

  const topPlayersAssists = await useFetch(URL)
  return topPlayersAssists
}

import { useFetch } from './utils'

export async function getMVPPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/mvp'

  const mvpPlayers = await useFetch(URL)
  return mvpPlayers[0]
}

export async function getMVPPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/mvp'

  const players = await useFetch(URL)
  return players
}

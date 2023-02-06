export async function getTopScorerPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-scorer'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players[0]
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function getTopScorerPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-scorer'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players
  } catch (e) {
    console.log(e)
    return []
  }
}

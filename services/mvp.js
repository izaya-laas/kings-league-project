export async function getMVPPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/mvp'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players[0]
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function getMVPPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/mvp'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players
  } catch (e) {
    console.log(e)
    return []
  }
}

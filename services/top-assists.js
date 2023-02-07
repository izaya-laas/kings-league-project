export async function getTopAssistsPlayer() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-assists'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players[0]
  } catch (e) {
    console.log(e)
    return {}
  }
}

export async function getTopAssistsPlayers() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/top-assists'

  try {
    const res = await fetch(URL)
    const players = await res.json()

    return players
  } catch (e) {
    console.log(e)
    return []
  }
}

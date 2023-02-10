export async function getAllPresidents() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/presidents'

  try {
    const res = await fetch(URL)
    const teams = await res.json()

    const teamsValues = Object.values(teams)

    return teamsValues
  } catch (e) {
    console.log(e)
    return []
  }
}

export async function getPresident(presidentId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/presidents/${presidentId}`

  try {
    const res = await fetch(URL)
    const team = await res.json()

    return team
  } catch (e) {
    console.log(e)
    return []
  }
}

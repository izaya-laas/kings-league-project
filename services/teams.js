export async function getAllTeams() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/teams'

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

export async function getTeam(teamId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/teams/${teamId}`

  try {
    const res = await fetch(URL)
    const team = await res.json()

    return team
  } catch (e) {
    console.log(e)
    return []
  }
}

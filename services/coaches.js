export async function getAllCoaches() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/coaches'

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

export async function getCoach(coachId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/coaches/${coachId}`

  try {
    const res = await fetch(URL)
    const team = await res.json()

    return team
  } catch (e) {
    console.log(e)
    return []
  }
}

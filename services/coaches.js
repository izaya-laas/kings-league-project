import { useFetch } from './utils'

export async function getAllCoaches() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/coaches'

  const coaches = await useFetch(URL)
  const teamsValuesCoaches = Object.values(coaches)

  return teamsValuesCoaches
}

export async function getCoach(coachId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/coaches/${coachId}`

  const coach = await useFetch(URL)

  return coach
}

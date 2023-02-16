import { useFetch } from './utils'

export async function getAllTeams() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/teams'

  const teams = await useFetch(URL)
  const teamsValues = Object.values(teams)

  return teamsValues
}

export async function getTeam(teamId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/teams/${teamId}`

  const team = await useFetch(URL)
  return team
}

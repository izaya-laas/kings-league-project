import { useFetch } from './utils'

export async function getAllPresidents() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/presidents'

  const presidents = useFetch(URL)
  const teamsValuesPresidents = Object.values(presidents)

  return teamsValuesPresidents
}

export async function getPresident(presidentId) {
  const URL = `https://kings-league-api.lautaronorielasat.workers.dev/presidents/${presidentId}`

  const president = await useFetch(URL)
  return president
}

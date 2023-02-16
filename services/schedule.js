import { useFetch } from './utils'

export async function getSchedule() {
  const URL = 'https://kings-league-api.lautaronorielasat.workers.dev/schedule'

  const schedule = await useFetch(URL)
  return schedule
}

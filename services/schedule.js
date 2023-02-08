export async function getSchedule() {
  const url = 'https://kings-league-api.lautaronorielasat.workers.dev/schedule'
  const res = await fetch(url)
  const schedule = await res.json()

  return schedule
}

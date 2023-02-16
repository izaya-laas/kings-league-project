export async function getSchedule() {
  const url = 'https://kings-league-api.lautaronorielasat.workers.dev/schedule'
  const res = await fetch(url, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': '86400'
  })

  const schedule = await res.json()

  return schedule
}

import { useFetch } from './utils'

export async function getLeaderboardTeam(teamId) {
  const url = `https://kings-league-api.lautaronorielasat.workers.dev/leaderboard/${teamId}`

  const leaderboardTeam = await useFetch(url)

  const { wins, loses, goalsScored, goalsConceded, yellowCards, redCards } = leaderboardTeam

  return { wins, loses, goalsScored, goalsConceded, yellowCards, redCards }
}

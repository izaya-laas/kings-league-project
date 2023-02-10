export async function getLeaderboardTeam(teamId) {
  const url = `https://kings-league-api.lautaronorielasat.workers.dev/leaderboard/${teamId}`
  const res = await fetch(url)
  const team = await res.json()

  const { wins, loses, goalsScored, goalsConceded, yellowCards, redCards } = team

  return { wins, loses, goalsScored, goalsConceded, yellowCards, redCards }
}

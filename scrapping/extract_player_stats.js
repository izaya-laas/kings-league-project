const matchPropertyNames = {
  partidos: 'matchs',
  'penaltis parados': 'stopPenalties',
  'goles encajados': 'concededGoals',
  goles: 'goals',
  'asist.': 'assists',
  't.amarilla': 'yellowCards',
  't.roja': 'redCards',
  mvp: 'mvp'
}
const performancePropertyNames = {
  velocidad: 'speed',
  físico: 'physique',
  tiro: 'shooting',
  pase: 'passing',
  talento: 'talent',
  defensa: 'defense',
  reflejo: 'reflexes',
  paradas: 'saves',
  saque: 'kickoff',
  estirada: 'stretch'
}

const extractScores = ($stat, propertyNames) => {
  let scoreName = $stat.find('.el-meta').text().trim()
  const scoreValue = Number($stat.find('h3').text().trim())

  scoreName = propertyNames[scoreName]

  return { scoreName, scoreValue }
}

const calculateScore = (stats) => {
  const values = Object.values(stats)

  const totalValue = values.reduce((acc, currentValue) => acc + currentValue)
  const totalScore = Math.round(totalValue / values.length)

  return totalScore
}

export function extractPlayerStats(playerIDSelector, position, $) {
  const specialMatchSelector = position === 'Portero' ? '.league-goalk' : '.league-player'
  const specialPerformanceSelector = position === 'Portero' ? '.data-goalk' : '.data-player'

  const matchContainerSelector = `div div div ${specialMatchSelector}  > div > div`
  const performanceContainerSelector = `div div div ${specialPerformanceSelector} > div > div`
  const playerStats = {
    matchStats: {},
    performanceStats: {}
  }

  const $containerMatchStats = $(`.${playerIDSelector} ${matchContainerSelector}`)

  $containerMatchStats.each((_, stat) => {
    const $stat = $(stat)
    const { scoreName, scoreValue } = extractScores($stat, matchPropertyNames)

    playerStats.matchStats[scoreName] = scoreValue
  })

  if (playerIDSelector === 'jugador-11') return playerStats

  const $containerPerformanceStats = $(`.${playerIDSelector} ${performanceContainerSelector}`)

  $containerPerformanceStats.each((_, stat) => {
    const $stat = $(stat)
    const { scoreName, scoreValue } = extractScores($stat, performancePropertyNames)

    playerStats.performanceStats[scoreName] = scoreValue
  })

  playerStats.performanceStats.score = calculateScore(playerStats.performanceStats)

  return playerStats
}

const IDs = {
  'Ultimate Móstoles': 'ultimate-mostoles',
  '1K FC': '1k',
  'Saiyans FC': 'saiyans-fc',
  'Rayo de Barcelona': 'rayo-barcelona',
  'Jijantes FC': 'jijantes-fc',
  'XBUYER TEAM': 'xbuyer-team',
  'Aniquiladores FC': 'aniquiladores-fc',
  'El Barrio': 'el-barrio',
  'Los Troncos FC': 'los-troncos-fc',
  Kunisports: 'kunisports',
  'PIO FC': 'pio-fc',
  'Porcinos FC': 'porcinos-fc'
}

export async function getStats($, specialSelectors) {
  const $rows = $('tbody tr')
  const stats = []
  const basicSelectors = {
    ranking: {
      selector: '.el-text-1',
      type: 'number'
    },
    team: {
      selector: '.el-text-3',
      type: 'string'
    },
    player: {
      selector: '.el-text-4',
      type: 'string'
    },
    gamesPlayed: {
      selector: '.el-text-5',
      type: 'number'
    }
  }

  const statsSelectors = { ...basicSelectors, ...specialSelectors }

  $rows.each((index, el) => {
    const $el = $(el)

    const statsSelectorsEntries = Object.entries(statsSelectors)

    const statsEntries = statsSelectorsEntries.map(([key, { selector, type }]) => {
      const rawValue = $el.find(selector).text()
      let value = rawValue.trim()

      if (key === 'ranking') value = index + 1
      if (type === 'number') value = Number(value)

      return [key, value]
    })

    const currentStat = Object.fromEntries(statsEntries)
    const { team } = currentStat
    stats.push({ ranking: index, teamId: IDs[team], ...currentStat })
  })

  return stats
}

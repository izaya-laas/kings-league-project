import { PRESIDENTS, TEAMS } from '../db/index.js'

export async function getLeaderBoard($) {
  const $rows = $('table tbody tr')
  const leaderboard = []
  const LEADERBOARD_SELECTORS = {
    team: {
      selector: '.fs-table-text_3',
      type: 'string'
    },
    wins: {
      selector: '.fs-table-text_4',
      type: 'number'
    },
    loses: {
      selector: '.fs-table-text_5',
      type: 'number'
    },
    goalsScored: {
      selector: '.fs-table-text_5',
      type: 'number'
    },
    goalsConceded: {
      selector: '.fs-table-text_7',
      type: 'number'
    },
    yellowCards: {
      selector: '.fs-table-text_8',
      type: 'number'
    },
    redCards: {
      selector: '.fs-table-text_9',
      type: 'number'
    }
  }

  const getTeamFrom = (name) => {
    const { presidentId, ...restOfTeam } = TEAMS.find((team) => team.name === name)

    const president = PRESIDENTS.find((president) => president.id === presidentId)

    return { ...restOfTeam, president }
  }

  $rows.each((_, el) => {
    const $el = $(el)

    const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, { selector, type }]) => {
      const rawValue = $el.find(selector).text()
      let value = rawValue.trim()

      if (type === 'number') value = Number(value)

      return [key, value]
    })

    const { team: teamName, ...leaderBoardTeam } = Object.fromEntries(leaderBoardEntries)

    const team = getTeamFrom(teamName)

    leaderboard.push({
      ...leaderBoardTeam,
      team
    })
  })

  return leaderboard
}

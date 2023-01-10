import { cleanText } from '../helper/cleanText.js'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import { writeDBFile, TEAMS, PRESIDENTS } from '../db/index.js'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()

  return cheerio.load(html)
}

async function getLeaderBoard () {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')
  const leaderboard = []
  const LEADERBOARD_SELECTORS = {
    team: {
      selector: '.fs-table-text_3',
      type: 'string',
      cleaned: true
    },
    wins: {
      selector: '.fs-table-text_4',
      type: 'number',
      cleaned: false

    },
    loses: {
      selector: '.fs-table-text_5',
      type: 'number',
      cleaned: false
    },
    goalsScored: {
      selector: '.fs-table-text_5',
      type: 'number',
      cleaned: false
    },
    goalsConceded: {
      selector: '.fs-table-text_7',
      type: 'number',
      cleaned: false
    },
    yellowCards: {
      selector: '.fs-table-text_8',
      type: 'number',
      cleaned: false
    },
    redCards: {
      selector: '.fs-table-text_9',
      type: 'number',
      cleaned: false
    }

  }

  const getTeamFrom = (name) => {
    const { presidentId, ...restOfTeam } = TEAMS.find((team) => team.name === name)

    const president = PRESIDENTS.find(president => president.id === presidentId)

    return { ...restOfTeam, president }
  }

  $rows.each((_, el) => {
    const $el = $(el)

    const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, { selector, type, cleaned }]) => {
      const rawValue = $el.find(selector).text()
      let value = cleaned ? rawValue.trim() : cleanText(rawValue)

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

const leaderboard = await getLeaderBoard()
writeDBFile('leaderboard', leaderboard)

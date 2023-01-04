import fetch from 'node-fetch'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { cleanText } from '../helper/cleanText.js'
import * as cheerio from 'cheerio'
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

  $rows.each((_, el) => {
    const $el = $(el)
    const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, { selector, type }]) => {
      const rawValue = $el.find(selector).text()
      let value = cleanText(rawValue)

      if (type === 'number') value = Number(value)

      return [key, value]
    })

    leaderboard.push(Object.fromEntries(leaderBoardEntries))
  })

  return leaderboard
}

(async () => {
  const leaderboard = await getLeaderBoard()
  const filePath = path.join(process.cwd(), './db/leaderboard.json')
  await writeFile(filePath, JSON.stringify(leaderboard, null, 2), 'utf-8')

  console.log(leaderboard)
  console.log(filePath)
})()

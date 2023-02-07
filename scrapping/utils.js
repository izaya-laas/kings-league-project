import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import { writeDBFile } from '../db/index.js'
import { getLeaderBoard } from './leaderboard.js'
import { getStats } from './basicStats.js'
import { logError, logInfo, logSuccess } from './log.js'

export async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()

  return cheerio.load(html)
}

export const SCRAPINGS = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderBoard,
    specialSelector: null
  },
  mvp: {
    url: 'https://kingsleague.pro/estadisticas/mvp/',
    scraper: getStats,
    specialSelector: {
      MVP: {
        selector: '.el-text-6',
        type: 'number'
      }
    }
  },
  top_scorers: {
    url: 'https://kingsleague.pro/estadisticas/goles/',
    scraper: getStats,
    specialSelector: {
      goals: {
        selector: '.el-text-6',
        type: 'number'
      }
    }
  },
  top_assists: {
    url: 'https://kingsleague.pro/estadisticas/asistencias/',
    scraper: getStats,
    specialSelector: {
      assists: {
        selector: '.el-text-6',
        type: 'number'
      }
    }
  }
}

export async function scrapeAndSave(name) {
  const start = performance.now()
  try {
    const { scraper, url, specialSelector } = SCRAPINGS[name]

    const $ = await scrape(url)

    logInfo(`Scraping ${name}`)
    const content = await scraper($, specialSelector)
    logSuccess(`${name} scraped successfully`)

    logInfo(`Writing ${name} to database`)
    writeDBFile(name, content)
    logSuccess(`${name} written successfully`)
  } catch (e) {
    logError(e)
  } finally {
    const end = performance.now()
    const time = (end - start) / 1000
    logInfo(`${name} scraped in ${time} seconds`)

    console.log('')
  }
}

export const IDS = {
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

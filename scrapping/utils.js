import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()

  return cheerio.load(html)
}

export async function getBasicStats (url) {
  const $ = await scrape(url)

  const $rows = $('tbody tr')
  const basicStats = []
  const basicStatsSelectors = {
    ranking: {
      selector: '.el-text-1',
      type: 'number'
    },
    name: {
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
    },
    MVPS: {
      selector: '.el-text-6',
      type: 'number'
    }
  }

  $rows.each((index, el) => {
    const $el = $(el)

    const basicStatsSelectorsEntries = Object.entries(basicStatsSelectors)

    const basicStatsEntries = basicStatsSelectorsEntries.map(([key, { selector, type }]) => {
      const rawValue = $el.find(selector).text()
      let value = rawValue.trim()

      if (key === 'ranking') value = index + 1
      if (type === 'number') value = Number(value)

      return [key, value]
    })

    const currentStat = Object.fromEntries(basicStatsEntries)
    basicStats.push(currentStat)
  })

  return basicStats
}

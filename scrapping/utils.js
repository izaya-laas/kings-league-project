import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export async function scrape (url) {
  const res = await fetch(url)
  const html = await res.text()

  return cheerio.load(html)
}

export async function getStats (url, statsSelectors) {
  const $ = await scrape(url)

  const $rows = $('tbody tr')
  const stats = []

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
    stats.push(currentStat)
  })

  return stats
}

import { scrape } from './utils.js'
import { writeDBFile } from '../db/index.js'

const URL = 'https://kingsleague.pro/estadisticas/mvp/'

async function getMVP () {
  const $ = await scrape(URL)

  const $rows = $('tbody tr')
  const MVPS = []
  const MVPSelectors = {
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

    const MVPSelectorEntries = Object.entries(MVPSelectors)

    const MVPEntries = MVPSelectorEntries.map(([key, { selector, type }]) => {
      const rawValue = $el.find(selector).text()
      let value = rawValue.trim()

      if (key === 'ranking') value = index + 1
      if (type === 'number') value = Number(value)

      return [key, value]
    })

    const currentMVP = Object.fromEntries(MVPEntries)
    MVPS.push(currentMVP)
  })

  return MVPS
}

const MVP = await getMVP()

writeDBFile('mvp', MVP)

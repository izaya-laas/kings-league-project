import { getStats } from './utils.js'
import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from './log.js'

const MVP_URL = 'https://kingsleague.pro/estadisticas/mvp/'
const TOP_SCORER_URL = 'https://kingsleague.pro/estadisticas/goles/'
const ASSISTS_URL = 'https://kingsleague.pro/estadisticas/asistencias/'

const specialMVPSelector = {
  MVP: {
    selector: '.el-text-6',
    type: 'number'
  }
}
const specialTopScorerSelector = {
  goals: {
    selector: '.el-text-6',
    type: 'number'
  }
}
const specialAssistsSelector = {
  assists: {
    selector: '.el-text-6',
    type: 'number'
  }
}

try {
  logInfo('Scraping MVP List')
  const MVP = await getStats(MVP_URL, specialMVPSelector)
  logSuccess('MVP list scraped successfully')

  logInfo('Scraping Top Scorer List')
  const TopScorer = await getStats(TOP_SCORER_URL, specialTopScorerSelector)
  logSuccess('Top scorer list scraped successfully')

  logInfo('Scraping Top assists List')
  const assists = await getStats(ASSISTS_URL, specialAssistsSelector)
  logSuccess('Top assists list scraped successfully')

  console.log('')

  logInfo('Writing stats to database')
  writeDBFile('mvp', MVP)
  writeDBFile('topScorer', TopScorer)
  writeDBFile('assists', assists)
  logSuccess('Stats written successfully')
} catch (e) {
  logError(e)
}

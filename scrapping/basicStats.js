import { getStats } from './utils.js'
import { writeDBFile } from '../db/index.js'

const MVP_URL = 'https://kingsleague.pro/estadisticas/mvp/'
const TOP_SCORER_URL = 'https://kingsleague.pro/estadisticas/goles/'
const ASSISTS_URL = 'https://kingsleague.pro/estadisticas/asistencias/'

const basicSelectors = {
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
  }
}

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

const MVP = await getStats(MVP_URL, { ...basicSelectors, ...specialMVPSelector })

const TopScorer = await getStats(TOP_SCORER_URL, { ...basicSelectors, ...specialTopScorerSelector })

const assists = await getStats(ASSISTS_URL, { ...basicSelectors, ...specialAssistsSelector })

writeDBFile('mvp', MVP)
writeDBFile('topScorer', TopScorer)
writeDBFile('assists', assists)

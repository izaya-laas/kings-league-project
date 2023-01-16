import { getBasicStats } from './utils.js'
import { writeDBFile } from '../db/index.js'

const MVP_URL = 'https://kingsleague.pro/estadisticas/mvp/'
const TOP_SCORER_URL = 'https://kingsleague.pro/estadisticas/goles/'
const ASSISTS_URL = 'https://kingsleague.pro/estadisticas/asistencias/'

const MVP = await getBasicStats(MVP_URL)
const TopScorer = await getBasicStats(TOP_SCORER_URL)
const assists = await getBasicStats(ASSISTS_URL)

writeDBFile('mvp', MVP)
writeDBFile('topScorer', TopScorer)
writeDBFile('assists', assists)

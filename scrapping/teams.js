import fetch from 'node-fetch'
import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import { cleanText } from '../helper/cleanText.js'
import * as cheerio from 'cheerio'

const URLS = [
  'https://kingsleague.pro/team/el-barrio/',
  'https://kingsleague.pro/team/ultimate-mostoles/',
  'https://kingsleague.pro/team/los-troncos-fc/',
  'https://kingsleague.pro/team/1k/',
  'https://kingsleague.pro/team/saiyans-fc/',
  'https://kingsleague.pro/team/kunisports/',
  'https://kingsleague.pro/team/jijantes-fc/',
  'https://kingsleague.pro/team/porcinos-fc/',
  'https://kingsleague.pro/team/rayo-barcelona/',
  'https://kingsleague.pro/team/xbuyer-team/',
  'https://kingsleague.pro/team/aniquiladores-fc/',
  'https://kingsleague.pro/team/pio-fc/'
]

async function scrape(url) {
  const res = await fetch(url)
  const html = await res.text()

  return cheerio.load(html)
}

URLS.map(async (link) => {
  await scrape(link)
})

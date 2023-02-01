import { writeDBFile } from '../db/index.js'
import { scrape } from './utils.js'

const URL = 'https://kingsleague.pro/'
const principalSelector = '.tm-page > div[id="page#38"] > div > div[uk-grid] > div'

const extractPartnerName = (url) => {
  const urlSlit = url.split('.')
  return urlSlit.length > 2 ? urlSlit[1].split('/').at(-1) : urlSlit[0].split('/').at(-1)
}

async function scrapePartners() {
  const $ = await scrape(URL)
  const $rows = $(principalSelector)
  const partnersGlobal = []

  $rows.each((index, el) => {
    const $el = $(el)
    const partnerLevel = $el.find('div[id]').text()
    let partnerName
    const partnersLocal = []

    if (partnerLevel === 'Main Partners') {
      const selectorImages = 'div > div > div > div > div > img'
      const $images = $(` ${principalSelector} > ${selectorImages}`)

      $images.each((index, image) => {
        const $image = $(image)
        const srcImage = $image.attr('src')
        partnerName = extractPartnerName(srcImage)
        partnersLocal.push({
          partnerName,
          image: `https://kings-league-api.lautaronorielasat.workers.dev/static/partners/${partnerName}.svg`
        })
      })
    } else {
      const $image = $el.find('img')
      const srcImage = $image.attr('src')
      partnerName = extractPartnerName(srcImage)
      partnersLocal.push({
        partnerName,
        image: `https://kings-league-api.lautaronorielasat.workers.dev/static/partners/${partnerName}.svg`
      })
    }

    const currentPartner = {
      partnerLevel,
      partners: partnersLocal
    }

    partnersGlobal.push(currentPartner)
  })

  return partnersGlobal
}

const partners = await scrapePartners()
await writeDBFile('partners', partners)

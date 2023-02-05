import fetch from 'node-fetch'
import path from 'node:path'
import { scrape } from './utils.js'
import { writeFile } from 'node:fs/promises'
import { writeDBFile } from '../db/index.js'
import { logInfo, logSuccess } from './log.js'
import presidents from '../db/presidents.json' assert { type: 'json' }

const STATIC_PATH = path.join(process.cwd(), './assets/static')

const pages = [
  {
    url: 'https://kingsleague.pro/team/el-barrio/',
    teamId: 'el-barrio'
  },
  { url: 'https://kingsleague.pro/team/ultimate-mostoles/', teamId: 'ultimate-mostoles' },
  { url: 'https://kingsleague.pro/team/los-troncos-fc/', teamId: 'los-troncos-fc' },
  { url: 'https://kingsleague.pro/team/1k/', teamId: '1k' },
  { url: 'https://kingsleague.pro/team/saiyans-fc/', teamId: 'saiyans-fc' },
  { url: 'https://kingsleague.pro/team/kunisports/', teamId: 'kunisports' },
  { url: 'https://kingsleague.pro/team/jijantes-fc/', teamId: 'jijantes-fc' },
  { url: 'https://kingsleague.pro/team/porcinos-fc/', teamId: 'porcinos-fc' },
  { url: 'https://kingsleague.pro/team/rayo-barcelona/', teamId: 'rayo-barcelona' },
  { url: 'https://kingsleague.pro/team/xbuyer-team/', teamId: 'xbuyer-team' },
  { url: 'https://kingsleague.pro/team/aniquiladores-fc/', teamId: 'aniquiladores-fc' },
  { url: 'https://kingsleague.pro/team/pio-fc/', teamId: 'pio-fc' }
]

const coachs = {
  'pio-fc': {},
  '1k': {},
  'aniquiladores-fc': {},
  'jijantes-fc': {},
  kunisports: {},
  'los-troncos-fc': {},
  'rayo-barcelona': {},
  'porcinos-fc': {},
  'ultimate-mostoles': {},
  'xbuyer-team': {},
  'el-barrio': {},
  'saiyans-fc': {}
}
const players = {
  'pio-fc': [],
  '1k': [],
  'aniquiladores-fc': [],
  'jijantes-fc': [],
  kunisports: [],
  'los-troncos-fc': [],
  'rayo-barcelona': [],
  'porcinos-fc': [],
  'ultimate-mostoles': [],
  'xbuyer-team': [],
  'el-barrio': [],
  'saiyans-fc': []
}
const teams = {}

async function donwloadDataTeam(page) {
  const { url, teamId } = page

  let imageFileName
  let imageExtension
  let imageURL
  let coachId

  const currentPresident = presidents.find((president) => (president.teamId = teamId))
  const presidentId = currentPresident.id

  const $ = await scrape(url)
  const $players = $('.uk-slider-items li')

  const teamName = $('.uk-heading-xlarge').text().trim()
  const socialMedias = extractSocialMedia($)

  $players.each(async (index, player) => {
    const $player = $(player)

    // Delete hide element
    $player.find('.id-player').remove()

    const name = $player.find('.el-title').text().trim()
    const position = $player.find('.el-content').text().trim()

    imageURL = $player.find('.el-image').attr('src')
    imageExtension = imageURL.split('.').at(-1)
    const filenameImage = imageURL.split('.').at(-2).split('/').at(-1)
    coachId = `${filenameImage}-${teamId}`

    imageFileName = `${filenameImage}.${imageExtension}`

    if (position === 'presidente') return

    if (position === 'entrenador') {
      coachs[teamId] = {
        name,
        id: coachId,
        teamId,
        image: `https://kings-league-api.lautaronorielasat.workers.dev/static/teams/${teamId}/${imageFileName}`
      }
    } else {
      let playerID
      const [firstName, lastName] = name.split(' ')

      if (firstName.includes('.')) {
        if (!lastName) {
          const [_, newID] = firstName.split('.')
          playerID = newID.toLowerCase()
        } else {
          playerID = lastName.toLowerCase()
        }
      } else {
        playerID = firstName.toLowerCase()
      }

      const playerIDSelector = position === 'jugador 11' ? 'jugador-11' : `jugador-${index - 1}`

      const playerStats = extractPlayerStats(playerIDSelector, position, $)

      players[teamId].push({
        name,
        position,
        id: playerID,
        teamId,
        image: `https://kings-league-api.lautaronorielasat.workers.dev/static/teams/${teamId}/${imageFileName}`,
        playerStats
      })
    }

    // await downloadImages(imageURL, imageFileName, teamId)
  })

  teams[teamName] = {
    name: teamName,
    teamId,
    image: `https://kings-league-api.lautaronorielasat.workers.dev/static/logos/${teamId}.svg`,
    inverse: `https://kings-league-api.lautaronorielasat.workers.dev/static/logos/${teamId}-inverse.svg`,
    coachId,
    presidentId,
    socialMedias,
    players: Object.values({ ...players[teamId] })
  }

  console.log('Guardando Datos')

  await writeDBFile('coaches', coachs)
  await writeDBFile('players', players)
  await writeDBFile('teams', teams)
}

async function downloadImages(imageURL, imageFileName, teamId) {
  try {
    logInfo(`Downloading images from ${teamId}`)
    const responseImage = await fetch(imageURL)

    const arrayBuffer = await responseImage.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    Promise.race([
      writeFile(`${STATIC_PATH}/teams/${teamId}/${imageFileName}`, buffer).then(() => {
        logSuccess(`Downloaded succesfully images from ${teamId}`)
      }),
      new Promise((_, reject) => setTimeout(reject, 1200))
    ])
  } catch (e) {
    console.log(e, 'Error')
    throw new Error(e)
  }
}

function extractSocialMedia($) {
  const $socialMedia = $('.uk-text-right div div a')

  const socialMedias = {}

  $socialMedia.each((_, media) => {
    const $media = $(media)

    const href = $media.attr('href')

    const span = $media.find('span').attr('uk-icon')
    const socialMedia = span.slice(5, -1).trim()

    if (socialMedias[socialMedia]) {
      const copy = socialMedias[socialMedia]

      socialMedias[socialMedia] = [copy, { href }]
    } else {
      socialMedias[socialMedia] = { href }
    }
  })

  return socialMedias
}

function extractPlayerStats(playerIDSelector, position, $) {
  const matchPropertyNames = {
    partidos: 'matchs',
    'penaltis parados': 'stopPenalties',
    'goles encajados': 'concededGoals',
    goles: 'goals',
    'asist.': 'assists',
    't.amarilla': 'yellowCards',
    't.roja': 'redCards',
    mvp: 'mvp'
  }
  const performancePropertyNames = {
    velocidad: 'speed',
    físico: 'physique',
    tiro: 'shooting',
    pase: 'passing',
    talento: 'talent',
    defensa: 'defense',
    reflejo: 'reflexes',
    paradas: 'saves',
    saque: 'kickoff',
    estirada: 'stretch'
  }

  const specialMatchSelector = position === 'Portero' ? '.league-goalk' : '.league-player'
  const specialPerformanceSelector = position === 'Portero' ? '.data-goalk' : '.data-player'

  const matchContainerSelector = `div div div ${specialMatchSelector}  > div > div`
  const performanceContainerSelector = `div div div ${specialPerformanceSelector} > div > div`
  const playerStats = {
    matchStats: {},
    performanceStats: {}
  }

  const $containerMatchStats = $(`.${playerIDSelector} ${matchContainerSelector}`)

  $containerMatchStats.each((_, stat) => {
    const $stat = $(stat)
    const { scoreName, scoreValue } = extractScores($stat, matchPropertyNames)

    playerStats.matchStats[scoreName] = scoreValue
  })

  if (playerIDSelector === 'jugador-11') return playerStats

  const $containerPerformanceStats = $(`.${playerIDSelector} ${performanceContainerSelector}`)

  $containerPerformanceStats.each((_, stat) => {
    const $stat = $(stat)
    const { scoreName, scoreValue } = extractScores($stat, performancePropertyNames)

    playerStats.performanceStats[scoreName] = scoreValue
  })

  playerStats.performanceStats['score'] = calculateScore(playerStats.performanceStats)

  return playerStats
}

const extractScores = ($stat, propertyNames) => {
  let scoreName = $stat.find('.el-meta').text().trim()
  const scoreValue = Number($stat.find('h3').text().trim())

  scoreName = propertyNames[scoreName]

  return { scoreName, scoreValue }
}

const calculateScore = (stats) => {
  const values = Object.values(stats)

  const totalValue = values.reduce((acc, currentValue) => acc + currentValue)
  const totalScore = Math.round(totalValue / values.length)

  return totalScore
}

pages.map(donwloadDataTeam)

import { scrape } from './utils.js'
import { writeDBFile } from '../db/index.js'
import { extractSocialMedia } from './extract_socialmedia.js'
import { extractPlayerStats } from './extract_player_stats.js'
import presidents from '../db/presidents.json' assert { type: 'json' }

const MINIFIED_NAMES = {
  'Ultimate Móstoles': 'ULT',
  '1K FC': '1K',
  'Saiyans FC': 'SAI',
  'Rayo de Barcelona': 'RDB',
  'Jijantes FC': 'JFC',
  'XBUYER TEAM': 'XBU',
  'Aniquiladores FC': 'ANI',
  'El Barrio': 'ELB',
  'Los Troncos FC': 'TFC',
  Kunisports: 'KNS',
  'PIO FC': 'PIO',
  'Porcinos FC': 'POR'
}

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
const colors = {
  kunisports: '#101920',
  'los-troncos-fc': '#31585a',
  '1k': '#6f68f4',
  'pio-fc': '#fff68d',
  'saiyans-fc': '#d4293d',
  'el-barrio': '#49b2ad',
  'jijantes-fc': '#d4293d',
  'aniquiladores-fc': '#ea4163',
  'xbuyer-team': '#979797',
  'ultimate-mostoles': '#7b7b7b',
  'porcinos-fc': '#d91f5d',
  'rayo-barcelona': '#f6ab34'
}

async function donwloadDataTeam(page) {
  const { url, teamId } = page

  let imageFileName
  let imageExtension
  let imageURL
  let coachId

  const currentPresident = presidents.find((president) => president.teamId === teamId)
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
    imageExtension = 'webp'
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
    minifiedName: MINIFIED_NAMES[teamName],
    teamId,
    image: `https://kings-league-api.lautaronorielasat.workers.dev/static/logos/${teamId}.svg`,
    inverse: `https://kings-league-api.lautaronorielasat.workers.dev/static/logos/${teamId}-inverse.svg`,
    coachId,
    color: colors[teamId],
    presidentId,
    socialMedias,
    players: Object.values({ ...players[teamId] })
  }

  console.log('Guardando Datos')

  await writeDBFile('coaches', coachs)
  await writeDBFile('players', players)
  await writeDBFile('teams', teams)
}

pages.map(donwloadDataTeam)

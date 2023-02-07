import { writeDBFile } from '../db/index.js'
import { IDS, scrape } from './utils.js'

const url = 'https://kingsleague.pro/calendario/'

const $ = await scrape(url)
const $container = $('#calendarMatch')
const schedule = []

$container.each((index, element) => {
  const $element = $(element)

  const playingDay = $element.find('h3').text().trim()

  const currentCalendar = {
    playingDay,
    plays: []
  }

  const trs = $element.find('tr')

  trs.each((_, tr) => {
    const $currentRow = $(tr)
    const currentPlay = {}

    const teams = $currentRow.find('td')
    const [teamOne, , , , , , teamTwo, values] = teams

    const teamOneName = $(teamOne).text().trim()
    const teamTwoName = $(teamTwo).text().trim()
    const results = $(values).text().trim()

    currentPlay.result = results
    currentPlay.teamOne = {
      name: teamOneName,
      teamId: IDS[teamOneName]
    }
    currentPlay.teamTwo = {
      name: teamTwoName,
      teamId: IDS[teamTwoName]
    }

    currentCalendar.plays.push(currentPlay)
  })

  schedule.push(currentCalendar)
})

await writeDBFile('schedule', schedule)

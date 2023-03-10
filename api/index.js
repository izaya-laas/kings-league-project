import { Hono } from 'hono'
import { cors } from 'hono/cors'
// import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'
import coaches from '../db/coaches.json'
import players from '../db/players.json'
import mvp from '../db/mvp.json'
import topScorer from '../db/top_scorers.json'
import topAssists from '../db/top_assists.json'
import partners from '../db/partners.json'
import schedule from '../db/schedule.json'

const app = new Hono()

// app.use('*', prettyJSON())

app.use('/leaderboard', cors())
app.use('/mvp', cors())
app.use('/top-scorer', cors())
app.use('/top-assists', cors())
app.use('/partners', cors())
app.use('/schedule', cors())
app.use('/presidents', cors())
app.use('/coaches', cors())
app.use('/players', cors())
app.use('/teams', cors())

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns the leaderboard'
    },
    {
      endpoint: '/presidents',
      description: 'Returns the presidents of kings league'
    },
    {
      endpoint: '/teams',
      description: 'Returns teams of kings league'
    },
    {
      endpoint: '/players',
      description: 'Returns the players of kings league'
    },
    {
      endpoint: '/coaches',
      description: 'Returns the coaches of kings league'
    },
    {
      endpoint: '/mvp',
      description: 'Returns top mvp players of kings league'
    },
    {
      endpoint: '/top-scorers',
      description: 'Returns top scorer players of kings league'
    },
    {
      endpoint: '/top-assists',
      description: 'Returns top assists players of kings league'
    },
    {
      endpoint: '/partners',
      description: 'Returns partners of kings league'
    },
    {
      endpoint: '/schedule',
      description: 'Returns shedule of kings league'
    }
  ])
)

app.get('/leaderboard', (ctx) => ctx.json(leaderboard))
app.get('/mvp', (ctx) => ctx.json(mvp))
app.get('/top-scorer', (ctx) => ctx.json(topScorer))
app.get('/top-assists', (ctx) => ctx.json(topAssists))
app.get('/partners', (ctx) => ctx.json(partners))
app.get('/schedule', (ctx) => ctx.json(schedule))
app.get('/presidents', (ctx) => ctx.json(presidents))
app.get('/coaches', (ctx) => ctx.json(coaches))
app.get('/players', (ctx) => ctx.json(players))

app.get('/leaderboard/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundLeaderboardTeam = leaderboard.find(
    (leaderboardTeam) => leaderboardTeam.team.teamId === id
  )

  if (!foundLeaderboardTeam) return ctx.json({ message: 'President Dont found' }, 404)

  return ctx.json(foundLeaderboardTeam)
})

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)

  if (!foundPresident) return ctx.json({ message: 'President Dont found' }, 404)

  return ctx.json(foundPresident)
})

app.get('/teams', (ctx) => ctx.json(teams))

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = Object.values(teams).find((team) => team.teamId === id)
  console.log(foundTeam)

  if (!foundTeam) return ctx.json({ message: 'Team Dont found' }, 404)

  return ctx.json(foundTeam)
})

app.get('/coaches/:id', (ctx) => {
  const id = ctx.req.param('id')
  const coachesEntries = Object.values(coaches)
  const foundCoach = coachesEntries.find((coach) => coach.id === id)

  if (!foundCoach) return ctx.json({ message: "Coach don't found" }, 404)

  return ctx.json(foundCoach)
})

app.get('/players/:teamId', (ctx) => {
  const teamId = ctx.req.param('teamId')
  const foundTeam = players[teamId]

  if (!foundTeam) return ctx.json({ message: "Team don't found" }, 404)

  return ctx.json(foundTeam)
})

app.get('/players/:teamId/:playerId', (ctx) => {
  const teamId = ctx.req.param('teamId')
  const playerId = ctx.req.param('playerId')

  const foundPlayer = players[teamId].find((player) => player.id === playerId)

  if (!foundPlayer) return ctx.json({ message: "Player don't found" }, 404)

  return ctx.json(foundPlayer)
})

app.use('/static/*', serveStatic({ root: './' }))

app.notFound((ctx) => {
  const { pathname } = new URL(ctx.req.url)

  if (pathname.at(-1) === '/') {
    return ctx.redirect(pathname.slice(0, -1))
  }

  return ctx.json({ message: 'Error endpoint dont exists' }, 404)
})

export default app

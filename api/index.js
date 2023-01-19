import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'
import coaches from '../db/coaches.json'

const app = new Hono()

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
    }
  ])
)

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/presidents', (ctx) => {
  return ctx.json(presidents)
})

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)

  if (!foundPresident) return ctx.json({ message: 'President Dont found' }, 404)

  return ctx.json(foundPresident)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id === id)

  if (!foundTeam) return ctx.json({ message: 'Team Dont found' }, 404)

  return ctx.json(foundTeam)
})

app.get('/coaches', (ctx) => {
  return ctx.json(coaches)
})

app.get('/coaches/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundCoach = coaches.find((coach) => coach.id === id)

  if (!foundCoach) return ctx.json({ message: "Coach don't found" }, 404)

  return ctx.json(foundCoach)
})

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((ctx) => {
  const { pathname } = new URL(ctx.req.url)

  if (pathname.at(-1) === '/') {
    return ctx.redirect(pathname.slice(0, -1))
  }

  return ctx.json({ message: 'President Dont found' }, 404)
})

export default app

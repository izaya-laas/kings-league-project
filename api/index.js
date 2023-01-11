import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'

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

app.get('/static/*', serveStatic({ root: './' }))

export default app

# Kings League Project

## Descripcion del proyecto

En este proyecto fullstack, realizo una replica de la API y la pagina web de [Kings-League](https://kingsleague.pro/).

### Tecnologias usadas

- [Hono](https://hono.dev/): Utilizo hono para la creación de la API, utilizando su modulo de cloudflare workers.
- [Cloudflare](https://www.cloudflare.com/es-es/): Utilizo cloudflare para que los tiempos de respuestas de la API sean casi instantaneos.
- [Cheerio](): Utilizo la libreria de cheerio para realizar el scrapping a la web de la kings league. Porque es ligero, sencillo y la web es SSR, por lo que utilizar Cheerio es mucho mejor en rendimiento que Puppeteer o algun otro.
- [Astro](https://astro.build/): Utilizo Astro para obtener un mejor rendimiento y SEO de la pagina, ya que en mayor parte su contenido es estatico.
- [Preact](https://preactjs.com/): Utilizo Preact como una alternativa ligera a React, buscando el mayor performance, para algunos componentes que requerian estados.
- [Tailwind](https://tailwindcss.com/): Utilizo Tailwind para un estilado rapido y comodo.

## API

Dirección: https://kings-league-api.lautaronorielasat.workers.dev/

### Endpoints

- `GET /leaderboard`: Devuelve la clasificación de la Kings League.
- `GET /leaderboard/:teamId`: Devuelve la clasificación de un equipo de la Kings League.
- `GET /teams`: Devuelve los equipos de la Kings League.
- `GET /teams/:id`: Devuelve un equipo de la Kings League.
- `GET /coaches`: Devuelve los coachs de la Kings League.
- `GET /coaches/:coachId`: Devuelve un coach de la Kings League.
- `GET /presidents`: Devuelve los presidentes de la Kings League.
- `GET /presidents/presidentId`: Devuelve un presidente de la Kings League.
- `GET /players`: Devuelve los jugadores de la Kings League.
- `GET /players/:teamId`: Devuelve los jugadores de un equipo de la Kings League.
- `GET /players/:teamId/:playerId`: Devuelve un jugador de la Kings League.
- `GET /mvp`: Devuelve el top de jugadores con MVPs de la Kings League.
- `GET /top-scorer`: Devuelve el top de jugadores con mayores goles de la Kings League.
- `GET /top-assists`: Devuelve el top de jugadores con mayores asistencias de la Kings League.
- `GET /schedule`: Devuelve el calendario de la Kings League.
- `GET /partners`: Devuelve los partners de la Kings League.

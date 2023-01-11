import { writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/')

const readDBFile = async (fileName) => {
  return await readFile(`${DB_PATH}/${fileName}.json`, 'utf-8').then(JSON.parse)
}

export const TEAMS = await readDBFile('teams')
export const PRESIDENTS = await readDBFile('presidents')

export const writeDBFile = (fileName, data) => {
  return writeFile(
    `${DB_PATH}/${fileName}.json`,
    JSON.stringify(data, null, 2),
    'utf-8'
  )
}

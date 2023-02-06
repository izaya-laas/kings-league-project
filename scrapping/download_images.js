import { writeFile } from 'node:fs/promises'
import { logInfo, logSuccess } from './log.js'
import fetch from 'node-fetch'
import path from 'node:path'

const STATIC_PATH = path.join(process.cwd(), './assets/static')

export async function downloadImages(imageURL, imageFileName, teamId) {
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

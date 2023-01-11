import path from 'node:path'
import { writeFile, readFile } from 'node:fs/promises'
import fetch from 'node-fetch'

const STATIC_PATH = path.join(process.cwd(), 'assets/static/presidents')
const DB_PATH = path.join(process.cwd(), './db/')
const RAW_PRESIDENTS = await readFile(
  `${DB_PATH}/raw-presidents.json`,
  'utf-8'
).then(JSON.parse)

const promises = RAW_PRESIDENTS.map(async (presidentsInfo) => {
  const { slug: id, title, _links } = presidentsInfo
  const { rendered: name } = title

  const imagesEnpoints = _links['wp:attachment']
  const { href: imageEndpoint } = imagesEnpoints[0]

  const responseImageEndpoint = await fetch(imageEndpoint)
  const data = await responseImageEndpoint.json()
  const [imageInfo] = data
  const {
    guid: { rendered: imageUrl }
  } = imageInfo

  const imageExtension = imageUrl.split('.').at(-1)

  const responseImage = await fetch(imageUrl)
  const arrayBuffer = await responseImage.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const imageFileName = `${id}.${imageExtension}`
  await writeFile(`${STATIC_PATH}/${imageFileName}`, buffer)

  return { id, name, image: imageFileName, teamId: 0 }
})

const presidents = await Promise.all(promises)
const presidentsJson = JSON.stringify(presidents, null, 2)

await writeFile(`${DB_PATH}/presidents.json`, presidentsJson)

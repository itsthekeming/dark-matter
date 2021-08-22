import { getServerSidePaths } from 'lib/compendium'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function getRandomSlug() {
  const paths = await getServerSidePaths()
  const slug = paths[Math.floor(Math.random() * paths.length)]

  return { slug }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getRandomSlug()

  res.status(200).json(data)
}

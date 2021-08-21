import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'

const COMPENDIUM_ROOT = path.join(process.cwd(), '/src/compendium')

export async function getPathList(entryPathCache: Record<string, string>) {
  const directory = await fs.readdir(COMPENDIUM_ROOT)

  return directory.map((file) => {
    const extension = path.extname(file)
    const baseName = path.basename(file, extension)

    entryPathCache[baseName] = path.join(COMPENDIUM_ROOT, file)

    return {
      params: {
        id: [baseName],
      },
    }
  })
}

export async function getCompendiumEntry(filePath: string) {
  const entry = await fs.readFile(filePath, 'utf8')

  // retrieve metadata
  const metadata = matter(entry)

  return {
    content: metadata.content,
    ...metadata.data,
  }
}

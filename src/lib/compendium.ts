import fs from 'fs-extra'
import matter from 'gray-matter'
import path from 'path'

type Entry = {
  content: string
  published: boolean
  title: string
  tags: string[]
}

const COMPENDIUM_ROOT = path.join(process.cwd(), '.compendium')

export async function getPaths(entryPathCache: Record<string, string>) {
  const entries = await fs.readdir(COMPENDIUM_ROOT)

  return (
    await Promise.all(
      entries.map(async (filePath) => {
        const baseName = path.basename(filePath, path.extname(filePath))

        entryPathCache[baseName] = path.join(COMPENDIUM_ROOT, filePath)

        const content = await fs.readFile(path.join(COMPENDIUM_ROOT, filePath), 'utf8')

        const {
          data: { published },
        } = matter(content)

        if (published) {
          return {
            params: {
              slug: baseName,
            },
          }
        }

        return null
      })
    )
  ).filter((path) => !!path)
}

export async function getServerSidePaths() {
  const paths = await fs.readJson(path.join(process.cwd(), '/.next', '/routes-manifest.json'))

  console.log(paths)

  return paths
}

export async function getEntry(filePath: string) {
  const entry = await fs.readFile(filePath, 'utf8')

  // retrieve metadata
  const { content, data } = matter(entry)

  return {
    content,
    ...data,
  } as Entry
}

export async function getAllEntryTitlesAndSlugs() {
  const entries = await fs.readdir(COMPENDIUM_ROOT)

  return (
    await Promise.all(
      entries.map(async (entry) => {
        const {
          data: { title, published },
        } = matter(await fs.readFile(path.join(COMPENDIUM_ROOT, entry), 'utf8'))

        if (published) {
          return {
            title,
            slug: path.basename(entry, path.extname(entry)),
          }
        }

        return null
      })
    )
  )
    .filter((entry) => !!entry)
    .sort((first, second) => first.title.localeCompare(second.title) || 0)
}

export async function getAllTagsWithEntries() {
  const entryPaths = await fs.readdir(COMPENDIUM_ROOT)

  const tags: Record<string, { entries: { slug: string; title: string }[] }> = {}

  await Promise.all(
    entryPaths.map(async (entryPath) => {
      const slug = path.basename(entryPath, path.extname(entryPath))
      const { title, ...entry } = await getEntry(path.join(COMPENDIUM_ROOT, entryPath))

      if (entry.published) {
        entry.tags.forEach((tag) => {
          if (!tags[tag]) {
            tags[tag] = {
              entries: [],
            }
          }

          tags[tag].entries.push({ title, slug })
        })
      }
    })
  )

  return Object.keys(tags)
    .map((tag) => ({
      name: tag,
      entries: tags[tag].entries.sort(
        (first, second) => first.title.localeCompare(second.title) || 0
      ),
    }))
    .sort((first, second) => first.name.localeCompare(second.name) || 0)
}

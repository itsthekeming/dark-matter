import { getEntryData, getPathList, printPaths } from 'lib/compendium'
import { GetStaticPaths, GetStaticProps } from 'next'
import path from 'path'

type ArticleProps = {
  entryData: {
    id: string[]
    content: string
    title: string
  }
}

const COMPENDIUM_ROOT = path.join(process.cwd(), '/_compendium')

export default function Article({ entryData: { id, content, title } }: ArticleProps) {
  return (
    <>
      <div>{title}</div>
      <div>{content}</div>
    </>
  )
}

// Define a cache that will map the slug to the actual path.
const pageFileCache = {}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Retrieve the full path from a cache. Generate cache if it doesn't exist.
  // id is undefined at index '/', so set slugPath as '' instead

  let slugPath: string = ''
  if (params.id) {
    slugPath = (params.id as string[]).join('/')
  }

  if (!pageFileCache[slugPath]) {
    await getStaticPaths({})
  }

  const markdownFile = pageFileCache[slugPath]

  // Get entryData for the slug and markdown file
  const entryData = await getEntryData(slugPath, markdownFile)

  return {
    props: {
      entryData,
    },
  }
}

// Get static paths is a wrapper around the getPathList
export const getStaticPaths: GetStaticPaths = async () => {
  let paths = await getPathList(COMPENDIUM_ROOT, COMPENDIUM_ROOT, pageFileCache)

  printPaths(paths)

  return {
    paths,
    fallback: false,
  }
}

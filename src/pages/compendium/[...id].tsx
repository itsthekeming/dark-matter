import { Text } from '@arwes/core'
import { getEntryData, getPathList } from 'lib/compendium'
import Markdown from 'markdown-to-jsx'
import { GetStaticPaths, GetStaticProps } from 'next'
import path from 'path'
import { useState } from 'react'

const COMPENDIUM_ROOT = path.join(process.cwd(), '/_compendium')

type ArticleProps = {
  entryData: {
    id: string[]
    content: string
    title: string
  }
}

export default function Article({ entryData: { id, content, title } }: ArticleProps) {
  const duration = { enter: 1000, exit: 1000 }
  const [activate, setActivate] = useState(true)

  return (
    <>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: Text,
              props: {
                as: 'h1',
                animate: { duration, activate },
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
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

  return {
    paths,
    fallback: false,
  }
}

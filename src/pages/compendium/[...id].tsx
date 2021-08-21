import { Text } from '@arwes/core'
import { getCompendiumEntry, getPathList } from 'lib/compendium'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { HTMLAttributes } from 'react'

type ArticleProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  title: string
  tags?: string[]
}

const components = {
  Text,
  h1: function h1(props: HTMLAttributes<HTMLHeadingElement>) {
    return <Text as="h1" {...props} />
  },
  p: function p(props: HTMLAttributes<HTMLParagraphElement>) {
    return <Text as="p" {...props} />
  },
}

export default function Article({ source, title, tags }: ArticleProps) {
  return (
    <>
      {tags?.map((tag) => (
        <Text key={tag} as="p">
          {tag}
        </Text>
      ))}
      <MDXRemote {...source} components={components} />
    </>
  )
}

// we want the paths to not include the extension.
// however, we need the extension to retrieve the file itself.
// thus, we define a cache that maps the baseName (used for the path in getStaticPaths) to the full file path (used to retrieve the file for getStaticProps)
const entryPathCache: Record<string, string> = {}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params.id as string[]).join()

  if (!entryPathCache[slug]) {
    await getStaticPaths({})
  }

  const entry = await getCompendiumEntry(entryPathCache[slug])
  const source = await serialize(entry.content)

  return {
    props: {
      source,
      ...entry,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = await getPathList(entryPathCache)

  return {
    paths,
    fallback: false,
  }
}

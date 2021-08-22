import { Text } from '@arwes/core'
import { CompendiumLayout } from 'components'
import { getEntry, getPaths } from 'lib/compendium'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { HTMLAttributes, ReactElement } from 'react'

type EntryProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  title: string
  category: string
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

export default function Entry({ source, title, category, tags }: EntryProps) {
  return (
    <>
      <Head>
        <title>{title} - The Compendium</title>
      </Head>
      <div className="w-full max-w-6xl m-auto">
        <article>
          <div className="border-b border-[#00F8F8]">
            <Text as="h1" className="text-3xl mb-1">
              {title}
            </Text>
          </div>
          <aside>
            <Text className="text-xs mt-1">From The Compendium, the galactic encyclopedia</Text>
          </aside>
          <MDXRemote {...source} components={components} />
        </article>
      </div>
    </>
  )
}

Entry.getLayout = function getLayout(page: ReactElement) {
  return <CompendiumLayout>{page}</CompendiumLayout>
}

// we want the paths to not include the extension.
// however, we need the extension to retrieve the file itself.
// thus, we define a cache that maps the baseName (used for the path in getStaticPaths) to the full file path (used to retrieve the file for getStaticProps)
const entryPathCache: Record<string, string> = {}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string

  if (!entryPathCache[slug]) {
    await getStaticPaths({})
  }

  const { content, ...metadata } = await getEntry(entryPathCache[slug])
  const source = await serialize(content)

  return {
    props: {
      source,
      ...metadata,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = await getPaths(entryPathCache)

  return {
    paths,
    fallback: false,
  }
}

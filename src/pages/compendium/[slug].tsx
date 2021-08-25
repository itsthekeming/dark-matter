import { Text, List } from '@arwes/core'
import { CompendiumLayout } from 'components'
import { getEntry, getPaths } from 'lib/compendium'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import Link from 'next/link'
import { AnchorHTMLAttributes, HTMLAttributes, ReactElement, useEffect } from 'react'
import toc from 'markdown-toc'

type EntryProps = {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  tableOfContents: any
  title: string
  category: string
  tags?: string[]
}

const components = {
  Text,
  h1: function h1(props: HTMLAttributes<HTMLHeadingElement>) {
    return <Text as="h1" className="!block" {...props} />
  },
  h2: function h1(props: HTMLAttributes<HTMLHeadingElement>) {
    return <Text as="h2" className="!block" {...props} />
  },
  p: function p(props: HTMLAttributes<HTMLParagraphElement>) {
    return <Text as="p" className="!block text-base" {...props} />
  },
  a: function a({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
      <Text>
        <Link href={href} passHref>
          <a {...props} />
        </Link>
      </Text>
    )
  },
  strong: function strong(props: HTMLAttributes<HTMLElement>) {
    return <strong className="font-bold" {...props} />
  },
  ul: function ul(props: HTMLAttributes<HTMLUListElement>) {
    return <List {...props} />
  },
}

export default function Entry({ source, tableOfContents, title, category, tags }: EntryProps) {
  useEffect(() => {
    console.log(tableOfContents)
  }, [])

  return (
    <>
      <Head>
        <title>{title} - The Compendium</title>
      </Head>
      <div className="w-full max-w-6xl m-auto">
        <article>
          <div className="border-b border-[#00F8F8]">
            <Text as="h1" className="text-3xl mb-2">
              {title}
            </Text>
            <strong></strong>
          </div>
          <aside className="mt-2">
            <Text className="text-xs">From The Compendium, the galactic encyclopedia</Text>
          </aside>
          <div className="mt-8">
            <MDXRemote {...source} components={components} />
          </div>
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
  const tableOfContents = toc(content).json

  return {
    props: {
      source,
      tableOfContents,
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

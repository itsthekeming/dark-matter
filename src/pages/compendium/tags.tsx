import { List, Text } from '@arwes/core'
import { CompendiumLayout } from 'components'
import { getAllTagsWithEntries } from 'lib/compendium'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'

type TagsProps = {
  tags: {
    name: string
    entries: { title: string; slug: string }[]
  }[]
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="w-full max-w-6xl m-auto">
      <List className="pl-0 space-y-12">
        {tags.map(({ name, entries }) => (
          <li key={name} className="marker:content-none marker:hidden">
            <div className="mb-4 flex justify-between border-b border-[#00F8F8]">
              <Text as="h2" className="text-xl mb-0">
                {name}
              </Text>
              <Text as="aside" className="text-xs">
                {entries.length === 1 ? '1 entry' : `${entries.length} entries`}
              </Text>
            </div>
            <List className="pl-0 grid grid-cols-5 gap-y-4">
              {entries.map(({ title, slug }) => (
                <li key={slug} className="marker:content-none marker:hidden">
                  <Link href={`/compendium/${slug}`}>{title}</Link>
                </li>
              ))}
            </List>
          </li>
        ))}
      </List>
    </div>
  )
}

Tags.getLayout = function getLayout(page: ReactElement) {
  return <CompendiumLayout>{page}</CompendiumLayout>
}

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getAllTagsWithEntries()

  return {
    props: {
      tags,
    },
  }
}

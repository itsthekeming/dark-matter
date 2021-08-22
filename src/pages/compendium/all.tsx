import { List, Text } from '@arwes/core'
import { CompendiumLayout } from 'components'
import { getAllEntryTitlesAndSlugs } from 'lib/compendium'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'

type AllEntriesProps = {
  firstCharacters: {
    character: string
    entries: {
      slug: string
      title: string
    }[]
  }[]
}

export default function AllEntries({ firstCharacters }: AllEntriesProps) {
  return (
    <div className="w-full max-w-6xl m-auto">
      <List className="pl-0 space-y-12">
        {firstCharacters.map(({ character, entries }) => (
          <li key={character} className="marker:content-none marker:hidden">
            <div className="mb-4 flex justify-between border-b border-[#00F8F8]">
              <Text as="h2" className="text-xl mb-0">
                {character}
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

AllEntries.getLayout = function getLayout(page: ReactElement) {
  return <CompendiumLayout>{page}</CompendiumLayout>
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getAllEntryTitlesAndSlugs()

  const charactersWithEntries: Record<
    string,
    { character: string; entries: { slug: string; title: string }[] }
  > = {}

  await Promise.all(
    entries.map(async ({ slug, title }) => {
      const firstCharacter = title.charAt(0)

      if (!charactersWithEntries[firstCharacter]) {
        charactersWithEntries[firstCharacter] = {
          character: firstCharacter,
          entries: [],
        }
      }

      charactersWithEntries[firstCharacter].entries.push({ slug, title })
    })
  )

  const firstCharacters = Object.keys(charactersWithEntries)
    .map((character) => ({
      character,
      entries: charactersWithEntries[character].entries,
    }))
    .sort((first, second) => first.character.localeCompare(second.character) || 0)

  return {
    props: {
      firstCharacters,
    },
  }
}

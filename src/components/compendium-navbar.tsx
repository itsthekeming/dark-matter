import { Text } from '@arwes/core'
import Link from 'next/link'

export function CompendiumNavbar() {
  return (
    <header className="w-screen py-4 mb-8 border-b border-[#00F8F8]">
      <div className="max-w-6xl w-full m-auto flex">
        <Text as="h2" className="mb-0">
          The Compendium
        </Text>
        <div className="ml-12 flex items-center space-x-6">
          <Text>
            <Link href="/compendium">Home</Link>
          </Text>
          <Text>
            <Link href="/compendium/tags">Tags</Link>
          </Text>
          <Text>
            <Link href="/compendium/all">All Entries</Link>
          </Text>
        </div>
      </div>
    </header>
  )
}

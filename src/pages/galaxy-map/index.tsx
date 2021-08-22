import { Figure, Text } from '@arwes/core'
import Link from 'next/link'

export default function GalaxyMap() {
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full max-w-6xl m-auto text-center">
      <Text as="h1" className="text-4xl">
        Under Construction
      </Text>
      <Text as="p">This page is still a work in progress. Check back later.</Text>
      <Figure
        src="/assets/images/shipyard.webp"
        alt="A lone figure walks toward an under construction spaceship suspended above the ground in a large shipyard"
        fluid
        className="max-w-4xl"
      >
        The <Link href="/compendium/hhcs-saratoga">HHCS Saratoga</Link> under construction at{' '}
        <Link href="/compendium/nairobi-naval-shipyard">Nairobi Naval Shipyard</Link> on{' '}
        <Link href="/compendium/earth">Earth</Link>.
      </Figure>
    </div>
  )
}

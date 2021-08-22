import { Figure, Text } from '@arwes/core'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full max-w-6xl m-auto text-center">
      <Text as="h1" className="text-4xl">
        There&apos;s no treasure in that spaceship
      </Text>
      <Text>Don&apos;t get lost in The Black, spacer!</Text>
      <Text>Maybe one of these links will help you find your way.</Text>
      <div className="space-x-8 my-4">
        <Text className="text-xl">
          <Link href="/compendium">The Compendium</Link>
        </Text>
        <Text className="text-xl">
          <Link href="/galaxy-map">The Galaxy Map</Link>
        </Text>
      </div>
      <Figure
        src="/assets/images/salvage-operation.webp"
        alt="A lone figure walks toward an under construction spaceship suspended above the ground in a large shipyard"
        fluid
        className="max-w-4xl"
      >
        An exploration vessel investigates a derelict early human ship.
      </Figure>
    </div>
  )
}

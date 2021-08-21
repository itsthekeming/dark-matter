import { Text, Card, Button } from '@arwes/core'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className="py-4 flex flex-col space-y-20 justify-center items-center lg:py-0 lg:h-screen lg:w-screen">
      <Text as="h1" className="text-center text-6xl">
        Dark Matter
      </Text>
      <div className="px-4 flex flex-col lg:flex-row justify-center space-y-20 lg:px-0 lg:space-x-20 lg:space-y-0">
        <Card
          title="The Compendium"
          image={{
            src: '/dark-matter/assets/images/library.webp',
            alt: 'A futuristic library with two entities speaking, one towering over the other',
          }}
          hover
          options={
            <Button onClick={() => router.push('/compendium')} palette="primary">
              Enter The Compendium
            </Button>
          }
          className="lg:w-96"
        >
          <Text>An archive of all knowledge in the known galaxy.</Text>
        </Card>
        <Card
          title="Galaxy Map"
          image={{
            src: '/dark-matter/assets/images/galaxy.webp',
            alt: 'The Milky Way galaxy',
          }}
          hover
          options={
            <Button onClick={() => router.push('/galaxy-map')} palette="primary">
              Enter The Galaxy Map
            </Button>
          }
          className="lg:w-96"
        >
          <Text>Find your way in the vast seas of stars... or get lost in the Void.</Text>
        </Card>
      </div>
    </div>
  )
}

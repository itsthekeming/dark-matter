import { Button, Text } from '@arwes/core'
import { useRouter } from 'next/router'
import React from 'react'

export default function Navbar() {
  const router = useRouter()

  return (
    <header className="w-screen py-4 mb-8 border-b border-[#00F8F8]">
      <div className="max-w-6xl w-full m-auto flex justify-between">
        <Text as="h2" className="mb-0">
          Dark Matter
        </Text>
        <div className="space-x-4">
          <Button onClick={() => router.push('/compendium')} palette="primary">
            The Compendium
          </Button>
          <Button onClick={() => router.push('/galaxy-map')} palette="primary">
            The Galaxy Map
          </Button>
        </div>
      </div>
    </header>
  )
}

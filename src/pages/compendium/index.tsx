import { Text } from '@arwes/core'
import Navbar from 'components/navbar'
import React from 'react'

export default function Compendium() {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-6xl m-auto">
        <Text as="h1">The Compendium</Text>
      </div>
    </>
  )
}

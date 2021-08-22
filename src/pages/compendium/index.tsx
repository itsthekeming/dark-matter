import { CompendiumLayout } from 'components'
import { ReactElement } from 'react'

export default function Compendium() {
  return <div className="w-full max-w-6xl m-auto"></div>
}

Compendium.getLayout = function getLayout(page: ReactElement) {
  return <CompendiumLayout>{page}</CompendiumLayout>
}

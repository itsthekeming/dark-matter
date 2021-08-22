import { CompendiumLayout } from 'components'
import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'

export default function Compendium() {
  return <div className="w-full max-w-6xl m-auto"></div>
}

Compendium.getLayout = function getLayout(page: ReactElement) {
  return <CompendiumLayout>{page}</CompendiumLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/compendium/all',
      permanent: true,
    },
  }
}

import { getPaths, getServerSidePaths } from 'lib/compendium'
import { GetServerSideProps } from 'next'

export default function RandomEntry() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  const paths = await getServerSidePaths()

  const slug = paths[Math.floor(Math.random() * paths.length)]

  return {
    redirect: {
      destination: `/compendium/${slug}`,
      permanent: false,
    },
  }
}

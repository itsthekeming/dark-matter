import { getPaths, getServerSidePaths } from 'lib/compendium'
import { GetServerSideProps } from 'next'
import { getRandomSlug } from 'pages/api/compendium/random'

export default function RandomEntry() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { slug } = await getRandomSlug()

  return {
    redirect: {
      destination: `/compendium/${slug}`,
      permanent: false,
    },
  }
}

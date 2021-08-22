import { getPaths, getRandomSlug } from 'lib/compendium'
import { GetServerSideProps } from 'next'

export default function RandomEntry() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  const slug = await getRandomSlug()

  return {
    redirect: {
      destination: `/compendium/${slug}`,
      permanent: false,
    },
  }
}

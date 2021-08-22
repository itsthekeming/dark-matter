import { getPaths } from 'lib/compendium'
import { GetStaticProps } from 'next'

export default function RandomEntry() {
  return null
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paths = await getPaths({})

  const {
    params: { slug },
  } = paths[Math.floor(Math.random() * paths.length)]

  return {
    redirect: {
      destination: `/compendium/${slug}`,
      permanent: false,
    },
  }
}

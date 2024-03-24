import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'
import { GetServerSideProps } from 'next'
import Challenge, {
  IChallengeProps,
} from '@/client/components/screens/challenge'

const ChallengePage: NextPageWithLayout<IChallengeProps> = (props) => {
  return <Challenge id={props.id} />
}
export default ChallengePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  if (!id) {
    return { notFound: true }
  }
  return {
    props: {
      id,
    },
  }
}

ChallengePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ChallengePage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

ChallengePage.theme = {
  themes: ['daisy', 'cmyk'],
}

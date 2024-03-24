//import { MyProfile } from '@client/components/screens/profile'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'
import ChallengesList from '@/client/components/screens/challenge/challenges.list'

const ChallengesPage: NextPageWithLayout = () => {
  return <ChallengesList />
}
export default ChallengesPage

ChallengesPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ChallengesPage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

ChallengesPage.theme = {
  themes: ['daisy', 'cmyk'],
}

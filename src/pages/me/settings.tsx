import ProfileSettings from '@client/components/screens/profile/settings'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, {
  BackendAddressProvider,
  ProfileSettingsProvider,
} from '@client/providers'

const ProfilePage: NextPageWithLayout = () => {
  return <ProfileSettings />
}
export default ProfilePage

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ProfilePage.theme}>
      <ProfileSettingsProvider>
        <BackendAddressProvider>
          <Layout title="Profile">{page}</Layout>
        </BackendAddressProvider>
      </ProfileSettingsProvider>
    </Providers>
  )
}

ProfilePage.theme = {
  themes: ['daisy', 'cmyk'],
}

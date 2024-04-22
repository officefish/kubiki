import ProfileSettings from '@client/screens/profile/settings'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, {
  BackendAddressProvider,
  ProfileSettingsProvider,
  ProfileSettingsEditorProvider,
} from '@client/providers'

const ProfilePage: NextPageWithLayout = () => {
  return <ProfileSettings />
}
export default ProfilePage

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ProfilePage.theme}>
      <ProfileSettingsProvider>
        <ProfileSettingsEditorProvider>
          <BackendAddressProvider>
            <Layout title="Profile">{page}</Layout>
          </BackendAddressProvider>
        </ProfileSettingsEditorProvider>
      </ProfileSettingsProvider>
    </Providers>
  )
}

ProfilePage.theme = {
  themes: ['daisy', 'cmyk'],
}

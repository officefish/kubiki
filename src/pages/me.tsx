//import { MyProfile } from '@client/components/screens/profile'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, {
  BackendAddressProvider,
  useBackendAddressStore,
} from '@client/providers'
import MinProfile from '@/client/screens/profile/minimum'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { IBackendMinimum } from '@/client/utilities/backend.min.types'

const ProfilePage: NextPageWithLayout<IBackendMinimum> = ({ host, port }) => {
  const { setHost, setPort } = useBackendAddressStore()

  useEffect(() => {
    setHost(host)
    setPort(port)
  }, [host, port, setHost, setPort])

  return <MinProfile />
}
export default ProfilePage

export const getServerSideProps: GetServerSideProps = async () => {
  // // connect to your db to check if it exists, make a webservice call...
  const host =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_HOST
      : process.env.PROD_HOST

  const port =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_PORT
      : process.env.PROD_PORT

  return {
    props: {
      //slug,
      //userProfile,
      host,
      port,
    },
  }
}

ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={ProfilePage.theme}>
      <BackendAddressProvider>
        <Layout title="Profile">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

ProfilePage.theme = {
  themes: ['daisy', 'cmyk'],
}

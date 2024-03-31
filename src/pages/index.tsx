import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Home from '@client/screens/home'

import Providers, {
  BackendAddressProvider,
  useBackendAddressStore,
} from '@client/providers'
import type { GetServerSideProps } from 'next'
import { IUserProfile } from '@/client/models/user.model'
//import { UserProfile } from '@client/components/screens/profile'
//import { getUserProfilebyDomain } from '@/client/services/user.service'
import { useEffect } from 'react'

interface SubDomainProps {
  slug?: string | null
  userProfile?: IUserProfile | null
  host: string
  port: number
}

const HomePage: NextPageWithLayout<SubDomainProps> = ({ host, port }) => {
  const { setHost, setPort } = useBackendAddressStore()

  useEffect(() => {
    setHost(host)
    setPort(port)
  }, [host, port, setHost, setPort])

  console.log(host, port)
  return <Home />
}
export default HomePage

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

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={HomePage.theme}>
      <BackendAddressProvider>
        <Layout title="Home" description="Resent posts.">
          {page}
        </Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

HomePage.theme = {
  themes: ['daisy', 'cmyk'],
}

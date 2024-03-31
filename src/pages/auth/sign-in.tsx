import SignIn from '@client/screens/auth/sign-in'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, {
  BackendAddressProvider,
  useBackendAddressStore,
} from '@client/providers'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
import { IUserProfile } from '@/client/models/user.model'

interface SubDomainProps {
  slug?: string | null
  userProfile?: IUserProfile | null
  host: string
  port: number
}

const SignInPage: NextPageWithLayout<SubDomainProps> = ({ host, port }) => {
  const { setHost, setPort } = useBackendAddressStore()

  useEffect(() => {
    setHost(host)
    setPort(port)
  }, [host, port, setHost, setPort])

  console.log(host, port)

  return <SignIn />
}
export default SignInPage

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

SignInPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={SignInPage.theme}>
      <BackendAddressProvider>
        <Layout title="Sign In.">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

SignInPage.theme = {
  themes: ['daisy', 'cmyk'],
}

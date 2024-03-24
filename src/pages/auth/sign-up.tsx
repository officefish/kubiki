import SignUp from '@client/components/screens/auth/sign-up'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, { BackendAddressProvider } from '@client/providers'

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />
}
export default SignUpPage

SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={SignUpPage.theme}>
      <BackendAddressProvider>
        <Layout title="Sign Up.">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

SignUpPage.theme = {
  themes: ['daisy', 'cmyk'],
}

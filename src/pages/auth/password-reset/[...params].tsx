import PasswordReset from '@client/components/screens/auth/password-reset'
import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import type { GetServerSideProps } from 'next'
import { TokenProps } from '@client/utilities/form.types'
import { BackendAddressProvider } from '@/client/providers'

const PasswordResetPage: NextPageWithLayout<TokenProps> = ({
  email,
  expires,
  token,
}) => {
  return <PasswordReset email={email} expires={expires} token={token} />
}
export default PasswordResetPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // // connect to your db to check if it exists, make a webservice call...
  if (!context.query.params || context.query.params.length !== 3) {
    return { notFound: true }
  }

  return {
    props: {
      email: context.query.params[0],
      expires: context.query.params[1],
      token: context.query.params[2],
    },
  }
}

PasswordResetPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <BackendAddressProvider>
      <Layout title="Request Password.">{page}</Layout>
    </BackendAddressProvider>
  )
}

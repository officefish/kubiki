import { NextPageWithLayout } from '@client/utilities/layout.types'
import Layout from '@client/components/layout/Layout'
import Providers, {
  BackendAddressProvider,
  useBackendAddressStore,
} from '@client/providers'
import AdminPanel from '@/client/screens/admin'
import { useEffect } from 'react'
import { IBackendMinimum } from '@/client/utilities/backend.min.types'
import { GetServerSideProps } from 'next'

const AdminPage: NextPageWithLayout<IBackendMinimum> = ({ host, port }) => {
  const { setHost, setPort } = useBackendAddressStore()

  useEffect(() => {
    setHost(host)
    setPort(port)
  }, [host, port, setHost, setPort])

  return <AdminPanel />
}
export default AdminPage

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
      host,
      port,
    },
  }
}

AdminPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Providers themeProps={AdminPage.theme}>
      <BackendAddressProvider>
        <Layout title="Admin">{page}</Layout>
      </BackendAddressProvider>
    </Providers>
  )
}

AdminPage.theme = {
  themes: ['daisy', 'cmyk'],
}

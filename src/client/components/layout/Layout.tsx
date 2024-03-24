import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import HeaderContent from './header/HeaderContent'
import { HeaderOffset } from './header/styled-header'

import Meta, { IMeta } from '@client/components/seo'

const Layout: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  children,
}) => {
  return (
    <Meta title={title} description={description}>
      <Header>
        <HeaderContent />
      </Header>
      <div className="h-full">
        <HeaderOffset />
        {children}
      </div>
    </Meta>
  )
}

export default Layout

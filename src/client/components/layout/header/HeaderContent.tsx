import { FC } from 'react'
//import Link from 'next/link'
import HeaderNavigation from './HeaderNavigation'
import Logo from '@client/components/ui/logo/Logo'

import { HeaderDescriptionWrapper, HeaderDescription } from './styled-header'

const HeaderContent: FC = () => {
  return (
    <>
      <HeaderDescriptionWrapper>
        <Logo />
        <HeaderDescription>
          <span>Конкурс детского рисунка.</span>
        </HeaderDescription>
      </HeaderDescriptionWrapper>
      <HeaderNavigation />
    </>
  )
}

export default HeaderContent

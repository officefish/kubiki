import { FC } from 'react'

import { StyledProfileHeader } from '../../styled-profile'
import HeaderStats from './stats'
import HeaderFunctional from './functional'

export enum EHeaderMode {
  Profile,
  Settings,
}

import { IHeaderStatsData } from '@client/models/profile.types'

interface IHeaderProps {
  stats?: IHeaderStatsData
}

const Header: FC<IHeaderProps> = ({ stats }) => {
  return (
    <StyledProfileHeader>
      <HeaderStats data={stats} />
      <HeaderFunctional />
    </StyledProfileHeader>
  )
}
export default Header

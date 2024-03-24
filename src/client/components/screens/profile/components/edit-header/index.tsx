import { FC } from 'react'

import { StyledProfileHeader } from '../../styled-profile'
import EditHeaderFunctional from './edit-functional'
import SettingsBreadcrumbs from './settings-breadcrumbs'

export enum EHeaderMode {
  Profile,
  Settings,
}

import { IHeaderStatsData } from '@client/models/profile.types'

interface IHeaderProps {
  stats?: IHeaderStatsData
}

const EditHeader: FC<IHeaderProps> = () => {
  return (
    <StyledProfileHeader>
      <SettingsBreadcrumbs />
      <EditHeaderFunctional />
    </StyledProfileHeader>
  )
}
export default EditHeader

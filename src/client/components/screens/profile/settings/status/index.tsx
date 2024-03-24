import { FC } from 'react'

import { StyledCollapseContainer } from '../../styled-profile'

import StatusQuote from './quote'
import StatusDomain from './domain'

const StatusSettings: FC = () => {
  return (
    <StyledCollapseContainer>
      <StatusQuote />
      <StatusDomain />
    </StyledCollapseContainer>
  )
}

export default StatusSettings

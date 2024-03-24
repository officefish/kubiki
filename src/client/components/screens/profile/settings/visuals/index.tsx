import { FC } from 'react'

import { StyledCollapseContainer } from '../../styled-profile'

import VisualsAvatar from './avatar'
import VisualsCover from './cover'
import VisualsTartan from './tartan'

const VisualsSettings: FC = () => {
  return (
    <StyledCollapseContainer>
      <VisualsAvatar />
      <VisualsCover />
      <VisualsTartan />
    </StyledCollapseContainer>
  )
}

export default VisualsSettings

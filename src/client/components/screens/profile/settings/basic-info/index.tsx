import { FC } from 'react'

import BasicInfoFullname from './fullname'
import BasicInfoLocation from './location'
import BasicInfoCareer from './career'
import BasicInfoEducation from './education'

import { StyledCollapseContainer } from '../../styled-profile'

const BasicInfoSettings: FC = () => {
  return (
    <StyledCollapseContainer>
      <BasicInfoFullname />
      <BasicInfoLocation />
      <BasicInfoCareer />
      <BasicInfoEducation />
    </StyledCollapseContainer>
  )
}

export default BasicInfoSettings

import { FC, useState, ChangeEvent, useEffect } from 'react'
import useComponentOutside from '@client/hooks/component-outside'

import {
  StyledCollapseSection,
  StyledCollapseSectionTitle,
  StyledCollapseSectionContent,
  SettingsContentDelimeter,
  StyledSettingsForm,
  StyledSettingsField,
  StyledSettingsLabel,
  StyledSettingsInput,
} from '../../styled-profile'

import { useUserProfileStore } from '@client/providers'

const BasicInfoCareer: FC = () => {
  const { ref, isComponentOutside } = useComponentOutside(true)
  const [forseCollapse, setForseCollapse] = useState(false)

  const { career, setCareer, invalidCareer } = useUserProfileStore()

  const setCompany = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCareer({ ...career, company: e.target.value })
    invalidCareer()
  }

  const setRole = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCareer({ ...career, role: e.target.value })
    invalidCareer()
  }

  useEffect(() => {
    setForseCollapse(!isComponentOutside)
  }, [isComponentOutside])

  return (
    <StyledCollapseSection ref={ref} $forceCollapse={forseCollapse}>
      <input type="checkbox" className="w-[1px] h-[1px]" />
      <StyledCollapseSectionTitle>Career:</StyledCollapseSectionTitle>
      <StyledCollapseSectionContent>
        <SettingsContentDelimeter />
        <StyledSettingsForm action="">
          <StyledSettingsField>
            <StyledSettingsLabel>Company:</StyledSettingsLabel>
            <StyledSettingsInput
              type="text"
              value={career?.company ? career.company : ''}
              onChange={setCompany}
            />
          </StyledSettingsField>
          <StyledSettingsField>
            <StyledSettingsLabel>Role:</StyledSettingsLabel>
            <StyledSettingsInput
              type="text"
              value={career?.role ? career.role : ''}
              onChange={setRole}
            />
          </StyledSettingsField>
        </StyledSettingsForm>
      </StyledCollapseSectionContent>
    </StyledCollapseSection>
  )
}

export default BasicInfoCareer

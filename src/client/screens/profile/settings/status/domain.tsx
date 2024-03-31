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

const StatusDomain: FC = () => {
  const { ref, isComponentOutside } = useComponentOutside(true)
  const [forseCollapse, setForseCollapse] = useState(false)

  const { domain, setDomain, invalidDomain } = useUserProfileStore()

  const handleOnChangeDomain = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDomain({ value: e.target.value })
    invalidDomain()
  }

  useEffect(() => {
    setForseCollapse(!isComponentOutside)
  }, [isComponentOutside])

  return (
    <StyledCollapseSection ref={ref} $forceCollapse={forseCollapse}>
      <input type="checkbox" className="w-[1px] h-[1px]" />
      <StyledCollapseSectionTitle>Domain</StyledCollapseSectionTitle>
      <StyledCollapseSectionContent>
        <SettingsContentDelimeter />
        <StyledSettingsForm action="">
          <StyledSettingsField>
            <StyledSettingsLabel>Domain Value:</StyledSettingsLabel>
            <StyledSettingsInput
              type="text"
              value={domain?.value}
              onChange={handleOnChangeDomain}
            />
          </StyledSettingsField>
        </StyledSettingsForm>
      </StyledCollapseSectionContent>
    </StyledCollapseSection>
  )
}

export default StatusDomain

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
} from '../../styled-profile'

import { useUserProfileStore } from '@client/providers'

const StatusQuote: FC = () => {
  const { ref, isComponentOutside } = useComponentOutside(true)
  const [forseCollapse, setForseCollapse] = useState(false)

  const { quote, setQuote, invalidQuote } = useUserProfileStore()

  const handleAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setQuote({ content: e.target.value })
    invalidQuote()
  }

  useEffect(() => {
    setForseCollapse(!isComponentOutside)
  }, [isComponentOutside])

  return (
    <StyledCollapseSection ref={ref} $forceCollapse={forseCollapse}>
      <input type="checkbox" className="w-[1px] h-[1px]" />
      <StyledCollapseSectionTitle>Quote</StyledCollapseSectionTitle>
      <StyledCollapseSectionContent>
        <SettingsContentDelimeter />
        <StyledSettingsForm action="">
          <StyledSettingsField>
            <StyledSettingsLabel>Quote Value:</StyledSettingsLabel>
            <textarea
              className="textarea textarea-bordered min-h-[3.2rem] min-w-[75%] pr-4"
              placeholder="Bio or something exciting"
              onChange={handleAreaChange}
              value={quote?.content}
            ></textarea>
            {/* <StyledSettingsInput type="text" value={quote} onChange={handleInputChange}/> */}
          </StyledSettingsField>
        </StyledSettingsForm>
      </StyledCollapseSectionContent>
    </StyledCollapseSection>
  )
}

export default StatusQuote

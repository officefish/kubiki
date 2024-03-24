import { FC } from 'react'
import { QuoteContainer, QuoteWrapper, QuoteParagraph } from '../styled-profile'

import { IQuote } from '@client/models/profile.types'

const ProfileQuote: FC<IQuote> = ({ content }) => {
  return (
    <QuoteContainer>
      <QuoteWrapper>
        <QuoteParagraph>{content}</QuoteParagraph>
      </QuoteWrapper>
    </QuoteContainer>
  )
}

export default ProfileQuote

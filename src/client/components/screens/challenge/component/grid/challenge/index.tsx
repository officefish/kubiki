import { FC, MouseEvent } from 'react'

import { StyledButton, StyledChallengeGrid } from '../../../challenge.styled'
import { IChallenge } from '@/client/models/challenge.types'
import ChallengeGridItem from './item'
import { useRouter } from 'next/router'

interface IChallengeListGrid {
  challenges: IChallenge[]
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const ChallengesListGrid: FC<IChallengeListGrid> = (props) => {
  const { challenges, onClick } = props

  const router = useRouter()

  const onChallengeSelect = (challengeId: string) => {
    router.push(`/challenge/${challengeId}`)
  }

  return (
    <StyledChallengeGrid>
      {challenges?.map((item, i) => (
        <ChallengeGridItem
          key={i}
          id={item.id}
          onSelect={onChallengeSelect}
          title={item.title}
        />
      ))}
      <StyledButton onClick={onClick}>Add challenge</StyledButton>
    </StyledChallengeGrid>
  )
}
export default ChallengesListGrid

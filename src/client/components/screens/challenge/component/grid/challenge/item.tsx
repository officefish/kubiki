import { FC, MouseEvent } from 'react'

import {
  //StyledButton,
  StyledChallenge,
  //StyledWorkspaceGrid,
} from '../../../challenge.styled'

interface IChallengeListItem {
  title: string
  id: string
  onSelect: (challengeId: string) => void
}

const ChallengeGridItem: FC<IChallengeListItem> = (props) => {
  const { title, id, onSelect } = props

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSelect(id)
  }

  return <StyledChallenge onClick={handleClick}>{title}</StyledChallenge>
}
export default ChallengeGridItem

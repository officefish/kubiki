import { FC, SyntheticEvent } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { StyledStarButton } from '../../dev-form-styled'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

interface StarItemProps {
  size: SizeProp
  value: number
  score: number
  onClick: (score: number) => void
}

const StarItem: FC<StarItemProps> = (props) => {
  const { size, value, score, onClick } = props

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick(score)
  }
  return (
    <StyledStarButton onClick={handleClick} $active={value >= score}>
      <FontAwesomeIcon icon={faStar} size={size} />
    </StyledStarButton>
  )
}
export default StarItem

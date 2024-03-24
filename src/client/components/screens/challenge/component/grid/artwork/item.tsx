import { FC, MouseEvent } from 'react'

import {
  StyledArtworkButton,
  //StyledButton,
  //StyledWorkspaceGrid,
} from '../../../challenge.styled'
import { CoverImage } from '@/client/components/form/dev-form-styled'

interface IArtworkGridItem {
  id: string
  url: string
  total?: number
  //onSelect: (challengeId: string) => void
}

const ArtworkGridItem: FC<IArtworkGridItem> = (props) => {
  const { url, id } = props

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(id)
    //onSelect(id)
  }

  return (
    <StyledArtworkButton onClick={handleClick}>
      <div className="relative w-full h-full">
        <CoverImage $background={url} />
      </div>
    </StyledArtworkButton>
  )
}
export default ArtworkGridItem

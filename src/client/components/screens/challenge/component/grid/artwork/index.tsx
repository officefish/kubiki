import { FC } from 'react'

import { StyledChallengeGrid } from '../../../challenge.styled'
import { IArtwork } from '@/client/models/challenge.types'
import ArtGridItem from './item'
//import { useRouter } from 'next/router'

interface IArtworkList {
  artworks: IArtwork[]
  onRemove: () => void
}

const ArtworksList: FC<IArtworkList> = (props) => {
  const { artworks } = props

  //const router = useRouter()

  //   const onChallengeSelect = (challengeId: string) => {
  //     router.push(`/challenge/${challengeId}`)
  //   }

  return (
    <StyledChallengeGrid>
      {artworks?.map((item, i) => (
        <ArtGridItem key={i} url={item.url} id={item.id} />
      ))}
    </StyledChallengeGrid>
  )
}
export default ArtworksList

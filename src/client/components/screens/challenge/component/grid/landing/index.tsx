import { FC } from 'react'

import { StyledChallengeGrid } from '../../../challenge.styled'
import { IArtwork, IScore } from '@/client/models/challenge.types'
import LandingArtworkGridItem from './item'
//import { useRouter } from 'next/router'

interface IArtworkList {
  artworks: IArtwork[]
  scores: IScore[]
  isJudge: boolean
  handleChangeScore: (scoreId: string) => void
  handleViewArtwork: (artwork: IArtwork) => void
  handleLikeChange: () => void
}

const LandingArtworksList: FC<IArtworkList> = (props) => {
  const {
    artworks,
    scores,
    handleChangeScore,
    handleViewArtwork,
    handleLikeChange,
    isJudge,
  } = props

  return (
    <StyledChallengeGrid>
      {artworks?.map((item, i) => (
        <LandingArtworkGridItem
          key={i}
          artwork={item}
          score={scores[i]}
          isJudge={isJudge}
          onLikeChange={handleLikeChange}
          onScoreClick={handleChangeScore}
          onArtworkClick={handleViewArtwork}
        />
      ))}
    </StyledChallengeGrid>
  )
}
export default LandingArtworksList

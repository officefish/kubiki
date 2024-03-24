import { FC, MouseEvent, SyntheticEvent, useEffect, useState } from 'react'

import {
  StyledArtworkCard,
  StyledLikeButton,
  StyledScoreButton,
  //StyledButton,
  //StyledWorkspaceGrid,
} from '../../../challenge.styled'
import { IArtwork, IScore } from '@/client/models/challenge.types'
import { CoverImage } from '@/client/components/form/dev-form-styled'
import {
  useCreateLike,
  useDeleteLike,
} from '@/client/services/challenge.service'
import { useBackendAddressStore } from '@/client/providers'
import { getAgeLiteral } from '@/client/utilities/age.utils'

interface IArtworkGridItem {
  artwork: IArtwork
  score?: IScore
  isJudge: boolean
  onScoreClick: (scoreId: string) => void
  onArtworkClick: (artwork: IArtwork) => void
  onLikeChange: () => void
}

const LandingArtworkGridItem: FC<IArtworkGridItem> = (props) => {
  const {
    artwork,
    score,
    isJudge,
    onScoreClick,
    onArtworkClick,
    onLikeChange,
  } = props

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onArtworkClick(artwork)
    //console.log(artwork.id)
    //console.log(artwork.url)
    //console.log(score.id)
    //onSelect(id)
  }

  const handleScoreClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    //console.log(artwork.id)
    //console.log(artwork.url)
    onScoreClick(score.id)
    //onSelect(id)
  }

  const { host, port } = useBackendAddressStore()

  const {
    onSubmit: submitCreateLike,
    data: createLikeData,
    serverError: createLikeError,
  } = useCreateLike(host, port)

  const {
    onSubmit: submitDeleteLike,
    data: deleteLikeData,
    serverError: deleteLikeError,
  } = useDeleteLike(host, port)

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (createLikeData) {
      if (!isValid) {
        setIsValid(true)
        onLikeChange()
      }
    }
    if (deleteLikeData) {
      if (!isValid) {
        setIsValid(true)
        onLikeChange()
      }
    }
    if (createLikeError) {
      console.log(createLikeError)
    }
    if (deleteLikeError) {
      console.log(deleteLikeError)
    }
  }, [
    createLikeData,
    createLikeError,
    deleteLikeData,
    deleteLikeError,
    isValid,
    onLikeChange,
  ])

  const [isLikeEnabled, setIsLikeEnabled] = useState(true)
  useEffect(() => {
    let like = localStorage.getItem(artwork.id)
    if (!like) {
      like = 'False'
    }
    const boolLike = /true/.test(like)
    setIsLikeEnabled(boolLike)
  }, [artwork])

  const serverSideLike = (like: boolean, artworkId: string) => {
    const submit = like ? submitCreateLike : submitDeleteLike
    submit({ artworkId })
  }

  const onLikeClick = (artworkId: string) => {
    //console.log(artworkId)
    const boolLike = !isLikeEnabled
    setIsLikeEnabled(boolLike)
    localStorage.setItem(artwork.id, boolLike ? 'True' : 'False')
    serverSideLike(boolLike, artworkId)
    setIsValid(false)
  }

  useEffect(() => {
    if (!artwork) return
    let like = localStorage.getItem(artwork.id)
    if (!like) {
      like = 'False'
    }
    const boolLike = /true/.test(like.toLowerCase())
    setIsLikeEnabled(boolLike)
  }, [artwork])

  return (
    <StyledArtworkCard>
      <button className="relative w-full h-[80%]" onClick={handleClick}>
        <CoverImage $background={artwork.url} />
      </button>
      <div className="card-body">
        <div className="w-full text-center text-primary text-sm">
          {artwork?.author?.firstName} {artwork?.author?.lastName}.{' '}
          {artwork?.author?.age} {getAgeLiteral(artwork?.author?.age)}.
        </div>
        <div className="stats min-w-[380px]">
          {/* Total score */}
          <Stat title="Total scores:" value={artwork?.total} />
          {/* Functional */}
          <div className="stat place-items-center">
            {isJudge ? (
              <StyledScoreButton
                $active={score.total > 0}
                onClick={handleScoreClick}
              >
                Score: {score.total}
              </StyledScoreButton>
            ) : (
              <LikeButton
                enabled={isLikeEnabled}
                onClick={onLikeClick}
                artworkId={artwork?.id}
              />
            )}
          </div>
          {/* Total likes */}
          <Stat title="Total likes:" value={artwork?.likes?.length || 0} />
        </div>
        {/* <h2 className="card-title">Shoes!</h2> */}
      </div>
    </StyledArtworkCard>
  )
}
export default LandingArtworkGridItem

interface IStatProps {
  title: string
  value?: number
}

const Stat: FC<IStatProps> = ({ title, value = 0 }) => {
  return (
    <div className="stat place-items-center text-secondary dark:text-secondary-dark">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

interface ILikeButton {
  enabled: boolean
  artworkId: string
  onClick: (artworkId) => void
}

const LikeButton: FC<ILikeButton> = (props) => {
  const { enabled, artworkId, onClick } = props

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick(artworkId)
  }

  return (
    <StyledLikeButton $active={enabled} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-8 h-8 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </StyledLikeButton>
  )
}

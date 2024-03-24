import { FC, SyntheticEvent, useEffect, useState } from 'react'
import LandingArtworksList from '../challenge/component/grid/landing'
import {
  AgeGroup,
  IArtwork,
  ICategoryScore,
  IChallenge,
  IScore,
} from '@/client/models/challenge.types'
import {
  useGetScore,
  useLastChallenge,
  useUpdateScore,
} from '@/client/services/challenge.service'
import ChangeScoreDialog from '../challenge/component/dialog/change-score'
import ShowArtworkDialog from '../challenge/component/dialog/show-artwork'

const fill = (n) => Array.from({ length: n }, (_, i) => i)
const isBrowser = () => typeof window !== 'undefined' //The approach recommended by Next.js

const Home: FC = () => {
  // state machine
  const [isValid, setIsValid] = useState(false)
  const [artworks, setArtworks] = useState<IArtwork[]>()
  const [scores, setScores] = useState<IScore[]>()
  const [isJudge, setIsJudge] = useState(false)

  const [isChangeScoreOpen, setIsChangeScoreOpen] = useState(false)
  const [isShowArtworkOpen, setIsShowArtworkOpen] = useState(false)

  const [activeAgeGroup, setActiveAgeGroup] = useState<AgeGroup | string>(
    'KIDS',
  )

  const [skip, setSkip] = useState(0)
  const [take] = useState(36)

  const [challengeData, setChallengeData] = useState<IChallenge>()

  const {
    challenge,
    serverError: challengeServerError,
    trigger: challengeTrigger,
  } = useLastChallenge({ skip, take })

  /* new challenge trigger */
  useEffect(() => {
    if (!isValid) {
      setIsValid(true)
      challengeTrigger({ skip, take, ageGroup: activeAgeGroup })
    }
  }, [activeAgeGroup, challengeTrigger, isValid, skip, take])

  const [pagination, setPagination] = useState<number[]>()

  /* new challenge data */
  useEffect(() => {
    //console.log(challenge?.artworks?.length)
    const n = Math.ceil(challenge?.total / take)
    const pages = fill(n)
    setPagination(pages)
    //console.log(challenge?.total)
    setChallengeData(challenge)
  }, [challenge, take])

  /* new challenge data error */
  useEffect(() => {
    if (challengeServerError) {
      setChallengeData(null)
    }
  }, [challengeServerError])

  useEffect(() => {
    setChallengeData(null)
  }, [challengeServerError])

  const [currentCategoryScores, setCurrentCategoryScores] =
    useState<ICategoryScore[]>()

  const [currentScoreId, setCurrentScoreId] = useState<string>()
  const [currentArtwork, setCurrentArtwork] = useState<IArtwork>()

  const {
    trigger: triggerUpdateScore,
    data: updateScoreData,
    serverError: updateScoreError,
  } = useUpdateScore()

  useEffect(() => {
    if (updateScoreData) {
      setIsChangeScoreOpen(false)
      setIsValid(false)
    }
    if (updateScoreError) {
      console.log(updateScoreError)
      setIsChangeScoreOpen(false)
    }
  }, [updateScoreData, updateScoreError])

  useEffect(() => {
    if (challengeData) {
      setArtworks(challengeData.artworks)
      setScores(challengeData.scores)
      setIsJudge(challengeData.isJudge)
    } else {
      console.log('null data')
    }
  }, [setArtworks, challengeData])

  const {
    trigger: getScoreTrigger,
    score,
    //serverError: updateScoreError,
  } = useGetScore()

  useEffect(() => {
    if (score) {
      setCurrentScoreId(score.id)
      setCurrentCategoryScores(score.categoryScores)
      setIsChangeScoreOpen(true)
    } else {
      console.log('null data')
    }
  }, [score])

  const handleNeedChangeScore = (scoreId: string) => {
    getScoreTrigger(scoreId)
  }

  const handleNewScore = (data) => {
    const payload = {
      scoreId: currentScoreId,
      scores: data,
    }
    triggerUpdateScore(payload)
  }

  const handleViewArtwork = (artwork: IArtwork) => {
    //console.log(artwork)
    setCurrentArtwork(artwork)
    setIsShowArtworkOpen(true)
  }

  const handleLikeChange = () => {
    setIsValid(false)
  }

  const handlePagination = (index) => {
    setSkip(index * take)
    setIsValid(false)
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAgeGroup = (ageGroup: AgeGroup) => {
    setIsValid(false)
    setActiveAgeGroup(ageGroup)
    setSkip(0)
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="w-full flex justify-center p-4">
        <div className="join">
          {Object.keys(AgeGroup)
            .filter((v) => !isNaN(Number(v)))
            .map((group) => (
              <AgeGroupItem
                key={group}
                ageGroup={AgeGroup[group]}
                active={AgeGroup[group] === activeAgeGroup}
                handleClick={handleAgeGroup}
              />
            ))}
        </div>
      </div>
      <div className="text-base-content dark:text-base-content-dark w-screen">
        {/* <h3 className="text-3xl font-semibold leading-normal">
        Some landing here
        </h3> */}
        <LandingArtworksList
          handleChangeScore={handleNeedChangeScore}
          handleViewArtwork={handleViewArtwork}
          handleLikeChange={handleLikeChange}
          artworks={artworks}
          scores={scores}
          isJudge={isJudge}
        />
      </div>
      <div className="w-full flex justify-center p-4">
        <div className="join">
          {pagination &&
            pagination.length > 1 &&
            pagination.map((i) => (
              <HomePaginationItem
                key={i}
                index={i}
                active={i === skip / take}
                handleClick={handlePagination}
              />
            ))}
        </div>
      </div>
      <ChangeScoreDialog
        isOpen={isChangeScoreOpen}
        setIsOpen={setIsChangeScoreOpen}
        title={'Artwork score'}
        scores={currentCategoryScores}
        onScoreChange={handleNewScore}
      />
      <ShowArtworkDialog
        isOpen={isShowArtworkOpen}
        setIsOpen={setIsShowArtworkOpen}
        artwork={currentArtwork}
      />
    </>
  )
}

export default Home

interface IPaginationItem {
  index: number
  active: boolean
  handleClick: (index: number) => void
}

const HomePaginationItem: FC<IPaginationItem> = (props) => {
  const { index, active, handleClick } = props

  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleClick(index)
  }

  return (
    <button
      onClick={onClick}
      className={`join-item btn btn-secondary ${active ? 'btn-active' : 'btn-outline'}`}
    >
      {1 + index}
    </button>
  )
}

interface IAgeGroupItem {
  ageGroup: AgeGroup
  active: boolean
  handleClick: (ageGroup: AgeGroup) => void
}

const AgeGroupItem: FC<IAgeGroupItem> = (props) => {
  const { ageGroup, active, handleClick } = props
  const onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleClick(ageGroup)
  }

  return (
    <button
      onClick={onClick}
      className={`join-item btn btn-secondary ${active ? 'btn-active' : 'btn-outline'}`}
    >
      {ageGroup}
    </button>
  )
}

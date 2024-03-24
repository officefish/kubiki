import { FC } from 'react'
import { useRouter } from 'next/router'

import {
  StyledStats,
  SingleStat,
  StatTitle,
  StatValue,
} from '../../styled-profile'

import { IHeaderStatsData } from '@client/models/profile.types'

export interface HeaderProps {
  data?: IHeaderStatsData
}

const HeaderStats: FC<HeaderProps> = ({ data }) => {
  const router = useRouter()

  const onPostStatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/posts')
  }

  const onCommentStatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/comments')
  }

  const onFollowersStatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/followers')
  }

  return (
    <StyledStats>
      {data && data.posts ? (
        <Stat title="posts" value={data.posts} onclick={onPostStatClick} />
      ) : (
        <></>
      )}
      {data && data.comments ? (
        <Stat
          title="comments"
          value={data.comments}
          onclick={onCommentStatClick}
        />
      ) : (
        <></>
      )}
      {data && data.followers ? (
        <Stat
          title="followers"
          value={data.followers}
          onclick={onFollowersStatClick}
        />
      ) : (
        <></>
      )}
    </StyledStats>
  )
}
export default HeaderStats

interface IStat {
  value: number
  title: string
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Stat: FC<IStat> = ({ title, value, onclick }) => {
  return (
    <button onClick={onclick}>
      <SingleStat>
        <StatValue>{value}</StatValue>
        <StatTitle>{title}</StatTitle>
      </SingleStat>
    </button>
  )
}

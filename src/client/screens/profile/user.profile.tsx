import { FC } from 'react'

import {
  Cover,
  ProfileLayout,
  Header,
  BasicInfo,
  ProfileQuote,
  ResentActivities,
} from './components'

import { IHeaderStatsData } from '@client/models/profile.types'

import { ProfileDelimeter } from './styled-profile'

import { IUserProfile } from '@/client/models/user.model'

//const background =
//  'https://images.unsplash.com/photo-1499336315816-097655dcfbda'

const headerData: IHeaderStatsData = {
  followers: 22,
  posts: 12,
  comments: 108,
}

interface IUserProfileProps {
  data: IUserProfile
}

const UserProfile: FC<IUserProfileProps> = ({ data }) => {
  return (
    <div className="relative">
      <Cover background={data.cover?.imageUrl} />
      <ProfileLayout avatar={data.avatar?.imageUrl}>
        <Header stats={headerData} />
        <BasicInfo data={data.basicInfo} />
        <ProfileDelimeter />
        <ProfileQuote content={data.quote?.content || ''} />
        <ResentActivities />
      </ProfileLayout>
    </div>
  )
}
export default UserProfile

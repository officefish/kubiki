import { FC } from 'react'
import { useUserProfileSWR } from '@client/services/user-profile.service'

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
import CoverTartan from './components/tartan-cover'

//const background =
//  'https://images.unsplash.com/photo-1499336315816-097655dcfbda'

const headerData: IHeaderStatsData = {
  followers: 22,
  posts: 12,
  comments: 108,
}

const MyProfile: FC = () => {
  const { userProfile } = useUserProfileSWR()

  return (
    <>
      {userProfile ? (
        <div className="relative">
          <Cover background={userProfile.cover?.imageUrl} />
          <CoverTartan url={userProfile.tartan?.url} />
          <ProfileLayout avatar={userProfile.avatar?.imageUrl}>
            <Header stats={headerData} />
            <BasicInfo data={userProfile.basicInfo} />
            <ProfileDelimeter />
            <ProfileQuote content={userProfile.quote?.content || ''} />
            <ResentActivities />
          </ProfileLayout>
        </div>
      ) : (
        <div>You need to be authorized!</div>
      )}
    </>
  )
}
export default MyProfile

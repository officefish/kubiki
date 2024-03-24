import { FC, MouseEvent } from 'react'
import { SettingsButton, ResentActivitiesWrapper } from '../styled-profile'

import { useRouter } from 'next/router'

const ResentActivities: FC = () => {
  const router = useRouter()

  const resentClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/resent-activities')
  }

  return (
    <ResentActivitiesWrapper>
      <SettingsButton $active={true} onClick={resentClick}>
        Resent activities...
      </SettingsButton>
    </ResentActivitiesWrapper>
  )
}

export default ResentActivities

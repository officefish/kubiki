import { FC, MouseEvent } from 'react'
import { useRouter } from 'next/router'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  StyledFunctional,
  SettingsButton,
  StyledButton,
} from '../../styled-profile'

const HeaderFunctional: FC = () => {
  const router = useRouter()

  const onWorkspacesClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/challenges')
  }

  const settingsClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/me/settings')
  }

  return (
    <StyledFunctional>
      <StyledButton type="button" onClick={onWorkspacesClick}>
        Challenges
      </StyledButton>
      <SettingsButton
        $active={true}
        disabled={false}
        type="button"
        onClick={settingsClick}
      >
        Settings
        <FontAwesomeIcon icon={faGear} />
      </SettingsButton>
    </StyledFunctional>
  )
}
export default HeaderFunctional

import { FC, MouseEvent } from 'react'
import { UserMin } from '@client/models/user.model'

import { NavigationButton, StyledUserName } from './styled-header'

import { useRouter } from 'next/router'

const UserItem: FC<UserMin> = ({ name, avatar }) => {
  const router = useRouter()
  const href = '/me'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(href)
  }

  const handleImageError = (event) => {
    event.target.onerror = null // Reset the event handler to prevent infinite loop
    event.target.src = `/public/${avatar}` // Try loading the image from the fallback source
  }

  return (
    <NavigationButton onClick={handleClick}>
      <div className="avatar">
        <div className="w-6 mask mask-squircle">
          {avatar && (
            <div className="w-6 h-6 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="small avatar" src={avatar} onError={handleImageError} />
            </div>
          )}
        </div>
      </div>
      <StyledUserName>{name}</StyledUserName>
    </NavigationButton>
  )
}

export default UserItem

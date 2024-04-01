import { FC } from 'react'

import { StyledAvatarLayout, StyledAvatarWrapper } from '../styled-profile'

interface AvatarProps {
  avatar: string
}

const Avatar: FC<AvatarProps> = ({ avatar }) => {
  const handleImageError = (event) => {
    event.target.onerror = null // Reset the event handler to prevent infinite loop
    event.target.src = `/public/${avatar}` // Try loading the image from the fallback source
  }

  return (
    <StyledAvatarLayout>
      <StyledAvatarWrapper>
        <div className="w-20 h-20 lg:w-24 lg:h-24 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="avatar" src={avatar} onError={handleImageError} />
        </div>
      </StyledAvatarWrapper>
    </StyledAvatarLayout>
  )
}
export default Avatar

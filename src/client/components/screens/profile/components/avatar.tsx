import { FC } from 'react'
import Image from 'next/image'

import {
  StyledAvatarLayout,
  StyledAvatarWrapper,
  AvatarImageClasses,
} from '../styled-profile'

interface AvatarProps {
  avatar: string
}

const Avatar: FC<AvatarProps> = ({ avatar }) => {
  return (
    <StyledAvatarLayout>
      <StyledAvatarWrapper>
        <Image
          alt="avatar"
          src={avatar}
          width={120}
          height={120}
          className={AvatarImageClasses}
        />
      </StyledAvatarWrapper>
    </StyledAvatarLayout>
  )
}
export default Avatar

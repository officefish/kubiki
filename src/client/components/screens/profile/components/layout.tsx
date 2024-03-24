import { FC, PropsWithChildren } from 'react'
import Avatar from './avatar'
//import { StaticImageData } from 'next/image'

import {
  StyledProfileLayout,
  StyledProfileWrapper,
  StyledProfileBody,
} from '../styled-profile'
//import useComponentOutside from '@/client/hooks/component-outside'

interface AvatarProps {
  avatar?: string
}

const ProfileLayout: FC<PropsWithChildren<AvatarProps>> = ({
  children,
  avatar,
}) => {
  return (
    <StyledProfileLayout>
      <StyledProfileWrapper>
        {avatar && <Avatar avatar={avatar} />}
        <StyledProfileBody $fontFamily="display">{children}</StyledProfileBody>
      </StyledProfileWrapper>
    </StyledProfileLayout>
  )
}
export default ProfileLayout

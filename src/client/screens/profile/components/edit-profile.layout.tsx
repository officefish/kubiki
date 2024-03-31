import { FC, PropsWithChildren, useEffect, useState } from 'react'
import Avatar from './avatar'
//import { StaticImageData } from 'next/image'

import {
  StyledProfileLayout,
  StyledProfileWrapper,
  StyledProfileBody,
  StyledProfileLining,
} from '../styled-profile'
import useElementSize from '@/client/hooks/element-size'
//import useComponentOutside from '@/client/hooks/component-outside'

interface AvatarProps {
  avatar?: string
}

const EditProfileLayout: FC<PropsWithChildren<AvatarProps>> = ({
  children,
  avatar,
}) => {
  const [boxRef, boxSize] = useElementSize()
  const [needLining, setNeedLining] = useState(false)

  useEffect(() => {
    /* 466 is size of ProfileBody in normal view (no editor) 
    we want use lining only with settings editor field which is larger than default view  
    */
    setNeedLining(boxSize.height > 506)
  }, [boxSize])

  return (
    <StyledProfileLayout>
      <StyledProfileWrapper>
        {avatar && <Avatar avatar={avatar} />}
        <StyledProfileBody $fontFamily="display" ref={boxRef}>
          {children}
        </StyledProfileBody>
      </StyledProfileWrapper>
      <StyledProfileLining $open={needLining} />
    </StyledProfileLayout>
  )
}
export default EditProfileLayout

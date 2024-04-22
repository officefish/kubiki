import { FC, useState } from 'react'

import CollapseSection from '../../ui/collapse.section'
import { useUserProfileEditorStore } from '@client/providers'

import {
  StyledSettingsDiv,
  StyledSettingsField,
  StyledSettingsLabel,
} from '../../../styled-profile'
import AvatarPicker from './avatar.picker'

//import { IVisualsAvatarProps } from '@client/models/settings.model'
import { useUserProfileStore } from '@client/providers'

const VisualsAvatar: FC = () => {
  const { avatar, setAvatar, invalidAvatar } = useUserProfileStore()

  const setImageUrl = (value: string) => {
    setAvatar({
      id: avatar?.id ? avatar.id : '1',
      imageUrl: value,
      croppedImageUrl: avatar?.croppedImageUrl ? avatar.croppedImageUrl : null,
    })

    invalidAvatar()
  }

  const setCroppedImageUrl = (value: string) => {
    setAvatar({
      id: avatar?.id ? avatar.id : '1',
      imageUrl: avatar?.imageUrl ? avatar.imageUrl : value,
      croppedImageUrl: value,
    })

    invalidAvatar()
  }

  const { setPath } = useUserProfileEditorStore()
  const [path] = useState(['Visuals', 'Avatar'])

  return (
    <CollapseSection name="Avatar" path={path} setPath={setPath}>
      <StyledSettingsDiv>
        <StyledSettingsField>
          <StyledSettingsLabel>Avatar image source:</StyledSettingsLabel>
          <AvatarPicker
            imageUrl={avatar?.imageUrl ? avatar.imageUrl : ''}
            croppedImageUrl={
              avatar?.croppedImageUrl ? avatar.croppedImageUrl : null
            }
            setImageUrl={setImageUrl}
            setCroppedImageUrl={setCroppedImageUrl}
          />
        </StyledSettingsField>
      </StyledSettingsDiv>
    </CollapseSection>
  )
}

export default VisualsAvatar

import { FC, useState } from 'react'

import CollapseSection from '../../ui/collapse.section'

import {
  StyledSettingsDiv,
  StyledSettingsField,
  StyledSettingsLabel,
} from '../../../styled-profile'

import CoverPicker from './cover.picker'

import {
  useUserProfileEditorStore,
  useUserProfileStore,
} from '@client/providers'

const VisualsCover: FC = () => {
  //const [imageUrl, setImageUrl] = useState(coverSrc)

  const { cover, setCover, invalidCover } = useUserProfileStore()

  const setImageUrl = (value: string) => {
    setCover({
      id: cover?.id ? cover.id : '1',
      imageUrl: value,
    })

    invalidCover()
  }
  const { setPath } = useUserProfileEditorStore()
  const [path] = useState(['Visuals', 'Cover'])

  return (
    <CollapseSection name="Cover" path={path} setPath={setPath}>
      <StyledSettingsDiv>
        <StyledSettingsField>
          <StyledSettingsLabel>Cover image source:</StyledSettingsLabel>
          <CoverPicker
            imageUrl={cover?.imageUrl ? cover.imageUrl : ''}
            setImageUrl={setImageUrl}
          />
        </StyledSettingsField>
      </StyledSettingsDiv>
    </CollapseSection>
  )
}

export default VisualsCover

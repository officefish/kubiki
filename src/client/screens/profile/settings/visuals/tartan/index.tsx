import { FC, useState } from 'react'

import CollapseSection from '../../ui/collapse.section'

import {
  StyledSettingsDiv,
  StyledSettingsField,
  StyledSettingsLabel,
} from '../../../styled-profile'

import { useUserProfileStore } from '@client/providers'

import { ITartanPatternColors } from '@client/models/profile.types'
import TartanPicker from './tartan-picker'

const VisualsTartan: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { tartan, setTartan, invalidTartan } = useUserProfileStore()

  const setColors = (newColors: ITartanPatternColors) => {
    if (tartan === undefined) return
    setTartan({
      ...tartan,
      id: tartan.id ? tartan.id : '1',
      colors: [...newColors],
    })
    invalidTartan()
  }

  const handleCollabse = (newIsCollapsed: boolean) => {
    setIsCollapsed(newIsCollapsed)
  }

  return (
    <CollapseSection name="Tartan" onCollapse={handleCollabse}>
      <StyledSettingsDiv>
        <StyledSettingsField>
          <StyledSettingsLabel>Tartan pattern:</StyledSettingsLabel>
          <div className="flex flex-row w-full">
            <TartanPicker
              colors={tartan?.colors}
              setColors={setColors}
              url={tartan.url ?? null}
              blockRender={!isCollapsed}
            />
          </div>
        </StyledSettingsField>
      </StyledSettingsDiv>
    </CollapseSection>
  )
}

export default VisualsTartan

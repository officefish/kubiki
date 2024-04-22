import { FC } from 'react'

import { StyledBreadcrumbs } from '../../styled-profile'
import { useUserProfileEditorStore } from '@/client/providers'

const SettingsBreadcrumbs: FC = () => {
  const { path } = useUserProfileEditorStore()

  return (
    <StyledBreadcrumbs>
      <div className="text-sm text-base-content dark:text-base-content-dark/60 breadcrumbs pl-2">
        <ul>
          {path.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </StyledBreadcrumbs>
  )
}

export default SettingsBreadcrumbs

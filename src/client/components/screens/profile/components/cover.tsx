import { FC } from 'react'

import { CoverWrapper, CoverTonner, CoverImage } from '../styled-profile'
interface ICover {
  background?: string
}

const Cover: FC<ICover> = ({ background }) => {
  return (
    <CoverWrapper>
      <CoverImage $background={background}>
        <CoverTonner id="blackOverlay" />
        <div className="lattice_profile"></div>
      </CoverImage>
    </CoverWrapper>
  )
}
export default Cover

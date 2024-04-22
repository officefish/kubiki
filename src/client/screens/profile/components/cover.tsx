import { FC, useEffect, useState } from 'react'

import { CoverWrapper, CoverTonner, CoverImage } from '../styled-profile'
interface ICover {
  background?: string
}

const isValidUrl = (url) => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('/')
  )
}

const processUrl = (url) => {
  if (!isValidUrl(url)) {
    url = '/public/' + url
  }
  return url
}

const Cover: FC<ICover> = ({ background }) => {
  const [src, setSrc] = useState<string>()

  useEffect(() => {
    if (background?.length) {
      const url = processUrl(background)
      setSrc(url)
    }
  }, [background])

  return (
    <CoverWrapper>
      <CoverImage $background={src}>
        <CoverTonner id="blackOverlay" />
        <div className="lattice_profile"></div>
      </CoverImage>
    </CoverWrapper>
  )
}
export default Cover

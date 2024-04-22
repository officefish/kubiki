import { FC } from 'react'
import { StyledTartan } from '../../styled-profile'

interface TartanOptions {
  url?: string
}

const CoverTartan: FC<TartanOptions> = (options) => {
  const { url } = options
  return (
    <div className="relative block w-full h-screen-no-header-no-cover">
      <StyledTartan $background={url} />
    </div>
  )
}
export default CoverTartan

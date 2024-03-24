import tw from 'tailwind-styled-components'
import styled from 'styled-components'

export interface WithBackground {
  $background?: string
}
const CoverImageTW = tw.div`
absolute 
top-0 
w-full h-full 
bg-center bg-cover
`
export const CoverImage = styled(CoverImageTW)<WithBackground>`
  ${(p) =>
    p.$background ? 'background-image: url("' + p.$background + '")' : ''}
`

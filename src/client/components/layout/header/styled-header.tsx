import tw from 'tailwind-styled-components'
import styled from 'styled-components'

export const StyledHeader = tw.header`
fixed z-50 
top-0 left-0 
w-full h-16
shadow-lg shadow-gray-900
flex items-start justify-between  
text-base-content
dark:text-base-content-dark
bg-base-300
dark:bg-base-300-dark
`

export const HeaderOffset = tw.div`h-16`

export const HeaderDescriptionWrapper = tw.div`
h-12
pl-4 
flex
items-end 
justify-end
`

interface WithFontFamily {
  $fontFamily?: string
}

export const HeaderDescription = tw.div<WithFontFamily>`
text-base 
ml-2 
font-normal 
cursor-default 
whitespace-nowrap
text-base-content/50
dark:text-base-content-dark/50
${(p) => (p.$fontFamily ? 'font-' + p.$fontFamily : '')}
`

export const StyledHeaderNavigation = tw.div<WithFontFamily>`
flex 
flex-row 
justify-end items-end 
h-[3.8rem] pr-4
text-base-content/50
dark:text-base-content-dark/50
${(p) => (p.$fontFamily ? 'font-' + p.$fontFamily : '')}
`

export const StyledDropdown = tw.div`dropdown dropdown-end`

interface MaybeActive {
  $active: boolean
}

export const StyledDropdownButton = tw.button<MaybeActive>`
btn
${(p) => (p.$active ? 'btn-primary' : 'btn-ghost')}
`

export const StyledButton = tw.button`
btn 
normal-case 
btn-ghost
text-base-content/50 
dark:text-base-content-dark/50
`
export const NavigationButton = tw(StyledButton)`gap-2`

export const DropdownContent = tw.div`
dropdown-content 
top-px max-h-96 
h-[19vh]
w-52 
overflow-y-auto 
mt-14
rounded-t-box rounded-b-box 
shadow-2xl 
bg-base-200 
text-base-content 
dark:bg-base-200-dark 
dark:text-base-content-dark
`

export const DropdownContentGrid = tw.div`
grid grid-cols-1 gap-3 p-3
`

export const StyledUserName = styled.section`
  @media screen and (max-width: 540px) {
    display: none;
  }
  max-width: 16em;
  white-space: nowrap;
  overflow-x: hidden;
`
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

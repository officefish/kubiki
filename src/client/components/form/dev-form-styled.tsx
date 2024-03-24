import tw from 'tailwind-styled-components'
import styled from 'styled-components'

export function classer(selector: string, allclasses: string): string {
  const regex = /[\n\r\s]+/i
  const classList = allclasses.split(regex)
  return classList
    .map((item) => (item.length ? `${selector}:${item}` : ''))
    .join(' ')
}

export const DevFormLayout = tw.div`
container
mx-auto
h-full
min-h-[90vh]
flex
flex-col
items-center
justify-center
text-base-content
font-display
`

export const DevFormWrapper = tw.div`
card
max-w-sm 
shadow-2xl 
flex flex-col
items-center
bg-base-100
dark:bg-base-100-dark
`
export const DevFormHeader2 = tw.h2`
w-full 
h-14 
inline-flex 
items-center 
justify-center 
font-bold 
rounded-t-lg
uppercase
bg-accent 
text-accent-content
dark:bg-accent-dark
dark-text-accent-content-dark
`

export const DevForm = tw.form`
card-body
`
export const DevNoForm = tw.div`
card-body
`

export const Copyright = tw.p`
text-center 
text-xs 
rounded-b-lg
text-primary/40
dark:text-primary-dark/70
mb-2
`

export const DevSubmitWrapper = tw.div`
flex items-center justify-center h-8 mt-8
`

export const DevSubmitButton = tw.button`
btn 
btn-wide
btn-outline
btn-accent
dark:btn-accent-dark
`

export const DevFormField = tw.div`
form-control
mt-2
`

export const DevFormLabel = tw.label`
label
`
export const DevFormLabelText = tw.span`
text-sm
text-primary
dark:text-primary-dark
`

export const DevFormLabelInput = tw.input`
input input-bordered input-primary
placeholder-primary/70
dark:placeholder-secondary-dark/70
`

export const DevFormFieldWarning = tw.div`
alert alert-warning mt-2
`

export const DevFormFieldError = tw.div`
alert alert-error mt-2 w-[95%] text-sm
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

const ContainImageTW = tw.div`
absolute 
top-0 
w-full h-full 
bg-center bg-contain
bg-no-repeat
`
export const ContainImage = styled(ContainImageTW)<WithBackground>`
  ${(p) =>
    p.$background ? 'background-image: url("' + p.$background + '")' : ''}
`

export const StyledFileInput = tw.input`
file-input file-input-bordered file-input-md w-full min-w-sm max-w-lg
`
interface IsActive {
  $active?: boolean
}

export const StyledStarButton = tw.button<IsActive>`
${(p) => (p.$active ? 'text-secondary dark:text-secondary-dark' : 'text-neutral dark:text-neutral-dark')}
`

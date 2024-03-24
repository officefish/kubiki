import tw from 'tailwind-styled-components'
interface IsActive {
  $active?: boolean
}

export const StyledReadyInput = tw.input`
btn btn-outline btn-accent gap-2 uppercase flex-1 m-4 md:min-w-40
`

export const StyledCancelButton = tw.button`
btn btn-outline btn-error gap-2 uppercase flex-1 m-4 md:min-w-40
`

export const StyledMenuItem = tw.li<IsActive>`
rounded-md
uppercase
font-semibold
${(p) => (p.$active ? 'bg-info dark:bg-info-dark' : '')}
${(p) => (p.$active ? 'text-base-100 dark:text-base-100-dark' : '')}
`

export const StyledDialog = tw.dialog`
modal
`

export const StyledModalBox = tw.div`
!w-11/12 !max-w-5xl !h-min-[80%] 
modal-box
flex flex-col items-center justify-center
`
export const StyledFormBody = tw.div`
card-body
w-full
`

export const StyledFormWrapper = tw.div`
card max-w-[96%] md:max-w-[70%] shadow-2xl flex flex-col items-center bg-base-300 dark:bg-base-300-dark h-min-[70%] w-full
`
export const StyledFormHeader = tw.h2`
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

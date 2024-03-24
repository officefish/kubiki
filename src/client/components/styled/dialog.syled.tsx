import tw from 'tailwind-styled-components'
// interface IsActive {
//   $active?: boolean
// }

export const StyledReadyInput = tw.input`
btn btn-outline btn-accent gap-2 uppercase flex-1 m-4 md:min-w-40
`

export const StyledCancelButton = tw.button`
btn btn-outline btn-error uppercase flex-1 md:min-w-40
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

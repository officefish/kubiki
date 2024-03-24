import tw from 'tailwind-styled-components'
import styled from 'styled-components'

/* Cover styles */
export const CoverWrapper = tw.section`
relative block w-full h-[30rem]
`

export const CoverTonner = tw.span`
absolute 
top-0
w-full h-[30rem]
bg-black/50
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

/* Profile styles */
export const StyledProfileLayout = tw.section`
absolute 
top-0 left-0 
w-screen 
mt-4
lg:mt-12
`

export const StyledProfileWrapper = tw.div`
block 
ml-[7%] 
mr-[7%] 
mt-[3%]
md:ml-[15%] 
md:mr-[15%]
`

interface WithFontFamily {
  $fontFamily?: string
}

export const StyledProfileBody = tw.div<WithFontFamily>`
relative 
flex flex-col 
min-w-0 
break-words 
w-full 
mt-8
shadow-xl 
rounded-lg
bg-base-300 
dark:bg-base-300-dark
text-base-content
dark:text-base-content-dark
${(p) => (p.$fontFamily ? 'font-' + p.$fontFamily : '')}
`

/* Avatar styles */
export const StyledAvatarLayout = tw.div`
relative
flex
justify-center
w-full
`
export const StyledAvatarWrapper = tw.div`
absolute 
w-20 h-20 
lg:w-24 lg:h-24 
z-10
mask mask-squircle
`

export const AvatarImageClasses = `
shadow-xl 
align-middle 
border-none 
absolute
`

export const StyledProfileHeader = tw.div`
flex flex-col 
justify-between
lg:flex-row 
`

/* Header styles */
export const StyledStats = tw.div`
flex 
items-end
mt-14 
justify-evenly
w-full
lg:gap-1
lg:mt-0
lg:justify-start 
lg:w-auto
lg:ml-2
`

export const SingleStat = tw.div`
flex flex-col 
items-end 
mx-[2vw] 
lg:mx-[1vw]
text-center
rounded
p-2
min-w-[64px]
hover:bg-base-content/20 
hover:dark:bg-base-content-dark/20
text-base-content/50
dark:text-base-content-dark/50
hover:text-base-content
hover:dark:text-base-content-dark
`

export const StatTitle = tw.span`
flex 
justify-center
w-full
text-xs
text-current
dark:text-current
uppercase
`

export const StatValue = tw.span`
flex
justify-center
text-2xl 
w-full 
font-bold  
uppercase 
tracking-wide
`

export const StyledFunctional = tw.div`
flex 
items-end 
h-20
w-full 
gap-2
mr-[2vw]
justify-center
lg:w-auto
lg:justify-end 
`

interface IsActive {
  $active?: boolean
}

export const SettingsButton = tw.button<IsActive>`
btn btn-ghost gap-2
text-base-content/50
dark:text-base-content-dark/50
hover:text-base-content
hover:dark:text-base-content-dark
${(p) => (p.$active ? 'btn-ghost' : 'btn-neutral')}
`

export const StyledButton = tw.button`
btn btn-outline btn-primary gap-2
`

/* Basic Info */
export const BasicInfoWrapper = tw.div`
text-center 
mt-4 lg:mt-12
text-base-content
dark:text-base-content-dark
`

export const BasicInfoFullname = tw.h3`
text-3xl 
font-semibold 
leading-normal
`

export const BasicInfoLocation = tw.div`
text-sm 
leading-normal 
mt-2 
font-bold 
uppercase
text-base-content/70
dark:text-base-content-dark/50
`

export const BasicInfoCareer = tw.div`
mt-1 
lg:mt-10 
text-sm
text-base-content/70
dark:text-base-content-dark/50
`

export const BasicInfoEducation = tw.div`
text-sm 
mt-1 
lg:mt-2 
text-base-content/70
dark:text-base-content-dark/50
`
export const ProfileDelimeter = tw.div`
mt-3 
lg:mt-4 
border-t 
border-dashed 
border-base-content/50 
dark:border-base-content-dark/50
ml-[2vw] mr-[2vw]
`

/* Quote */
export const QuoteContainer = tw.div`
flex flex-wrap 
justify-center 
text-center 
mt-4
`
export const QuoteWrapper = tw.div`
w-full lg:w-10/12 px-8
`

const MaxLinesParagraph = styled.p`
  display: inline-block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 7.2em;
  line-height: 1.8em;
`

export const QuoteParagraph = tw(MaxLinesParagraph)`
mb-4
text-xs 
md:text-sm 
md:italic 
md:font-extralight
`

/* Resent Activities */
export const ResentActivitiesWrapper = tw.div`
inline-flex w-full justify-center p-4
`

/* Settings Breadcrumbs */
export const StyledBreadcrumbs = tw(StyledStats)``

/* Settings tabs */
interface IActiveTab {
  $active: boolean
}

export const StyledSettingsTab = tw.button<IActiveTab>`
tab tab-lifted
${(p) => (p.$active ? 'tab-active' : '')}
${(p) =>
  p.$active
    ? '[--tab-bg:hsl(var(--b3))] [--tab-bg-dark:hsl(var(--b3-d))]'
    : '[--tab-bg:hsl(var(--b1))] [--tab-bg-dark:hsl(var(--b1-d))]'}
${(p) =>
  p.$active
    ? '[--tab-border-color:hsl(var(--b3))] [--tab-border-color-dark:hsl(var(--b3-d))]'
    : '[--tab-border-color:hsl(var(--b1))] [--tab-border-color-dark:hsl(var(--b1-d))]'}
`

/* Settings accordion classes */

export const StyledCollapseContainer = tw.div`
join join-vertical w-full
`

interface IForceCollapse {
  $forceCollapse?: boolean
}

export const StyledCollapseSection = tw.section<IForceCollapse>`
join-item
collapse 
collapse-plus 

${(p) => (p.$forceCollapse ? 'collapse-open' : '')}
${(p) =>
  p.$forceCollapse
    ? 'bg-base-100 dark:bg-base-100-dark'
    : 'bg-base-300 dark:bg-base-300-dark'}
${(p) =>
  p.$forceCollapse
    ? 'hover:bg-base-100 hover:dark:bg-base-100-dark'
    : 'hover:bg-base-200 hover:dark:bg-base-200-dark'}
`
interface IOpenable {
  $open?: boolean
}
export const StyledProfileLining = tw.div<IOpenable>`
${(p) => (p.$open ? 'h-24' : '')}
`
/*
${(p) => p.$forceCollapse 
    ? "bg-base-300 dark:bg-base-300-dark" 
    : "bg-base-100 dark:bg-base-100-dark"}
${(p) => p.$forceCollapse 
    ? "hover:bg-base-300 hover:dark:bg-base-300-dark" 
    : "hover:bg-accent hover:dark:bg-accent-dark hover:text-accent-content hover:dark:text-accent-content-dark"}
*/

export const StyledCollapseSectionTitle = tw.h3`
collapse-title 
text-sm
font-medium
uppercase
`

export const StyledCollapseSectionContent = tw.div`
collapse-content
`
/* Settings form classes */
export const SettingsContentDelimeter = tw.div`
border-t 
border-dashed 
border-base-content/30 
dark:border-base-content-dark/30
`

export const StyledSettingsForm = tw.form`
flex flex-col gap-3 mt-4
`

export const StyledSettingsDiv = tw.div`
flex flex-col gap-3 mt-4
`

export const StyledSettingsField = tw.div`
flex flex-col md:flex-row gap-2 pr-2
`

const NoFocusLabel = styled.label`
  pointer-events: none;
`

export const StyledSettingsLabel = tw(NoFocusLabel)`
min-w-[120px]
label flex-none uppercase 
text-xs
`

export const StyledSettingsInput = tw.input`
shrink w-full input input-ghost
`

/* Avatar picker */
export const StyledAvatarPickerContainer = tw.div`
flex flex-row justify-between items-center w-full gap-4
`

export const StyledAvatarPickerInput = tw.input`
file-input file-input-bordered file-input-md w-full min-w-sm max-w-lg
`

export const StyledAvatarPickerAvatar = tw.div`
avatar
`

export const StyledAvatarPickerImgWrapper = tw.div`
w-16 h-16 mask mask-squircle
`
/* Avatar picker crop modal */

export const StyledAvatarPickerDialog = tw.dialog`
modal
`

export const StyledAvatarPickerForm = tw.form`
!w-11/12 !max-w-5xl !h-[80%] modal-box
`

export const StyledAvatarCropperContainer = tw.div`
relative w-full h-full
`

export const StyledAvatarCropperCloseBtn = tw.button`
btn btn-sm btn-circle btn-ghost absolute right-2 top-2
`

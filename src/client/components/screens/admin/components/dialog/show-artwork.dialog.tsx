import { FC, useRef, MouseEvent, useEffect, SyntheticEvent } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
} from '@/client/components/styled/dialog.syled'
import { IArtwork } from '@/client/models/challenge.types'
import { ContainImage } from '@/client/components/form/dev-form-styled'

//import { useRouter } from 'next/router'
interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  artwork: IArtwork
}

const ShowArtworkDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const { setIsOpen, isOpen, artwork } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelView(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newWindow = window.open(
      artwork.original,
      '_blank',
      'noopener,noreferrer',
    )
    if (newWindow) newWindow.opener = null
  }

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <div
          className="h-96 w-full relative cursor-pointer"
          onClick={handleClick}
        >
          <ContainImage $background={artwork?.url} />
        </div>
        <div className="flex pt-6">
          <StyledCancelButton onClick={cancelView}>Close</StyledCancelButton>
        </div>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default ShowArtworkDialog

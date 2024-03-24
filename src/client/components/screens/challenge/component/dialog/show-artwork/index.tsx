import { FC, useRef, MouseEvent, useEffect, SyntheticEvent } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledCancelViewButton,
  StyledDialog,
  StyledModalBox,
} from '../../../challenge.styled'
import { IArtwork } from '@/client/models/challenge.types'
import { ContainImage } from '@/client/components/form/dev-form-styled'
import { getAgeLiteral } from '@/client/utilities/age.utils'

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
        <div className="pt-6 grid grid-cols-3 w-full">
          <div className="flex flex-row items-end text-secondary">
            {artwork?.author?.firstName} {artwork?.author?.lastName}.{' '}
            {artwork?.author?.age} {getAgeLiteral(artwork?.author?.age)}.
          </div>
          <div className="text-center">
            <StyledCancelViewButton onClick={cancelView}>
              Close
            </StyledCancelViewButton>
          </div>
          <div className="flex flex-row items-end justify-end text-secondary">
            {artwork?.ageGroup}
          </div>
        </div>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default ShowArtworkDialog

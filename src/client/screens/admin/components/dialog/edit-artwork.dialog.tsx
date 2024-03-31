import { FC, useRef, MouseEvent, useEffect, useState } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import { FormProps } from '@/client/utilities/form.types'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
} from '../../admin.styled'

import FormField from '@/client/components/form/dev/field'
import { IArtwork } from '@/client/models/challenge.types'
import AreaFormField from '@/client/components/form/dev/textarea.field'

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  artwork: IArtwork
}

const EditArtworkDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
    artwork,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
    setArtworkTitle('')
    setDescription('')
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const [artworkTitle, setArtworkTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setArtworkTitle(artwork?.title)
    setDescription(artwork?.description)
  }, [artwork])

  //   useEffect(() => {
  //     console.log(errors)
  //   }, [errors])

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <form onSubmit={handleSubmit(submitHandler)}>
            <StyledFormBody>
              <FormField
                title="Title"
                register={register}
                errors={errors}
                value={artworkTitle}
                tag="title"
              />
              <AreaFormField
                title="Description"
                placeholder="Artwork description"
                register={register}
                errors={errors}
                value={description}
                tag="description"
              />
            </StyledFormBody>
            <div className="h-[30%] m-8 flex">
              <StyledReadyInput type="submit" value="Update author" />
              <StyledCancelButton onClick={cancelClick}>
                Cancel
              </StyledCancelButton>
            </div>
          </form>
        </StyledFormWrapper>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default EditArtworkDialog

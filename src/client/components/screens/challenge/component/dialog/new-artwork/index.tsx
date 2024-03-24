import { FC, useRef, MouseEvent, useEffect } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
} from '../../../challenge.styled'

import FormField from '@client/components/form/dev/field'
import { FormProps } from '@/client/utilities/form.types'
import NumberFormField from '@/client/components/form/dev/number.field'
//import ImageUploadField from '@/client/components/form/dev/image-upload.field'

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
}

const NewArtworkDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWorkspaceCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <form onSubmit={handleSubmit(submitHandler)}>
            <StyledFormBody>
              <FormField
                title="First Name"
                tag="firstName"
                register={register}
                errors={errors}
              />
              <FormField
                title="Last name"
                tag="lastName"
                register={register}
                errors={errors}
              />
              <NumberFormField
                title="age"
                register={register}
                errors={errors}
                value={4}
              />
              <input type="file" id={'files'} {...register('files')} />
            </StyledFormBody>
            <div className="h-[30%] m-8 flex">
              <StyledReadyInput type="submit" value="New artwork" />
              <StyledCancelButton onClick={cancelWorkspaceCration}>
                Cancel
              </StyledCancelButton>
            </div>
          </form>
        </StyledFormWrapper>
      </StyledModalBox>
    </StyledDialog>
  )
}
export default NewArtworkDialog

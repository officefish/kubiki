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

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
}

const NewChallengeDialog: FC<DialogProps> = (props) => {
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
              <FormField title="Title" register={register} errors={errors} />
            </StyledFormBody>
            <div className="h-[30%] m-8 flex">
              <StyledReadyInput type="submit" value="New challenge" />
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
export default NewChallengeDialog

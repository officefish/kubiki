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
import { IAuthor } from '@/client/models/challenge.types'
import NumberFormField from '@/client/components/form/dev/number.field'

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  author: IAuthor
}

const EditAuthorDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
    author,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelClick(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    //setCurrentRole(null)
    setIsOpen(false)
    setFirstName('')
    setLastName('')
    setAge(0)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    setFirstName(author?.firstName)
    setLastName(author?.lastName)
    setAge(author?.age)
  }, [author])

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
                title="First Name"
                register={register}
                errors={errors}
                value={firstName || ''}
                tag="firstName"
              />
              <FormField
                title="Last Name"
                register={register}
                errors={errors}
                value={lastName || ''}
                tag="lastName"
              />
              <NumberFormField
                title="age"
                register={register}
                errors={errors}
                value={+age || 4}
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
export default EditAuthorDialog

import { FC, useRef, MouseEvent, useEffect, useState } from 'react'
import useGlobalOverflowHidden from '@client/hooks/force-overflow'

import { FormProps } from '@/client/utilities/form.types'
import { Role, IRole } from '@/client/models/user.model'

import {
  StyledReadyInput,
  StyledCancelButton,
  StyledDialog,
  StyledModalBox,
  StyledFormBody,
  StyledFormWrapper,
  StyledFormHeader,
} from '../../admin.styled'
import SelectFormField from '@/client/components/form/dev/select.field'
import { getEnumKeys } from '@/client/utilities/enum.utilities'

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  initialRole: IRole
}

const UpdateRoleDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    title,
    submitHandler,
    register,
    errors,
    handleSubmit,
    setIsOpen,
    isOpen,
    initialRole,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  function cancelWorkspaceCration(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    setCurrentRole(null)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  useEffect(() => {
    setCurrentRole(initialRole)
    console.log('update dialog')
    console.log(initialRole)
  }, [initialRole, isOpen])

  const [currentRole, setCurrentRole] = useState<IRole>()

  const handleCore = (e) => {
    setCurrentRole(e.target.value)
  }

  return (
    <StyledDialog ref={modalRef} onClose={onDialogClose}>
      <StyledModalBox>
        <StyledFormWrapper>
          <StyledFormHeader>{title}</StyledFormHeader>
          <form onSubmit={handleSubmit(submitHandler)}>
            <StyledFormBody>
              <SelectFormField
                title="Role"
                onChange={handleCore}
                value={currentRole}
                items={getEnumKeys(Role)}
                register={register}
                errors={errors}
              />
            </StyledFormBody>
            <div className="h-[30%] m-8 flex">
              <StyledReadyInput type="submit" value="Update role" />
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
export default UpdateRoleDialog

import { FC } from 'react'
import { FormProps } from '@client/utilities/form.types'
import FormField from '@client/components/form/dev/field'

import {
  DevForm,
  DevSubmitWrapper,
  DevSubmitButton,
} from '@client/components/form/dev-form-styled'

const ForgotPasswordForm: FC<FormProps> = ({
  title,
  register,
  handleSubmit,
  submitHandler,
  errors,
}) => {
  return (
    <DevForm onSubmit={handleSubmit(submitHandler)}>
      <FormField
        title="Email"
        register={register}
        errors={errors}
        onChange={null}
      />
      <DevSubmitWrapper>
        <DevSubmitButton>{title}</DevSubmitButton>
      </DevSubmitWrapper>
    </DevForm>
  )
}

export default ForgotPasswordForm

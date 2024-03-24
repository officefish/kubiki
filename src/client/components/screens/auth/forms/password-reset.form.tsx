import { FC } from 'react'
import { FormTokenProps } from '@client/utilities/form.types'
import FormField from '@client/components/form/dev/field'
import HiddenFormField from '@client/components/form/dev/hidden.field'

import {
  DevForm,
  DevSubmitWrapper,
  DevSubmitButton,
} from '@client/components/form/dev-form-styled'

const PasswordResetForm: FC<FormTokenProps> = ({
  title,
  register,
  handleSubmit,
  submitHandler,
  errors,
  email,
  expires,
  token,
}) => {
  //console.log(email, expires, token)
  return (
    <DevForm onSubmit={handleSubmit(submitHandler)}>
      <FormField title="Password" register={register} errors={errors} />
      <HiddenFormField
        title="Email"
        value={email}
        register={register}
        errors={errors}
      />
      <HiddenFormField
        title="Expires"
        value={expires}
        register={register}
        errors={errors}
      />
      <HiddenFormField
        title="Token"
        value={token}
        register={register}
        errors={errors}
      />
      <DevSubmitWrapper>
        <DevSubmitButton>{title}</DevSubmitButton>
      </DevSubmitWrapper>
    </DevForm>
  )
}

export default PasswordResetForm

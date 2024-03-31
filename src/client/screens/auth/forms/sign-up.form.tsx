import { FC } from 'react'
import { FormProps } from '@client/utilities/form.types'
import FormField from '@client/components/form/dev/field'

import {
  DevForm,
  DevSubmitWrapper,
  DevSubmitButton,
} from '@client/components/form/dev-form-styled'

const SignUpForm: FC<FormProps> = ({
  title,
  register,
  handleSubmit,
  submitHandler,
  errors,
}) => {
  return (
    <DevForm onSubmit={handleSubmit(submitHandler)}>
      <FormField title="Name" register={register} errors={errors} />
      <FormField title="Email" register={register} errors={errors} />
      <FormField title="Password" register={register} errors={errors} />
      <DevSubmitWrapper>
        <DevSubmitButton>{title}</DevSubmitButton>
      </DevSubmitWrapper>
    </DevForm>
  )
}
export default SignUpForm

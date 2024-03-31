import { FC } from 'react'
import Link from 'next/link'
import { FormProps } from '@client/utilities/form.types'
import FormField from '@client/components/form/dev/field'

import {
  DevForm,
  DevSubmitWrapper,
  DevSubmitButton,
} from '@client/components/form/dev-form-styled'

const SignInForm: FC<FormProps> = ({
  title,
  register,
  handleSubmit,
  submitHandler,
  errors,
}) => {
  return (
    <DevForm onSubmit={handleSubmit(submitHandler)}>
      <FormField title="Email" register={register} errors={errors} />
      <FormField title="Password" register={register} errors={errors} />
      <DevSubmitWrapper>
        <DevSubmitButton>{title}</DevSubmitButton>
      </DevSubmitWrapper>
      <div className="flex items-center justify-between mt-6 text-sm">
        <Link className="link link-primary link-hover" href="/auth/sign-up">
          No Account?
        </Link>
        <Link
          className="link link-primary link-hover"
          href="/auth/forgot-password"
        >
          Forgot Password?
        </Link>
      </div>
    </DevForm>
  )
}

export default SignInForm

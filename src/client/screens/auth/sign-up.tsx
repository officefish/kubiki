import { FC, useEffect } from 'react'
import SignUpForm from './forms/sign-up.form'

// Styled components
import {
  DevFormLayout,
  DevFormWrapper,
  DevFormHeader2,
  Copyright,
  DevFormFieldError,
} from '@client/components/form/dev-form-styled'

import { ErrorSVG } from '@client/components/ui/svg'

import { useRouter } from 'next/router'
import { useUserStore } from '@/client/providers/auth-user-provider'
import { useSignUpValidator } from './auth.validator'
import { useSignUp } from '@/client/services/auth.service'

const SignUp: FC = () => {
  const title = 'Sign Up'

  const { user, serverError, trigger: onSubmit } = useSignUp()

  const router = useRouter()
  const { setIsValid: setIsValidUser } = useUserStore()

  useEffect(() => {
    if (user) {
      setIsValidUser(false)
      const redirect = '/me'
      router.push(redirect)
    }
  }, [router, setIsValidUser, user])

  const { register, errors, handleSubmit } = useSignUpValidator()

  return (
    <DevFormLayout>
      <DevFormWrapper>
        <DevFormHeader2>{title}</DevFormHeader2>
        {serverError?.message && (
          <DevFormFieldError>
            <ErrorSVG />
            {serverError.message?.toString()}
          </DevFormFieldError>
        )}
        <SignUpForm
          title={title}
          register={register}
          handleSubmit={handleSubmit}
          submitHandler={onSubmit}
          errors={errors}
        />
        <Copyright>&#x00a9; 2024 Techies Group. All rights reserved.</Copyright>
      </DevFormWrapper>
    </DevFormLayout>
  )
}
export default SignUp

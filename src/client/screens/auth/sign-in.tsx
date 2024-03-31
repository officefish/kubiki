import { FC, useEffect } from 'react'

import SignInForm from './forms/sign-in.form'
import { useRouter } from 'next/router'

// Styled components
import {
  DevFormLayout,
  DevFormWrapper,
  DevFormHeader2,
  Copyright,
  DevFormFieldError,
} from '@client/components/form/dev-form-styled'

import { ErrorSVG } from '@client/components/ui/svg'

import { useUserStore } from '@/client/providers/auth-user-provider'
import { useSignInValidator } from './auth.validator'
import { useSignIn } from '@/client/services/auth.service'

const SignIn: FC = () => {
  const title = 'Sign In'

  const { user, serverError, trigger: onSubmit } = useSignIn()

  const router = useRouter()
  const { setIsValid: setIsValidUser } = useUserStore()

  useEffect(() => {
    if (user) {
      setIsValidUser(false)
      const redirect = '/me'
      router.push(redirect)
    }
  }, [router, setIsValidUser, user])

  const { register, errors, handleSubmit } = useSignInValidator()

  return (
    <DevFormLayout>
      <DevFormWrapper>
        <DevFormHeader2>{title}</DevFormHeader2>
        {serverError && (
          <DevFormFieldError>
            <ErrorSVG />
            {serverError?.message?.toString()}
            <br />
            {serverError?.response?.data?.['message']}
          </DevFormFieldError>
        )}
        <SignInForm
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
export default SignIn

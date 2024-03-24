import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForgotPassword } from '@client/services/user.service'
import ForgotPasswordForm from './forms/forgot-password.form'
import { useState } from 'react'
import Link from 'next/link'

import {
  DevFormLayout,
  DevFormWrapper,
  DevFormHeader2,
  DevNoForm,
  Copyright,
  DevFormFieldError,
} from '@client/components/form/dev-form-styled'

import { ErrorSVG } from '@client/components/ui/svg'
import { useBackendAddressStore } from '@/client/providers'

const email = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
}

const schema = z.object({
  ...email,
})

type ReplyWithStatus = {
  status: string
}

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('')

  const { host, port } = useBackendAddressStore()
  const { onSubmit, reply, serverError } = useForgotPassword<ReplyWithStatus>({
    setEmail,
    host,
    port,
  })
  const [isSent, setIsSent] = useState(false)
  const title = 'Request password'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (reply && reply.status === 'ok') {
      setIsSent(true)
    }
  }, [reply])

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
        {isSent ? (
          <DevNoForm>
            <p className="text-sm text-center w-full px-3 pt-2">
              Reset password instruction sent to: <span>{email}</span>
            </p>
            <div className="flex items-center justify-center">
              <Link className="link link-hover" href="/auth/sign-in">
                Try sign in?
              </Link>
            </div>
          </DevNoForm>
        ) : (
          <ForgotPasswordForm
            title={title}
            register={register}
            handleSubmit={handleSubmit}
            submitHandler={onSubmit}
            errors={errors}
          />
        )}
        <Copyright>&#x00a9; 2023 Techies Group. All rights reserved.</Copyright>
      </DevFormWrapper>
    </DevFormLayout>
  )
}

export default ForgotPassword

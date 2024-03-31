import { FC } from 'react'
import { TokenProps } from '@client/utilities/form.types'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodTypeAny } from 'zod'
import PasswordResetForm from './forms/password-reset.form'
import { useResetPassword } from '@client/services/user.service'

// Styled components
import {
  DevFormLayout,
  DevFormWrapper,
  DevFormHeader2,
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
const password = {
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Must be 8 or more characters long' }),
}

const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return parseInt(a, 10)
    } else if (typeof a === 'number') {
      return a
    } else {
      return undefined
    }
  }, schema)

const schema = z.object({
  ...email,
  ...password,
  expires: numericString(z.number()),
  token: z.string(),
})

const PasswordReset: FC<TokenProps> = ({ email, expires, token }) => {
  const title = 'New Password'

  const { host, port } = useBackendAddressStore()
  const { onSubmit, serverError } = useResetPassword(host, port)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

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
        <PasswordResetForm
          title={title}
          register={register}
          handleSubmit={handleSubmit}
          submitHandler={onSubmit}
          errors={errors}
          email={email}
          expires={expires}
          token={token}
        />
        <Copyright>&#x00a9; 2023 Techies Group. All rights reserved.</Copyright>
      </DevFormWrapper>
    </DevFormLayout>
  )
}
export default PasswordReset

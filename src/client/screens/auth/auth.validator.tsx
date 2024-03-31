import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const email = {
  email: z.string().email(),
}

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
)

const password = {
  password: z
    .string() // string with advanced schemas
    .min(8) // Expect password length to be greater or equal to 8
    .max(36) // Expect password length to be less or equal to 100
    .regex(passwordValidation, {
      message:
        'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
}

const name = {
  name: z
    .string()
    .min(7, { message: 'Must be 7 or more characters long' })
    .max(24, { message: 'Must be 24 or less characters long' })
    .optional(),
}

const SignInSchema = z.object({
  ...email,
  ...password,
})

const SignUpSchema = z.object({
  ...email,
  ...password,
  ...name,
})

export function useSignInValidator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  })
  return { register, handleSubmit, errors }
}

export function useSignUpValidator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  })
  return { register, handleSubmit, errors }
}

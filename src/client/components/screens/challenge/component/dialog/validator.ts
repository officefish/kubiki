import {
  //RegisterOptions,
  // FieldValues,
  //UseFormRegisterReturn,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function useChallengeValidator() {
  const title = {
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(24, { message: 'Must be 24 or less characters long' }),
  }

  const schema = z.object({
    ...title,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return { register, handleSubmit, errors }
}

export function useArtworkValidator() {
  const firstName = {
    firstName: z
      .string({
        required_error: 'First name is required',
        invalid_type_error: 'Second name must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(24, { message: 'Must be 24 or less characters long' }),
  }

  const lastName = {
    lastName: z
      .string({
        required_error: 'Second name is required',
        invalid_type_error: 'Second name must be a string',
      })
      .min(2, { message: 'Must be 2 or more characters long' })
      .max(24, { message: 'Must be 24 or less characters long' }),
  }

  const age = {
    age: z.coerce.number().min(4).max(18),
  }

  const MAX_FILE_SIZE = 5000000
  const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  const files = {
    files: z
      .any()
      // To not allow empty files
      .refine((files) => files?.length >= 1, { message: 'Image is required.' })
      // To not allow files other than images
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: '.jpg, .jpeg, .png and .webp files are accepted.',
      })
      // To not allow files larger than 5MB
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
  }

  const schema = z.object({
    ...firstName,
    ...lastName,
    ...age,
    ...files,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return { register, handleSubmit, errors }
}

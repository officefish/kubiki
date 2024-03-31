import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@/client/models/user.model'
//import { CoreStock } from '@/client/models/exchange/alpha-vintage.types'

export function useUpdateRoleValidator() {
  const role = {
    role: z.nativeEnum(Role),
  }

  const schema = z.object({
    ...role,
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

export function useUpdateAuthorValidator() {
  const schema = z.object({
    firstName: z.string().max(44),
    lastName: z.string().max(44),
    age: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().gte(3, 'Must be 3 and above'),
    ),
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

export function useUpdateAtworkMetadata() {
  const schema = z.object({
    title: z.string().max(44),
    description: z.string().max(220),
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

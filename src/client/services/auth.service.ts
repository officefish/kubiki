import { User } from '../models/user.model'
import { useAxiosPostTrigger } from './axios.service'

export interface IUserResponse {
  code: string
  user: User
}

export const useSignIn = () => {
  const { data, serverError, trigger } = useAxiosPostTrigger<IUserResponse>({
    route: 'auth/sign-in',
  })

  return { user: data?.user, serverError, trigger }
}

export const useSignUp = () => {
  const { data, serverError, trigger } = useAxiosPostTrigger<IUserResponse>({
    route: 'auth/sign-up',
  })

  return { user: data?.user, serverError, trigger }
}

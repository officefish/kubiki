import { User } from '@/client/models/user.model'

export interface IUserState {
  user?: User
  isValid: boolean
}

export interface IUserActions {
  setUser: (user: User) => void
  setIsValid: (status: boolean) => void
}

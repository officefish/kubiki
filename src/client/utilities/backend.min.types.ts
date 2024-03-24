import { IUserProfile } from '../models/user.model'

export interface IBackendMinimum {
  host: string
  port: number
}

export interface ISubDomain extends IBackendMinimum {
  slug?: string | null
  userProfile?: IUserProfile | null
}

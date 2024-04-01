import { useCallback, useEffect, useState } from 'react'
import { useAxiosGetTrigger, useAxios_POST_RawData } from './axios.service'

import { IUserProfile, User } from '@client/models/user.model'
import { AxiosError } from 'axios'
import useTimeout from '../hooks/timeout'
interface ISuccessResponse {
  status?: string
  statusCode?: number
}

const API_PREFIX = 'api/v1'
const DIRECTORY = 'user/profile'

export const useUpdateProfile = (host: string, port: number) => {
  const {
    onSubmit: updateUserProfile,
    data: updateUserProfileResponse,
    serverError: updateUserProfileError,
  } = useAxios_POST_RawData<ISuccessResponse>({
    host,
    port,
    api: API_PREFIX,
    route: `${DIRECTORY}`,
  })
  return {
    updateUserProfile,
    updateUserProfileResponse,
    updateUserProfileError,
  }
}

interface IUserProfileResponse {
  code: string
  userProfile: IUserProfile
}

export function useUserProfile() {
  const { data, serverError, trigger } =
    useAxiosGetTrigger<IUserProfileResponse>({
      route: 'user/profile',
    })

  return { userProfile: data?.userProfile, serverError, trigger }
}

export function useUserProfileSWR(valid: boolean = false) {
  const [isValid, setIsValid] = useState(valid)

  const {
    userProfile: userProfileData,
    serverError,
    trigger,
  } = useUserProfile()

  const [userProfile, setUserProfile] = useState<IUserProfile>()
  const [error, setError] = useState<AxiosError | Error>()

  useEffect(() => {
    if (isValid) return
    setIsValid(true)
    trigger()
  }, [isValid, trigger])

  useEffect(() => {
    setError(serverError)
  }, [serverError])

  const invalidate = useCallback(() => {
    setIsValid(false)
  }, [setIsValid])

  const { clear } = useTimeout(invalidate, 2000)

  useEffect(() => {
    if (!userProfileData) return
    setUserProfile(userProfileData)
    setIsValid(true)
    clear()
  }, [clear, userProfileData])

  return { userProfile, error, invalidate }
}

interface IUserResponse {
  code: string
  user: User
}

export function useCurrentUser() {
  const { data, serverError, trigger } = useAxiosGetTrigger<IUserResponse>({
    route: 'user/me',
  })

  return { user: data?.user, serverError, trigger }
}

export function useCurrentUserSWR(valid: boolean = false) {
  const [isValid, setIsValid] = useState(valid)

  const { user: userData, serverError, trigger } = useCurrentUser()

  const [user, setUser] = useState<User>()
  const [error, setError] = useState<AxiosError | Error>()

  useEffect(() => {
    if (isValid) return
    setIsValid(true)
    trigger()
  }, [isValid, trigger])

  useEffect(() => {
    setError(serverError)
  }, [serverError])

  const invalidate = useCallback(() => {
    setIsValid(false)
  }, [setIsValid])

  const { clear } = useTimeout(invalidate, 2000)

  useEffect(() => {
    if (!userData) return
    setUser(userData)
    setIsValid(true)
    clear()
  }, [clear, userData])

  return { user, error, invalidate }
}

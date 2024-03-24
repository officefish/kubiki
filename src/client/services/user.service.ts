import {
  useAxiosDeleteTrigger,
  useAxiosPutTrigger,
  useAxios_GET_QueryParams,
  useAxios_POST_RawData_Redirect,
} from './axios.service'
import { SubmitHandler } from 'react-hook-form'
import { FieldValues } from 'react-hook-form'
//import { useState } from "react"
const HOST = 'localhost'
const PORT = 8001

import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'

const API_PREFIX = 'api/v1/user'

import { useAxiosGetOnceAndTrigger } from '@/client/services/axios.service'
import { User } from '@/client/models/user.model'

type ForgotPasswordHookProps = {
  setEmail: Dispatch<SetStateAction<string>>
  host: string
  port: number
}

export const useResetPassword = (host: string, port: number) => {
  const { onSubmit, serverError } = useAxios_POST_RawData_Redirect({
    host,
    port,
    api: API_PREFIX,
    route: 'reset',
    redirect: 'auth/sign-in',
  })
  return { onSubmit, serverError }
}

export const useForgotPassword = <T = object>({
  setEmail,
  host,
  port,
}: ForgotPasswordHookProps) => {
  const {
    onSubmit: onSubmitMiddleware,
    reply,
    serverError,
  } = useAxios_GET_QueryParams<T>({
    host,
    port,
    api: API_PREFIX,
    route: 'forgot-password',
  })

  const onSubmit: SubmitHandler<FieldValues> = async ({ email }) => {
    onSubmitMiddleware(email)
    setEmail(email)
  }

  return { onSubmit, reply, serverError }
}

export const getUserProfilebyDomain = async <T = object>({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'domain',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
  params = {},
  value = '',
} = {}): Promise<T | null> => {
  const url = `${protocol}://${host}:${port}/${api}/${route}/${value}`
  return await axios
    .get(url, {
      headers: { ...headers },
      withCredentials: withCredentials,
      params: { ...params },
    })
    .then((response) => response.data)
    .catch(() => {
      /*console.log(error)*/
      return null
    })
}

interface IUsersResponse {
  code: string
  users: User[]
}

export const useAllUsers = () => {
  const { data, trigger } = useAxiosGetOnceAndTrigger<IUsersResponse>({
    route: 'user/all',
  })

  return { users: data?.users, trigger }
}

interface IStandartResponse {
  code: string
  message: string
}

export const useUpdateRole = () => {
  const { data, trigger } = useAxiosPutTrigger<IStandartResponse>({
    route: 'user/role',
  })

  return { message: data?.message, trigger }
}

export const useDeleteUser = () => {
  const { data, trigger } = useAxiosDeleteTrigger<IStandartResponse>({
    route: 'user',
  })

  return { message: data?.message, trigger }
}

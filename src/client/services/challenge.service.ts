import {
  useAxiosDeleteTrigger,
  useAxiosFetcher_GET,
  useAxiosGetTrigger,
  useAxiosPostTrigger,
  useAxiosPutTrigger,
  useAxios_POST_RawData,
  //   useAxios_POST_RawData_Redirect,
} from './axios.service'

import useSWRMutation from 'swr/mutation'
import {
  AgeGroup,
  IArtwork,
  IChallenge,
  IScore,
} from '../models/challenge.types'
import { useBackendAddressStore } from '../providers'
import { useEffect, useState } from 'react'

const API_PREFIX = 'api/v1'

interface IMinimumResponse {
  statusCode: number
}

interface IChallengeListResponse extends IMinimumResponse {
  challenges: IChallenge[]
}

interface IChallengeData {
  statusCode: number
  payload: IChallenge
}

export function useUserChallengesSWR(host: string, port: number) {
  const route = 'challenge/all'
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({
    host,
    port,
    api: API_PREFIX,
    route,
  })

  const { data, error, trigger } = useSWRMutation<IChallengeListResponse>(
    key,
    fetcher,
  )

  return { challenges: data?.challenges, error, trigger }
}

export function useLastChallengeSWR(host: string, port: number) {
  const route = 'challenge/last'
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({
    host,
    port,
    api: API_PREFIX,
    route,
  })

  const { data, error, trigger } = useSWRMutation<IChallengeData>(key, fetcher)

  return { challengeData: data?.payload, error, trigger }
}

export function useChallengeDataSWR(
  challengeId: string,
  host: string,
  port: number,
) {
  const route = `challenge/${challengeId}`
  const key = `${API_PREFIX}/${route}`

  const { fetcher } = useAxiosFetcher_GET({
    host,
    port,
    api: API_PREFIX,
    route,
  })

  const { data, error, trigger } = useSWRMutation<IChallengeData>(key, fetcher)
  return { challengeData: data?.payload, trigger, error }
}

function useHook_POST_RawData({
  host = '127.0.0.1',
  port = 8001,
  api = 'api/v1',
  route = 'workspace',
} = {}) {
  const { onSubmit, data, serverError } =
    useAxios_POST_RawData<IMinimumResponse>({
      host,
      port,
      api,
      route,
    })
  return { onSubmit, data, serverError }
}

export const useCreateLike = (host: string, port: number) =>
  useHook_POST_RawData({ host, port, route: 'artwork/like' })

export const useDeleteLike = (host: string, port: number) =>
  useHook_POST_RawData({ host, port, route: 'artwork/like/delete' })

interface IStandartResponse {
  code: string
  message: string
}

interface ILastChallengeData {
  skip: number
  take: number
  ageGroup?: AgeGroup
}

interface ILastChallengeResponse {
  code: string
  payload: IChallenge
}

export const useLastChallenge = (input: ILastChallengeData) => {
  const { data, trigger, serverError } =
    useAxiosPostTrigger<ILastChallengeResponse>({
      route: 'challenge/last',
      input,
    })

  return { challenge: data?.payload, trigger, serverError }
}

interface IScoreResponse {
  code: string
  score: IScore
}

export const useUpdateScore = () => {
  const { data, trigger, serverError } = useAxiosPutTrigger<IStandartResponse>({
    route: 'artwork/score',
  })

  return { data, trigger, serverError }
}

export const useGetScore = () => {
  const { data, trigger } = useAxiosGetTrigger<IScoreResponse>({
    route: 'artwork/score',
  })

  return { score: data?.score, trigger }
}

interface IArtworksResponse {
  code: string
  artworks: IArtwork[]
}

export const useAllArtworks = () => {
  const { data, trigger, serverError } = useAxiosGetTrigger<IArtworksResponse>({
    route: 'artwork/all',
  })

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (!isValid) {
      setIsValid(true)
      //console.log(input)
      trigger()
    }
  }, [isValid, trigger])

  const { host, port } = useBackendAddressStore()
  useEffect(() => {
    if (host && port) {
      //console.log('host:', host, 'port:', port)
      setIsValid(false)
    }
  }, [host, port])

  return { artworks: data?.artworks, trigger, serverError }
}

//const { message: artworkMessage, trigger: triggerUpdateArtwork } = useUpdateArtworkMetadata()
//const { message: authorMessage, trigger: triggerUpdateAuthor } = useUpdateAuthor()

export const useUpdateArtworkMetadata = () => {
  const { data, trigger, serverError } = useAxiosPutTrigger<IStandartResponse>({
    route: 'artwork/metadata',
  })

  return { message: data?.message, trigger, serverError }
}

export const useUpdateAuthor = () => {
  const { data, trigger, serverError } = useAxiosPutTrigger<IStandartResponse>({
    route: 'artwork/author',
  })

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return { message: data?.message, trigger, serverError }
}

export const useDeleteArtwork = () => {
  const { data, trigger, serverError } =
    useAxiosDeleteTrigger<IStandartResponse>({
      route: 'artwork',
    })

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return { message: data?.message, trigger, serverError }
}

export const useNewArtwork = () => {
  const { data, trigger, serverError } = useAxiosPostTrigger<IStandartResponse>(
    {
      route: 'artwork/upload',
      headers: {
        'Content-Type': undefined,
      },
    },
  )

  // useEffect(() => {
  //   if (data) {
  //     console.log(data)
  //   }
  // }, [data])

  return { data, trigger, serverError }
}

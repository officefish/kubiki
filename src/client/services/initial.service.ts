import {
  IStandartResponse,
  useAxiosGetTrigger,
  useAxiosPostTrigger,
} from './axios.service'

export const useClearLastChallenge = () => {
  const { data, trigger } = useAxiosGetTrigger<IStandartResponse>({
    route: 'challenge/last/clear',
  })
  return { data, trigger }
}

interface IInitialResponse {
  code: string
  message?: string
  artworks: any
}

export const useUploadInitial = () => {
  const { data, trigger } = useAxiosPostTrigger<IInitialResponse>({
    route: 'challenge/initial',
  })
  return { artworks: data?.artworks, trigger }
}

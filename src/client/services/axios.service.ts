import axios, { AxiosError } from 'axios'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useBackendAddressStore } from '../providers'

export interface IStandartResponse {
  code: string
  message: string
}

const HOST = 'localhost'
const PORT = 8001

const API_PREFIX = 'api/v1'

export function useAxios_POST_RawData_Redirect({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  redirect = 'me',
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  },
} = {}) {
  const request = async (input: any) => {
    const params = JSON.stringify({ ...input })
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    return await axios
      .post(url, params, options)
      .then((response) => response.data)
      .catch((error) => error)
  }

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const response = await request(data)
    if (response instanceof Error) {
      setServerError(response)
    } else {
      router.push(`/${redirect}`)
    }
  }

  return { onSubmit, serverError }
}

export function useAxios_POST_RawData<T>({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  },
} = {}) {
  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(undefined)

  const request = async (input: any) => {
    const params = JSON.stringify({ ...input })
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    return await axios
      .post(url, params, options)
      .then((response) => setData(response.data))
      .catch((error) => setServerError(error))
  }
  const onSubmit = async (data: any) => {
    //console.log(data)
    const response = await request(data)
    return response
  }

  return { onSubmit, data, serverError }
}

export function useAxiosGet({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  options = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  },
} = {}) {
  const [serverError, setServerError] = useState<Error | undefined>(undefined)

  const request = async () => {
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    return await axios
      .get(url, options)
      .then((response) => response.data)
      .catch((error) => error)
  }

  const onSubmit = async () => {
    const response = await request()
    if (response instanceof Error) {
      setServerError(response)
    }
    return response
  }

  return { onSubmit, serverError }
}

export function useAxiosFetcher_GET({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    withCredentials: true,
  },
} = {}) {
  console.log('headerNavigation: host: ' + host + ', port:' + port)
  const fetcher = async () => {
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    return axios.get(url, options).then((response) => response.data)
  }
  return { fetcher }
}

export function useAxios_GET_QueryParams_Redirect<T = object>({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  redirect = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) {
  const caller = async (input: T) => {
    //console.log(input)
    const url = `${protocol}://${host}:${port}/${api}/${route}/{${input}}`
    return await axios
      .get(url, {
        headers: { ...headers },
        withCredentials: withCredentials,
      })
      .then((response) => response.data)
      .catch((error) => error)
  }

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const router = useRouter()

  const onSubmit = async (data: T) => {
    const response = await caller(data)
    if (response instanceof Error) {
      setServerError(response)
    } else {
      router.push(`/${redirect}`)
    }
  }

  return { onSubmit, serverError }
}

export function useAxios_GET_QueryParams<T = object>({
  protocol = 'http',
  host = HOST,
  port = PORT,
  api = API_PREFIX,
  route = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) {
  const request = async (input: string) => {
    const url = `${protocol}://${host}:${port}/${api}/${route}/${input}`
    return await axios
      .get(url, {
        headers: { ...headers },
        withCredentials: withCredentials,
      })
      .then((response) => response.data)
      .catch((error) => error)
  }

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [reply, setReply] = useState<T | null>()

  const onSubmit = async (data: string) => {
    const response = await request(data)
    response instanceof Error ? setServerError(response) : setReply(response)
  }

  return { onSubmit, reply, serverError }
}

export const useAxiosGetOnceAndTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const { host, port } = useBackendAddressStore()
  const [baseUrl, setBaseUrl] = useState('')

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T>()
  const [isValidData, setIsValidData] = useState(true)

  useEffect(() => {
    const url = `${protocol}://${host}:${port}/${api}`
    setBaseUrl(url)
    setIsValidData(false)
  }, [api, host, port, protocol])

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
      setIsValidData(true)
    },
    [setData, setIsValidData],
  ) // Dependency on setUser only

  const handleErrorUser = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
      setIsValidData(true)
    },
    [setData, setIsValidData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(() => {
    const options = {
      headers,
      withCredentials,
    }
    const url = `${baseUrl}/${route}`
    axios
      .get(url, options)
      .then((response) => handleResponseData(response.data))
      .catch((error) => setServerError(error))
  }, [baseUrl, handleResponseData, headers, route, withCredentials])

  const trigger = useCallback(() => {
    onSubmit()
  }, [onSubmit]) // Dependency on setUser only

  useEffect(() => {
    if (isValidData) return
    trigger()
  }, [isValidData, trigger])

  useEffect(() => {
    if (serverError) handleErrorUser(serverError)
  }, [handleErrorUser, serverError])

  return { data, trigger, serverError }
}

export const useAxiosPostTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  input = null,
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const { host, port } = useBackendAddressStore()

  const [serverError, setServerError] = useState<AxiosError | undefined>()
  const [data, setData] = useState<T | null>()

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data) => {
      const options = {
        headers,
        withCredentials,
      }
      const url = `${protocol}://${host}:${port}/${api}/${route}`
      axios
        .post(url, data, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [
      headers,
      withCredentials,
      protocol,
      host,
      port,
      api,
      route,
      handleResponseData,
    ],
  )

  const trigger = useCallback(
    (data = null) => {
      setData(null)
      data ? onSubmit(data) : onSubmit(input)
    },
    [input, onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosPutTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const { host, port } = useBackendAddressStore()
  const [baseUrl, setBaseUrl] = useState('')

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T>()

  useEffect(() => {
    const url = `${protocol}://${host}:${port}/${api}`
    setBaseUrl(url)
  }, [api, host, port, protocol])

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data) => {
      const options = {
        headers,
        withCredentials,
      }
      const params = JSON.stringify({ ...data })
      const url = `${baseUrl}/${route}`
      axios
        .put(url, params, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [baseUrl, handleResponseData, headers, route, withCredentials],
  )

  const trigger = useCallback(
    (data) => {
      setData(null)
      onSubmit(data)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosDeleteTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const { host, port } = useBackendAddressStore()
  const [baseUrl, setBaseUrl] = useState('')

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T>()

  useEffect(() => {
    const url = `${protocol}://${host}:${port}/${api}`
    setBaseUrl(url)
  }, [api, host, port, protocol])

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (data) => {
      const options = {
        data,
        headers,
        withCredentials,
      }
      const url = `${baseUrl}/${route}`
      axios
        .delete(url, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [baseUrl, handleResponseData, headers, route, withCredentials],
  )

  const trigger = useCallback(
    (data) => {
      setData(null)
      onSubmit(data)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

export const useAxiosGetTrigger = <T = object>({
  protocol = 'http',
  api = API_PREFIX,
  route = 'me',
  headers = {
    'Content-Type': 'application/json',
  },
  withCredentials = true,
} = {}) => {
  const { host, port } = useBackendAddressStore()

  const [serverError, setServerError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T>()

  const handleResponseData = useCallback(
    (data: T) => {
      console.log(data)
      setData(data)
    },
    [setData],
  ) // Dependency on setUser only

  const handleResponseError = useCallback(
    (error: Error) => {
      console.error(error)
      setData(null)
    },
    [setData],
  ) // Dependency on setUser only

  const onSubmit = useCallback(
    (input) => {
      const options = {
        data,
        headers,
        withCredentials,
      }
      let url = `${protocol}://${host}:${port}/${api}/${route}`
      if (input) url += `/${input}`
      axios
        .get(url, options)
        .then((response) => handleResponseData(response.data))
        .catch((error) => setServerError(error))
    },
    [
      api,
      data,
      handleResponseData,
      headers,
      host,
      port,
      protocol,
      route,
      withCredentials,
    ],
  )

  const trigger = useCallback(
    (input = null) => {
      setData(null)
      onSubmit(input)
    },
    [onSubmit],
  )

  useEffect(() => {
    if (serverError) handleResponseError(serverError)
  }, [handleResponseError, serverError])

  return { data, trigger, serverError }
}

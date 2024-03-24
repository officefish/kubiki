import { User, Role } from '@/client/models/user.model'
import { useBackendAddressStore } from '@/client/providers'
import { useUserStore } from '@/client/providers/auth-user-provider'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

const MinProfile: FC = () => {
  const protocol = 'http'
  const api = 'api/v1'
  const options = useMemo(
    () => ({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      withCredentials: true,
    }),
    [],
  ) // Since options does not depend on any changing state, an empty dependency array is used

  const { host, port } = useBackendAddressStore()
  const [user, setUser] = useState<User>()

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    console.log(user?.role)
    console.log(user?.role === Role.ADMIN)
    console.log(user?.role === 'ADMIN')
  }, [user])

  const handleResponse = useCallback(
    (data: User) => {
      console.log(data)
      setUser(data)
    },
    [setUser],
  ) // Dependency on setUser only

  const router = useRouter()
  const { setIsValid: setIsUserValid } = useUserStore()
  //setIsUserValid(false)

  const handleLogoutResponse = useCallback(
    (data: any) => {
      console.log(data)
      setIsUserValid(false)
      router.push('/')
    },
    [router, setIsUserValid],
  ) // Dependency on setUser only

  useEffect(() => {
    if (isValid) {
      return
    }

    setIsUserValid(false)
    setIsValid(true)

    const route = 'user/me'
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    axios
      .get(url, options)
      .then((response) => handleResponse(response.data))
      .catch((error) => console.log(error))
  }, [handleResponse, host, isValid, options, port, setIsUserValid])

  const handleLogout = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('sign-out')
    const route = 'auth/sign-out'
    const url = `${protocol}://${host}:${port}/${api}/${route}`
    axios
      .get(url, options)
      .then((response) => handleLogoutResponse(response.data))
      .catch((error) => console.log(error))
  }

  const handleChallenges = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/challenges')
  }

  const handleAdmin = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/admin')
  }

  return (
    <div className="w-full h-screen-no-header flex items-center justify-center">
      {user?.role === Role.ADMIN ? (
        <div className="w-[40%] flex justify-between">
          <button
            className="btn btn-primary btn-outline"
            onClick={handleChallenges}
          >
            Challenges
          </button>
          <button className="btn btn-primary btn-outline" onClick={handleAdmin}>
            Admin
          </button>
          <button
            className="btn btn-primary btn-outline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="btn btn-primary btn-outline" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  )
}
export default MinProfile

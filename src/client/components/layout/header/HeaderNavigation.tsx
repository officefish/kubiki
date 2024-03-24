//import Link from 'next/link'
import { FC, MouseEvent, useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'

import { useSystemColorSchemas } from '@client/providers/theme-provider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

import UserItem from './UserItem'

import {
  StyledHeaderNavigation,
  StyledDropdown,
  NavigationButton,
  DropdownContent,
  DropdownContentGrid,
  StyledDropdownButton,
  StyledButton,
} from './styled-header'

import { DropdownArrow } from '@/client/components/ui/svg'
import { useUserStore } from '@/client/providers/auth-user-provider'
import { useBackendAddressStore } from '@/client/providers'
import axios from 'axios'
import { User } from '@/client/models/user.model'

//import avatar from '@public/team-2-800x800.jpg'

const HeaderNavigation: FC = () => {
  const router = useRouter()
  const href = '/auth/sign-in'

  const signInHandleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(href)
  }

  const {
    user,
    setUser,
    isValid: isValidUser,
    setIsValid: setIsValidUser,
  } = useUserStore()

  const { host, port } = useBackendAddressStore()
  const [userUrl, setUserUrl] = useState('')

  useEffect(() => {
    const url = `http://${host}:${port}/api/v1/user/me`
    setUserUrl(url)
    setIsValidUser(false)
  }, [host, port, setIsValidUser])

  const [serverError, setServerError] = useState<Error | undefined>(undefined)

  const handleResponseUser = useCallback(
    (data: User) => {
      console.log(data.id)
      setUser(data)
      setIsValidUser(true)
    },
    [setUser, setIsValidUser],
  ) // Dependency on setUser only

  const handleErrorUser = useCallback(
    (error: Error) => {
      console.error(error)
      setUser(null)
      setIsValidUser(true)
    },
    [setUser, setIsValidUser],
  ) // Dependency on setUser only

  const onSubmitUser = useCallback(() => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
    axios
      .get(userUrl, options)
      .then((response) => handleResponseUser(response.data))
      .catch((error) => setServerError(error))
  }, [userUrl, handleResponseUser])

  useEffect(() => {
    if (isValidUser) return
    onSubmitUser()
  }, [isValidUser, onSubmitUser])

  useEffect(() => {
    if (serverError) handleErrorUser(serverError)
  }, [handleErrorUser, serverError])

  const { mode, setMode, modes } = useSystemColorSchemas()

  const handleMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setMode(event.currentTarget.value)
  }

  const [faDefinition, setFaDefinition] = useState(faSun)

  useEffect(() => {
    mode === 'light' ? setFaDefinition(faSun) : setFaDefinition(faMoon)
  }, [mode])

  return (
    <StyledHeaderNavigation $fontFamily="old-english">
      <StyledDropdown title="Change mode">
        <NavigationButton tabIndex={0}>
          <FontAwesomeIcon icon={faDefinition} />
          <span className="hidden md:inline">Mode</span>
          <DropdownArrow />
        </NavigationButton>
        <DropdownContent>
          <DropdownContentGrid>
            {modes && (
              <>
                {modes.map((item, i) => {
                  return (
                    <DropdownListButton
                      key={i}
                      item={item}
                      active={item === mode}
                      onClick={handleMode}
                    />
                  )
                })}
              </>
            )}
          </DropdownContentGrid>
        </DropdownContent>
      </StyledDropdown>

      {user && user.authenticated ? (
        <UserItem name={user.name} avatar={user.avatar} />
      ) : (
        <StyledButton onClick={signInHandleClick}>Sign In</StyledButton>
      )}
    </StyledHeaderNavigation>
  )
}

export default HeaderNavigation

interface IActiveDropdown {
  active: boolean
  item: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const DropdownListButton: FC<IActiveDropdown> = ({ active, item, onClick }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => setIsActive(active), [active])

  return (
    <StyledDropdownButton
      value={item}
      type="button"
      $active={isActive}
      onClick={onClick}
    >
      {item}
    </StyledDropdownButton>
  )
}

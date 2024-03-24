import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserState, IUserActions } from './types'
import { User } from '@/client/models/user.model'

type IUserStore = IUserState & IUserActions

const createUserStore = () =>
  createStore<IUserStore>()((set) => ({
    user: null,
    setUser: (user: User) => set(() => ({ user: { ...user } })),
    isValid: true,
    setIsValid: (value: boolean) => set(() => ({ isValid: value })),
  }))

type UserStore = ReturnType<typeof createUserStore>
const UserContext = createContext<UserStore | null>(null)

export const useUserStore = () => {
  const api = useContext(UserContext)
  return {
    user: useStore(api, (state: IUserStore) => state.user),
    setUser: useStore(api, (state: IUserStore) => state.setUser),
    isValid: useStore(api, (state: IUserStore) => state.isValid),
    setIsValid: useStore(api, (state: IUserStore) => state.setIsValid),
  }
}

export const AuthUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef<UserStore>()
  if (!userStoreRef.current) {
    userStoreRef.current = createUserStore()
  }
  return (
    <UserContext.Provider value={userStoreRef.current}>
      {children}
    </UserContext.Provider>
  )
}

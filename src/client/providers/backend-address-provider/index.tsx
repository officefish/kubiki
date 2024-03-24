import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IBackendAddressActions, IBackendAddressState } from './types'

const NullHost = 'localhost'
const NullPort = 8001

type IBackendAddressStore = IBackendAddressState & IBackendAddressActions

const createBackendAddressStore = () =>
  createStore<IBackendAddressStore>()((set) => ({
    host: NullHost,
    setHost: (host: string) => set(() => ({ host })),
    port: NullPort,
    setPort: (port: number) => set(() => ({ port })),
  }))

type BackendAddressStore = ReturnType<typeof createBackendAddressStore>
const BackendAddressContext = createContext<BackendAddressStore | null>(null)

export const useBackendAddressStore = () => {
  const api = useContext(BackendAddressContext)

  const store = {
    host: useStore(api, (state: IBackendAddressStore) => state.host),
    port: useStore(api, (state: IBackendAddressStore) => state.port),
    setHost: useStore(api, (state: IBackendAddressActions) => state.setHost),
    setPort: useStore(api, (state: IBackendAddressActions) => state.setPort),
  }
  return store
}

export const BackendAddressProvider: FC<PropsWithChildren> = ({ children }) => {
  const backendAddressStoreRef = useRef<BackendAddressStore>()
  if (!backendAddressStoreRef.current) {
    backendAddressStoreRef.current = createBackendAddressStore()
  }
  return (
    <BackendAddressContext.Provider value={backendAddressStoreRef.current}>
      {children}
    </BackendAddressContext.Provider>
  )
}

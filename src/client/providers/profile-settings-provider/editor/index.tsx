import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserProfileEditorState, IUserProfileEditorActions } from './types'

type IUserProfileEditorStore = IUserProfileEditorState &
  IUserProfileEditorActions

const createEditorStore = () =>
  createStore<IUserProfileEditorStore>()((set) => ({
    path: [],
    setPath: (newPath: string[]) => set(() => ({ path: [...newPath] })),
  }))

type EditorStore = ReturnType<typeof createEditorStore>
const UserProfileEditorContext = createContext<EditorStore | null>(null)

export const useUserProfileEditorStore = () => {
  const api = useContext(UserProfileEditorContext)
  return {
    path: useStore(api, (state: IUserProfileEditorStore) => state.path),
    setPath: useStore(api, (state: IUserProfileEditorState) => state.setPath),
  }
}

export const ProfileSettingsEditorProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const userProfileStoreRef = useRef<EditorStore>()
  if (!userProfileStoreRef.current) {
    userProfileStoreRef.current = createEditorStore()
  }
  return (
    <UserProfileEditorContext.Provider value={userProfileStoreRef.current}>
      {children}
    </UserProfileEditorContext.Provider>
  )
}

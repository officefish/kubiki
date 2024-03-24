import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IUserProfileState, IUserProfileActions } from './types'
import {
  IFullName,
  ILocation,
  ICareer,
  IEducation,
  IQuote,
  IDomain,
  IAvatar,
  ICover,
  ITartan,
  ITartanPatternColors,
} from '@client/models/profile.types'

import avatar from '@public/team-2-800x800.jpg'
//import { UserProfile } from '@/client/models/user.model'
const background = '@public/cover-149.jpeg'

const NullFullName: IFullName = {
  firstName: '',
  lastName: '',
}

const NullLocation: ILocation = {
  country: '',
  region: '',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

const NullCareer: ICareer = {
  company: '',
  role: '',
}

const NullEducation: IEducation = {
  university: '',
  faculty: '',
}

const NullQuote: IQuote = {
  content: '',
}

const NullDomain: IDomain = {
  value: '',
}

const NullAvatar: IAvatar = {
  id: '1',
  imageUrl: avatar.src,
  croppedImageUrl: null,
}

const NullCover: ICover = {
  id: '1',
  imageUrl: background,
}

//const tartanPngSrc = ''

const pattern = [
  { color: '#d7e1e8', size: 23 },
  { color: '#bd8c16', size: 14 },
  { color: '#d7e1e8', size: 9 },
  { color: '#0c2449', size: 32 },
  { color: '#d7e1e8', size: 39 },
  { color: '#bd8c16', size: 15 },
  { color: '#d7e1e8', size: 2 },
] satisfies ITartanPatternColors

const NullTartan: ITartan = {
  id: '',
  hashed: null,
  uri: null,
  url: null,
  colors: [...pattern],
}

type IUserProfileStore = IUserProfileState & IUserProfileActions

const createProfileSettingsStore = () =>
  createStore<IUserProfileStore>()((set) => ({
    fullName: { ...NullFullName },
    setFullName: (newFullName: IFullName) =>
      set(() => ({ fullName: { ...newFullName } })),
    isValidFullName: true,
    invalidFullName: () => set(() => ({ isValidFullName: false })),
    location: { ...NullLocation },
    setLocation: (newLocation: ILocation) =>
      set(() => ({ location: { ...newLocation } })),
    isValidLocation: true,
    invalidLocation: () => set(() => ({ isValidLocation: false })),
    career: { ...NullCareer },
    setCareer: (newCareer: ICareer) =>
      set(() => ({ career: { ...newCareer } })),
    isValidCareer: true,
    invalidCareer: () => set(() => ({ isValidCareer: false })),
    education: { ...NullEducation },
    setEducation: (newEducation: IEducation) =>
      set(() => ({ education: { ...newEducation } })),
    isValidEducation: true,
    invalidEducation: () => set(() => ({ isValidEducation: false })),
    quote: { ...NullQuote },
    setQuote: (newQuote: IQuote) => set(() => ({ quote: { ...newQuote } })),
    isValidQuote: true,
    invalidQuote: () => set(() => ({ isValidQuote: false })),
    domain: { ...NullDomain },
    setDomain: (newDomain: IDomain) =>
      set(() => ({ domain: { ...newDomain } })),
    isValidDomain: true,
    invalidDomain: () => set(() => ({ isValidDomain: false })),
    avatar: { ...NullAvatar },
    setAvatar: (newAvatar: IAvatar) =>
      set(() => ({ avatar: { ...newAvatar } })),
    isValidAvatar: true,
    invalidAvatar: () => set(() => ({ isValidAvatar: false })),
    cover: { ...NullCover },
    setCover: (newCover: ICover) => set(() => ({ cover: { ...newCover } })),
    isValidCover: true,
    invalidCover: () => set(() => ({ isValidCover: false })),
    tartan: { ...NullTartan },
    setTartan: (newTartan: ITartan) =>
      set(() => ({ tartan: { ...newTartan } })),
    isValidTartan: true,
    invalidTartan: () => set(() => ({ isValidTartan: false })),
  }))

type UserProfileStore = ReturnType<typeof createProfileSettingsStore>
const UserProfileContext = createContext<UserProfileStore | null>(null)

export const useUserProfileStore = () => {
  const api = useContext(UserProfileContext)
  return {
    /* fullName */
    fullName: useStore(api, (state: IUserProfileStore) => state.fullName),
    setFullName: useStore(api, (state: IUserProfileStore) => state.setFullName),
    isValidFullName: useStore(
      api,
      (state: IUserProfileStore) => state.isValidFullName,
    ),
    invalidFullName: useStore(
      api,
      (state: IUserProfileStore) => state.invalidFullName,
    ),
    /* location */
    location: useStore(api, (state: IUserProfileStore) => state.location),
    setLocation: useStore(api, (state: IUserProfileStore) => state.setLocation),
    isValidLocation: useStore(
      api,
      (state: IUserProfileStore) => state.isValidLocation,
    ),
    invalidLocation: useStore(
      api,
      (state: IUserProfileStore) => state.invalidLocation,
    ),
    /* career */
    career: useStore(api, (state: IUserProfileStore) => state.career),
    setCareer: useStore(api, (state: IUserProfileStore) => state.setCareer),
    isValidCareer: useStore(
      api,
      (state: IUserProfileStore) => state.isValidCareer,
    ),
    invalidCareer: useStore(
      api,
      (state: IUserProfileStore) => state.invalidCareer,
    ),
    /* education */
    education: useStore(api, (state: IUserProfileStore) => state.education),
    setEducation: useStore(
      api,
      (state: IUserProfileStore) => state.setEducation,
    ),
    isValidEducation: useStore(
      api,
      (state: IUserProfileStore) => state.isValidEducation,
    ),
    invalidEducation: useStore(
      api,
      (state: IUserProfileStore) => state.invalidEducation,
    ),
    /* quote */
    quote: useStore(api, (state: IUserProfileStore) => state.quote),
    setQuote: useStore(api, (state: IUserProfileStore) => state.setQuote),
    isValidQuote: useStore(
      api,
      (state: IUserProfileStore) => state.isValidQuote,
    ),
    invalidQuote: useStore(
      api,
      (state: IUserProfileStore) => state.invalidQuote,
    ),
    /* domain */
    domain: useStore(api, (state: IUserProfileStore) => state.domain),
    setDomain: useStore(api, (state: IUserProfileStore) => state.setDomain),
    isValidDomain: useStore(
      api,
      (state: IUserProfileStore) => state.isValidDomain,
    ),
    invalidDomain: useStore(
      api,
      (state: IUserProfileStore) => state.invalidDomain,
    ),
    /* avatar */
    avatar: useStore(api, (state: IUserProfileStore) => state.avatar),
    setAvatar: useStore(api, (state: IUserProfileStore) => state.setAvatar),
    isValidAvatar: useStore(
      api,
      (state: IUserProfileStore) => state.isValidAvatar,
    ),
    invalidAvatar: useStore(
      api,
      (state: IUserProfileStore) => state.invalidAvatar,
    ),
    /* cover */
    cover: useStore(api, (state: IUserProfileStore) => state.cover),
    setCover: useStore(api, (state: IUserProfileStore) => state.setCover),
    isValidCover: useStore(
      api,
      (state: IUserProfileStore) => state.isValidCover,
    ),
    invalidCover: useStore(
      api,
      (state: IUserProfileStore) => state.invalidCover,
    ),
    /* tartan */
    tartan: useStore(api, (state: IUserProfileStore) => state.tartan),
    setTartan: useStore(api, (state: IUserProfileStore) => state.setTartan),
    isValidTartan: useStore(
      api,
      (state: IUserProfileStore) => state.isValidTartan,
    ),
    invalidTartan: useStore(
      api,
      (state: IUserProfileStore) => state.invalidTartan,
    ),
  }
}

export const ProfileSettingsProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const userProfileStoreRef = useRef<UserProfileStore>()
  if (!userProfileStoreRef.current) {
    userProfileStoreRef.current = createProfileSettingsStore()
  }
  return (
    <UserProfileContext.Provider value={userProfileStoreRef.current}>
      {children}
    </UserProfileContext.Provider>
  )
}

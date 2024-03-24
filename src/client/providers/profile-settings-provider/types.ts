import {
  ICareer,
  IEducation,
  IFullName,
  ILocation,
  IQuote,
  IDomain,
  IAvatar,
  ICover,
  ITartan,
} from '@client/models/profile.types'

export interface IUserProfileState {
  fullName?: IFullName
  isValidFullName: boolean
  location?: ILocation
  isValidLocation: boolean
  career?: ICareer
  isValidCareer: boolean
  education?: IEducation
  isValidEducation: boolean
  quote?: IQuote
  isValidQuote: boolean
  domain?: IDomain
  isValidDomain: boolean
  avatar?: IAvatar
  isValidAvatar: boolean
  cover?: ICover
  isValidCover: boolean
  tartan?: ITartan
  isValidTartan: boolean
}

export interface IUserProfileActions {
  setFullName: (newFullName: IFullName) => void
  invalidFullName: () => void
  setLocation: (newLocation: ILocation) => void
  invalidLocation: () => void
  setCareer: (newCareer: ICareer) => void
  invalidCareer: () => void
  setEducation: (newEducation: IEducation) => void
  invalidEducation: () => void
  setQuote: (newQuote: IQuote) => void
  invalidQuote: () => void
  setDomain: (newDomain: IDomain) => void
  invalidDomain: () => void
  setAvatar: (newAvatar: IAvatar) => void
  invalidAvatar: () => void
  setCover: (newCover: ICover) => void
  invalidCover: () => void
  setTartan: (newTartan: ITartan) => void
  invalidTartan: () => void
}

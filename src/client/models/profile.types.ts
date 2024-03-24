export interface IHeaderStatsData {
  posts?: number
  comments?: number
  followers?: number
}

export interface IFullName {
  firstName?: string
  lastName?: string
}

export interface ILocation {
  country?: string
  region?: string
  timeZone?: string
}

export interface ICareer {
  company?: string
  role?: string
}

export interface IEducation {
  university?: string
  faculty?: string
}

export interface IBasicInfo {
  fullName: IFullName
  location: ILocation
  career: ICareer
  education: IEducation
}

export interface IQuote {
  content?: string
}

export interface IDomain {
  value?: string
}

export interface IAvatar {
  id?: string
  imageUrl: string
  croppedImageUrl?: string | null
}

export interface ICover {
  id: string
  imageUrl: string
}

export interface IColorItem {
  color?: string
  size: number
}

export interface ITartanPatternColors extends Array<IColorItem> {}

export interface ITartan {
  id?: string
  pattern?: string
  hashed?: string
  colors?: ITartanPatternColors
  uri?: string
  url?: string
}

export interface IChallenge {
  title: string
  id: string
  artworks: IArtwork[]
  scores: IScore[]
  isJudge: boolean
  date: string
  total: number
}

export interface ILike {
  id: string
}

export enum ESex {
  MALE,
  FEMALE,
}
export interface IAuthor {
  firstName?: string
  lastName?: string
  age?: number
  sex?: ESex
  id: string
}

export enum AgeGroup {
  KIDS, // 4-5 years
  PRESCHOOL, // 6-7 years
  YOUNGEST, // 8-10 years
  AVERAGE, // 11-14 years
  OLDER, // 15-17 years old
}

export const AgeGroupArray = Object.keys(AgeGroup) as Array<
  keyof typeof AgeGroup
> //.map((key) => {})

export interface IArtwork {
  id: string
  url: string
  original: string
  total: number
  likes: ILike[]
  author?: IAuthor
  title?: string
  description?: string
  ageGroup: AgeGroup
}

export interface IScore {
  id: string
  artworkId: string
  challengeId: string
  judgeId: string
  total: number
  categoryScores: ICategoryScore[]
}

export interface ICategoryScore {
  id: string
  scoreId: string
  title: string
  value: number
}

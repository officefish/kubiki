import { UserSerie } from 'react-charts'

export enum CoreStock {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export interface IMetadata {
  symbol: string
  api_function: string
}

export interface ISlot {
  date: Date
  open: number
  close: number
  low: number
  high: number
  volume: number
}

export type ISerie = UserSerie<ISlot>

export interface ISlide {
  slots: ISlot[]
}

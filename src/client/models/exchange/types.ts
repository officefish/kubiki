export interface ISlot {
  date: Date
  open: number
  close: number
  high: number
  low: number
  volume: number
}

export class Slot implements ISlot {
  date: Date
  open: number
  close: number
  high: number
  low: number
  volume: number
}

export interface ISeries {
  label: string
  data: ISlot[]
}

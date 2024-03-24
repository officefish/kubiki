import { FC, PropsWithChildren, useRef, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { createContext } from 'react' // from 'zustand/context'
import { IWidgetState, IWidgetActions } from './types'
import { IMetadata, ISerie } from '@/client/models/exchange/alpha-vintage.types'

type IWidgetStore = IWidgetState & IWidgetActions

const createWidgetStore = () =>
  createStore<IWidgetStore>()((set) => ({
    metadata: { symbol: '', api_function: 'daily' },
    setMetadata: (newMetadata: IMetadata) =>
      set(() => ({ metadata: { ...newMetadata } })),
    series: [],
    intervalSeries: [],
    setSeries: (series: ISerie[]) => set(() => ({ series: [...series] })),
    setIntervalSeries: (intervalSeries: ISerie[]) =>
      set(() => ({ intervalSeries: [...intervalSeries] })),
    startDate: new Date('August 19, 1911 23:15:30'),
    endDate: new Date(),
    setInterval: (startDate: Date, endDate: Date) =>
      set(() => ({ startDate, endDate })),
  }))

type WidgetStore = ReturnType<typeof createWidgetStore>
const WidgetContext = createContext<WidgetStore | null>(null)

export const useWidgetStore = () => {
  const api = useContext(WidgetContext)
  return {
    metadata: useStore(api, (state) => state.metadata),
    setMetadata: useStore(api, (state) => state.setMetadata),
    series: useStore(api, (state) => state.series),
    setSeries: useStore(api, (state) => state.setSeries),
    intervalSeries: useStore(api, (state) => state.intervalSeries),
    setIntervalSeries: useStore(api, (state) => state.setIntervalSeries),
    startDate: useStore(api, (state) => state.startDate),
    endDate: useStore(api, (state) => state.endDate),
    setInterval: useStore(api, (state) => state.setInterval),
  }
}

export const WidgetProvider: FC<PropsWithChildren> = ({ children }) => {
  const widgetStoreRef = useRef<WidgetStore>()
  if (!widgetStoreRef.current) {
    widgetStoreRef.current = createWidgetStore()
  }
  return (
    <WidgetContext.Provider value={widgetStoreRef.current}>
      {children}
    </WidgetContext.Provider>
  )
}

import { DesignSystemProviderProps } from '@client/providers/design-system-provider/types'
import { ThemeProviderProps } from '@client/providers/theme-provider/types'
import type { NextPage } from 'next'

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
  theme?: ThemeProviderProps
  designSystem?: DesignSystemProviderProps
}

import colors from './colors'
import themes from './themes'
import { injectThemes } from './services'

export const useThemes = ({ addBase, config }: any): any => {
  const themeInjector = injectThemes(addBase, config, themes)
  themeInjector
}

export const themeColors = { ...colors }

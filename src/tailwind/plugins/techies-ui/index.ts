import plugin from 'tailwindcss/plugin'
import { injectComponents } from './components'
import tailwindColors from 'tailwindcss/colors'

import { injectModifiers } from './modifiers'
import { injectUtilities } from './utilities'
import { styledColors } from './modifiers'

import { themeColors } from './colors'
import { useThemes } from './colors'

const components = ({
  addBase,
  addComponents,
  addUtilities,
  variants,
  config,
}: any): any => {
  useThemes({ addBase, config })
  injectComponents({ addComponents, variants })
  injectModifiers({ addUtilities, variants })
  injectUtilities({ addUtilities, variants })
}

export default plugin(components, {
  theme: {
    extend: {
      colors: {
        ...themeColors,
        ...styledColors,
        'neutral-50': tailwindColors.neutral[50],
        'neutral-100': tailwindColors.neutral[100],
        'neutral-200': tailwindColors.neutral[200],
        'neutral-300': tailwindColors.neutral[300],
        'neutral-400': tailwindColors.neutral[400],
        'neutral-500': tailwindColors.neutral[500],
        'neutral-600': tailwindColors.neutral[600],
        'neutral-700': tailwindColors.neutral[700],
        'neutral-800': tailwindColors.neutral[800],
        'neutral-900': tailwindColors.neutral[900],
      },
    },
  },
})

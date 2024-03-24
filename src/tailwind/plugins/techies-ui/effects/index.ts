import plugin from 'tailwindcss/plugin'
import { neumorphic } from './neumorphic'

const effects = ({ addUtilities }: any): any => {
  const utilities = {
    ...neumorphic,
  }
  addUtilities(utilities)
}

export default plugin(effects)

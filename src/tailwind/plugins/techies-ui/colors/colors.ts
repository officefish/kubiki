function withOpacityValue(variable: string, fallbackColor?: string) {
  let fallbackColorValue = ''
  if (fallbackColor) {
    fallbackColorValue = `, var(${fallbackColor})`
  }
  return `hsl(var(${variable}${fallbackColorValue}) / <alpha-value>)`
}

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  /* primary light */
  primary: withOpacityValue('--p'),
  'primary-focus': withOpacityValue('--pf', '--p'),
  'primary-content': withOpacityValue('--pc'),
  /* primary dark */
  'primary-dark': withOpacityValue('--p-d'),
  'primary-focus-dark': withOpacityValue('--pf-d', '--p-d'),
  'primary-content-dark': withOpacityValue('--pc-d'),
  /* secondary light */
  secondary: withOpacityValue('--s'),
  'secondary-focus': withOpacityValue('--sf', '--s'),
  'secondary-content': withOpacityValue('--sc'),
  /* secondary dark */
  'secondary-dark': withOpacityValue('--s-d'),
  'secondary-focus-dark': withOpacityValue('--sf-d', '--s-d'),
  'secondary-content-dark': withOpacityValue('--sc-d'),
  /* accent light */
  accent: withOpacityValue('--a'),
  'accent-focus': withOpacityValue('--af', '--a'),
  'accent-content': withOpacityValue('--ac'),
  /* accent dark */
  'accent-dark': withOpacityValue('--a-d'),
  'accent-focus-dark': withOpacityValue('--af-d', '--a-d'),
  'accent-content-dark': withOpacityValue('--ac-d'),
  /* neutral light */
  neutral: withOpacityValue('--n'),
  'neutral-focus': withOpacityValue('--nf', '--n'),
  'neutral-content': withOpacityValue('--nc'),
  /* neutral dark */
  'neutral-dark': withOpacityValue('--n-d'),
  'neutral-focus-dark': withOpacityValue('--nf-d', '--n-d'),
  'neutral-content-dark': withOpacityValue('--nc-d'),
  /* base light */
  'base-100': withOpacityValue('--b1'),
  'base-200': withOpacityValue('--b2', '--b1'),
  'base-300': withOpacityValue('--b3', '--b2'),
  'base-content': withOpacityValue('--bc'),
  /* base dark */
  'base-100-dark': withOpacityValue('--b1-d'),
  'base-200-dark': withOpacityValue('--b2-d', '--b1-d'),
  'base-300-dark': withOpacityValue('--b3-d', '--b2-d'),
  'base-content-dark': withOpacityValue('--bc-d'),
  /* info light */
  info: withOpacityValue('--in'),
  'info-content': withOpacityValue('--inc', '--nc'),
  /* info dark */
  'info-dark': withOpacityValue('--in-d'),
  'info-content-dark': withOpacityValue('--inc-d', '--nc-d'),
  /* success light */
  success: withOpacityValue('--su'),
  'success-content': withOpacityValue('--suc', '--nc'),
  /* success dark */
  'success-dark': withOpacityValue('--su-d'),
  'success-content-dark': withOpacityValue('--suc-d', '--nc-d'),
  /* warning light */
  warning: withOpacityValue('--wa'),
  'warning-content': withOpacityValue('--wac', '--nc'),
  /* warning dark */
  'warning-dark': withOpacityValue('--wa-d'),
  'warning-content-dark': withOpacityValue('--wac-d', '--nc-d'),
  /* error light */
  error: withOpacityValue('--er'),
  'error-content': withOpacityValue('--erc', '--nc'),
  /* error dark */
  'error-dark': withOpacityValue('--er-d'),
  'error-content-dark': withOpacityValue('--erc-d', '--nc-d'),
}

export default colors

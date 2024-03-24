const names = {
  primary: '--p',
  'primary-focus': '--pf',
  'primary-content': '--pc',

  'primary-dark': '--p-d',
  'primary-focus-dark': '--pf-d',
  'primary-content-dark': '--pc-d',

  secondary: '--s',
  'secondary-focus': '--sf',
  'secondary-content': '--sc',

  'secondary-dark': '--s-d',
  'secondary-focus-dark': '--sf-d',
  'secondary-content-dark': '--sc-d',

  accent: '--a',
  'accent-focus': '--af',
  'accent-content': '--ac',

  'accent-dark': '--a-d',
  'accent-focus-dark': '--af-d',
  'accent-content-dark': '--ac-d',

  neutral: '--n',
  'neutral-focus': '--nf',
  'neutral-content': '--nc',

  'neutral-dark': '--n-d',
  'neutral-focus-dark': '--nf-d',
  'neutral-content-dark': '--nc-d',

  'base-100': '--b1',
  'base-200': '--b2',
  'base-300': '--b3',
  'base-content': '--bc',

  'base-100-dark': '--b1-d',
  'base-200-dark': '--b2-d',
  'base-300-dark': '--b3-d',
  'base-content-dark': '--bc-d',

  info: '--in',
  'info-content': '--inc',

  'info-dark': '--in-d',
  'info-content-dark': '--inc-d',

  success: '--su',
  'success-content': '--suc',

  'success-dark': '--su-d',
  'success-content-dark': '--suc-d',

  warning: '--wa',
  'warning-content': '--wac',

  'warning-dark': '--wa-d',
  'warning-content-dark': '--wac-d',

  error: '--er',
  'error-content': '--erc',

  'error-dark': '--er-d',
  'error-content-dark': '--erc-d',
}
export default names
export type NamesKeyType = keyof typeof names

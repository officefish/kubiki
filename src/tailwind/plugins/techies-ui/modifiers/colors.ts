function withValue(variable: string) {
  return `var(${variable})`
}

export const tabColors = {
  'tab-color': withValue('--tab-color'),
  'tab-bg': withValue('--tab-bg'),
  'tab-border-color': withValue('--tab-border-color'),
  /* primary dark */
  'tab-color-dark': withValue('--tab-color-dark'),
  'tab-bg-dark': withValue('--tab-bg-dark'),
  'tab-border-color-dark': withValue('--tab-border-color-dark'),
}

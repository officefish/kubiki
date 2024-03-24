export const avatar = {
  '.avatar-group': {
    '@apply flex overflow-hidden': {},

    ':where(.avatar)': {
      '@apply overflow-hidden rounded-full border-4': {},
      '@apply border-base-100 dark:border-base-100-dark': {},
    },
  },
}

export const divider = {
  '.divider': {
    '@apply my-4 h-4 whitespace-nowrap': {},
    '@apply text-base-content': {},
    ':is(.dark) &': {
      '@apply text-base-content-dark': {},
    },
    '&:before': {
      '@apply bg-base-content/10': {},
      ':is(.dark) &': {
        '@apply bg-base-content-dark/10': {},
      },
    },
    '&:after': {
      '@apply bg-base-content/10': {},
      ':is(.dark) &': {
        '@apply bg-base-content-dark/10': {},
      },
    },
    '&:not(:empty)': {
      '@apply gap-4': {},
    },
  },
}

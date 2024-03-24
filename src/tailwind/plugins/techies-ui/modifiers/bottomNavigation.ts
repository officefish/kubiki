export const bottomNavigation = {
  '.btm-nav': {
    '@apply h-16 bg-base-100 text-current': {},

    ':is(.dark) &': {
      '@apply  bg-base-100-dark': {},
    },

    '& > *': {
      '@apply border-current': {},

      '&:not(.active)': {
        '@apply pt-0.5': {},
      },

      /* active */
      '&:where(.active)': {
        '@apply bg-base-100 border-t-2': {},
        ':is(.dark) &': {
          '@apply bg-base-100-dark': {},
        },
      },

      /* disabled */
      '&.disabled, &[disabled]': {
        '@apply border-opacity-0 bg-neutral/10 text-base-content/20 pointer-events-none':
          {},
        ':is(.dark) &': {
          '@apply bg-neutral-dark/10 text-base-content-dark/20': {},
        },
      },

      '@media (hover: hover)': {
        '&.disabled:hover, &[disabled]:hover': {
          '@apply border-opacity-0 bg-neutral/10 text-base-content/20 pointer-events-none':
            {},
          ':is(.dark) &': {
            '@apply bg-neutral-dark/10 text-base-content-dark/20': {},
          },
        },
      },

      '.label': {
        '@apply text-base': {},
      },
    },
  },
}

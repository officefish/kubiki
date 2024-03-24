export const card = {
  '.card': {
    '@apply text-base-content dark:text-base-content-dark': {},
    '@apply rounded-box': {},
    ':where(figure:first-child)': {
      '@apply overflow-hidden': {},
      'border-start-start-radius': 'inherit',
      'border-start-end-radius': 'inherit',
      'border-end-start-radius': 'unset',
      'border-end-end-radius': 'unset',
    },

    ':where(figure:last-child)': {
      '@apply overflow-hidden': {},
      'border-start-start-radius': 'unset',
      'border-start-end-radius': 'unset',
      'border-end-start-radius': 'inherit',
      'border-end-end-radius': 'inherit',
    },

    '&:focus-visible': {
      outline: '2px solid currentColor',
      'outline-offset': '2px',
    },

    '&.bordered': {
      '@apply border border-base-200 dark:border-base-200-dark': {},
    },

    '&-bordered': {
      '@apply border border-base-200 dark:border-base-200-dark': {},
    },

    '&.compact': {
      '.card-body': {
        '@apply p-4 text-sm': {},
      },
    },

    '&-body': {
      padding: 'var(--padding-card, 2rem)',
      '@apply flex flex-col gap-2': {},
    },

    '&-title': {
      '@apply flex items-center gap-2 text-xl font-semibold': {},
    },

    '&.image-full > &-body': {
      '@apply z-20 text-neutral-content dark:text-neutral-content-dark': {},
    },

    '&.image-full': {
      '&:before': {
        '@apply z-10 rounded-box': {},
        '@apply bg-neutral/75 dark:bg-neutral-dark/75': {},
      },

      ':where(figure)': {
        '@apply overflow-hidden': {},
        'border-radius': 'inherit',
      },
    },
  },
}

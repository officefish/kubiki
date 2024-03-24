const setupBadge = (tag: string) => {
  return {
    [`@apply border-${tag} dark:border-${tag}-dark`]: {},
    [`@apply bg-${tag} dark:bg-${tag}-dark`]: {},
    [`@apply text-${tag}-content dark:text-${tag}-content-dark`]: {},
  }
}

const setupOutlineBadge = (tag: string) => {
  return {
    [`@apply bg-transparent`]: {},
    [`@apply border-${tag} dark:border-${tag}-dark`]: {},
    [`@apply text-${tag} dark:text-${tag}-dark`]: {},
  }
}

export const badge = {
  '.badge': {
    '@apply border rounded-badge': {},
    ...setupBadge('neutral'),

    '&-primary': {
      ...setupBadge('primary'),
    },

    '&-secondary': {
      ...setupBadge('secondary'),
    },

    '&-accent': {
      ...setupBadge('accent'),
    },

    '&-info': {
      ...setupBadge('info'),
    },

    '&-success': {
      ...setupBadge('success'),
    },

    '&-warning': {
      ...setupBadge('warning'),
    },

    '&-error': {
      ...setupBadge('error'),
    },

    '&-ghost': {
      '@apply border-base-200 dark:border-base-200-dark': {},
      '@apply bg-base-200 dark:bg-base-200-dark': {},
      '@apply text-base-content dark:text-base-content-dark': {},
    },

    '&-outline': {
      '@apply border-current border-opacity-50 bg-transparent text-current': {},

      ':is(.dark) &': {
        '@apply border-current border-opacity-50 bg-transparent text-current':
          {},
      },

      '&.badge-primary': {
        '@apply text-primary dark:text-primary-dark': {},
      },

      '&.badge-secondary': {
        '@apply text-secondary dark:text-secondary-dark': {},
      },

      '&.badge-accent': {
        '@apply text-accent dark:text-accent-dark': {},
      },

      '&.badge-neutral': {
        ':is(.dark) &': {
          '@apply text-neutral-content-dark': {},
        },
      },

      '&.badge-info': {
        '@apply text-info dark:text-info-dark': {},
      },

      '&.badge-success': {
        '@apply text-success dark:text-success-dark': {},
      },

      '&.badge-warning': {
        '@apply text-warning dark:text-warning-dark': {},
      },

      '&.badge-error': {
        '@apply text-error dark:text-error-dark': {},
      },
    },
  },

  '.btn-outline': {
    '.badge': {
      '@apply border-neutral-focus dark:border-neutral-focus-dark': {},
      '@apply text-neutral-content dark:text-neutral-content-dark': {},
    },

    '&.btn-primary .badge': {
      ...setupBadge('primary'),
    },

    '&.btn-secondary .badge': {
      ...setupBadge('secondary'),
    },

    '&.btn-accent .badge': {
      ...setupBadge('accent'),
    },

    '.badge.outline': {
      '@apply bg-transparent': {},
      '@apply border-neutral-focus dark:border-neutral-focus-dark': {},
    },

    '&.btn-primary .badge-outline': {
      ...setupOutlineBadge('primary'),
    },

    '&.btn-secondary .badge-outline': {
      ...setupOutlineBadge('secondary'),
    },

    '&.btn-accent .badge-outline': {
      ...setupOutlineBadge('accent'),
    },

    '&.btn-info .badge-outline': {
      ...setupOutlineBadge('info'),
    },

    '&.btn-success .badge-outline': {
      ...setupOutlineBadge('success'),
    },

    '&.btn-warning .badge-outline': {
      ...setupOutlineBadge('warning'),
    },

    '&.btn-error .badge-outline': {
      ...setupOutlineBadge('error'),
    },

    '&:hover .badge': {
      '@apply border-base-200 dark:border-base-200-dark': {},
      '@apply bg-base-200 dark:bg-base-200-dark': {},
      '@apply text-base-content dark:bg-base-200-dark': {},
      '&.outline': {
        '@apply border-base-200 dark:border-base-content-dark': {},
        '@apply text-neutral-content dark:text-neutral-content-dark': {},
      },
    },

    '&.btn-primary:hover .badge': {
      '@apply border-primary-content dark:border-primary-content-dark': {},
      '@apply bg-primary-content dark:bg-primary-content-dark': {},
      '@apply text-primary dark:text-primary-dark': {},
      '&.outline': {
        '@apply border-primary-content dark:border-primary-content-dark': {},
        '@apply bg-primary-focus dark:bg-primary-focus-dark': {},
        '@apply text-primary-content dark:text-primary-content-dark': {},
      },
    },

    '&.btn-secondary:hover .badge': {
      '@apply border-secondary-content dark:border-secondary-content-dark': {},
      '@apply bg-secondary-content dark:bg-secondary-content-dark': {},
      '@apply text-secondary dark:text-secondary-dark': {},
      '&.outline': {
        '@apply border-secondary-content dark:border-secondary-content-dark':
          {},
        '@apply bg-secondary-focus dark:bg-secondary-focus-dark': {},
        '@apply text-secondary-content dark:text-secondary-content-dark': {},
      },
    },

    '&.btn-accent:hover .badge': {
      '@apply border-accent-content dark:border-accent-content-dark': {},
      '@apply bg-accent-content dark:bg-accent-content-dark': {},
      '@apply text-accent dark:text-accent-dark': {},
      '&.outline': {
        '@apply border-accent-content dark:border-accent-content-dark': {},
        '@apply bg-accent-focus dark:bg-accent-focus-dark': {},
        '@apply text-accent-content dark:text-accent-content-dark': {},
      },
    },
  },
}

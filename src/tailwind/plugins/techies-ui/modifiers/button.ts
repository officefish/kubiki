const setup = (className: string, prefix: string, focus: boolean = true) => {
  return {
    [`&-${className}`]: {
      [`@apply border-${className} dark:border-${className}-dark`]: {},
      [`@apply bg-${className} dark:bg-${className}-dark`]: {},
      [`@apply text-${className}-content dark:text-${className}-content-dark`]:
        {},
      [`&:hover, &.btn-active`]: {
        [`@apply border-${className}${
          focus ? '-focus' : ''
        } dark:border-${className}${focus ? '-focus' : ''}-dark`]: {},
        [`@apply bg-${className}${focus ? '-focus' : ''} dark:bg-${className}${
          focus ? '-focus' : ''
        }-dark`]: {},
      },

      '&:focus-visible': {
        outline: `2px solid hsl(var(${prefix}))`,
      },
    },
  }
}

const setupOutline = (className: string, focus: boolean) => {
  return {
    [`&.btn-${className}`]: {
      [`@apply text-${className}`]: {},
      '&:hover, &.btn-active': {
        [`@apply border-${className}${
          focus ? '-focus' : ''
        } dark:border-${className}${focus ? '-focus' : ''}-dark`]: {},
        [`@apply bg-${className}${focus ? '-focus' : ''} dark:bg-${className}${
          focus ? '-focus' : ''
        }-dark`]: {},
        [`@apply text-${className}-content dark:text-${className}-content-dark`]:
          {},
      },
    },
  }
}

export const button = {
  '.btn': {
    'font-weight': 600,
    'text-decoration': 'none',

    'border-width': 'var(--border-btn, 1px)',
    animation: 'button-pop var(--animation-btn, 0.25s) ease-out',
    'text-transform': 'var(--btn-text-case, uppercase)',
    /* button border radius */
    '@apply rounded-btn': {},

    '&:active:hover, &:active:focus': {
      animation: 'none',
      transform: 'scale(var(--btn-focus-scale, 0.95))',
    },
    /* default btn */
    '&': {
      '@apply border-neutral dark:border-neutral-dark': {},
      '@apply bg-neutral dark:bg-neutral-dark': {},
      '@apply text-neutral-content dark:text-neutral-content-dark': {},

      '&:hover, &-active': {
        '@apply border-neutral-focus dark:border-neutral-focus-dark': {},
        '@apply bg-neutral-focus dark:bg-neutral-focus-dark': {},
      },
      '&:focus-visible': {
        outline: '2px solid hsl(var(--nf))',
        'outline-offset': '2px',
      },
    },

    /* btn with brand colors */
    ...setup('primary', '--p'),
    ...setup('secondary', '--s'),
    ...setup('accent', '--a'),

    /*  btn with state colors */
    ...setup('info', '--in', false),
    ...setup('success', '--su', false),
    ...setup('warning', '--wa', false),
    ...setup('error', '--er', false),

    /* glass */
    '&.glass': {
      '&:hover, &.btn-active': {
        '--glass-opacity': '25%',
        '--glass-border-opacity': '15%',
      },
      '&:focus-visible': {
        outline: '2px solid currentColor',
      },
    },

    '&-ghost': {
      '@apply border': {},
      '@apply border-transparent dark:border-transparent': {},
      '@apply bg-transparent dark:bg-transparent': {},
      '@apply text-current': {},
      '&:hover, &.btn-active': {
        '@apply border-opacity-0': {},
        '@apply bg-base-content/20 dark:bg-base-content-dark/20': {},
      },
      '&:focus-visible': {
        outline: '2px solid currentColor',
      },
    },

    '&-link': {
      '@apply underline': {},
      '@apply border-transparent dark:border-transparent': {},
      '@apply bg-transparent dark:bg-transparent': {},
      '@apply text-primary dark:text-primary-dark': {},
      '&:hover, &.btn-active': {
        '@apply underline': {},
        '@apply border-transparent dark:border-transparent': {},
        '@apply bg-transparent dark:bg-transparent': {},
      },
      '&:focus-visible': {
        outline: '2px solid currentColor',
      },
    },

    /* outline */
    '&-outline': {
      '@apply border-current dark:border-current': {},
      '@apply bg-transparent dark:bg-transparent': {},
      '@apply text-base-content dark:text-base-content-dark': {},
      '&:hover, &.btn-active': {
        '@apply border-base-content dark:border-base-content-dark': {},
        '@apply bg-base-content dark:bg-base-content-dark': {},
        '@apply text-base-100 dark:text-base-100-dark': {},
      },

      ...setupOutline('primary', true),
      ...setupOutline('secondary', true),
      ...setupOutline('accent', true),
      ...setupOutline('info', false),
      ...setupOutline('success', false),
      ...setupOutline('warning', false),
      ...setupOutline('error', false),
    },

    /* disabled */
    '&-disabled, &-disabled:hover, &[disabled], &[disabled]:hover': {
      '@apply border-opacity-0': {},
      '@apply bg-neutral/20 dark:bg-neutral-dark/20': {},
      '@apply text-base-content/20 dark:text-base-content-dark/20': {},
    },

    /* loading */
    '&.loading': {
      '&.btn-square:before, &.btn-circle:before': {
        'margin-right': 0,
      },
      '&.btn-xl:before, &.btn-lg:before': {
        width: '1.25rem',
        height: '1.25rem',
      },
      '&.btn-sm:before, &.btn-xs:before': {
        width: '0.75rem',
        height: '0.75rem',
      },
    },
  },
}

const setupTextarea = (colorTag: string, outlineVar: string) => {
  return {
    [`&-${colorTag}`]: {
      [`@apply border-${colorTag} dark:border-${colorTag}-dark`]: {},

      '&:focus': {
        outline: `2px solid hsl(var(${outlineVar}))`,
        ':is(.dark) &': {
          outline: `2px solid hsl(var(${outlineVar}-d))`,
        },
      },
    },
  }
}

export const textarea = {
  '.textarea': {
    '@apply border rounded-btn': {},
    '@apply border-base-content/0 dark:border-base-content-dark/0': {},
    '@apply bg-base-100 dark:bg-base-100-dark': {},

    '&-bordered': {
      '@apply border-base-content/20 dark:border-base-content-dark/20': {},
    },

    '&:focus': {
      outline: '2px solid hsla(var(--bc) / 0.2)',
      'outline-offset': '2px',
      ':is(.dark) &': {
        outline: '2px solid hsla(var(--bc-d) / 0.2)',
      },
    },

    '&-ghost': {
      '@apply bg-base-100/5 dark:bg-base-100-dark/5': {},
      '&:focus': {
        '@apply bg-base-100 dark:bg-base-100-dark': {},
        '@apply text-base-content dark:text-base-content-dark': {},
        'box-shadow': 'none',
      },
    },

    ...setupTextarea('primary', '--p'),
    ...setupTextarea('secondary', '--s'),
    ...setupTextarea('accent', '--a'),
    ...setupTextarea('info', '--in'),
    ...setupTextarea('success', '--su'),
    ...setupTextarea('warning', '--wa'),
    ...setupTextarea('error', '--er'),

    '&-disabled, &[disabled]': {
      '@apply cursor-not-allowed': {},
      '@apply border-base-200 dark:border-base-content-dark': {},
      '@apply bg-base-200 dark:bg-base-200-dark': {},
      '@apply text-base-content/20 dark:text-base-content-dark/20': {},
      '@apply placeholder-base-content/20 dark:placeholder-base-content-dark/20':
        {},
    },
  },
}

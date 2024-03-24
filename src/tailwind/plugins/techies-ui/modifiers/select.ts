const setupWithColors = (color: string, variable: string) => {
  return {
    [`&-${color}`]: {
      [`@apply border-${color} dark:border-${color}-dark`]: {},
      '&:focus': {
        outline: `2px solid hsl(var(${variable}))`,

        ':is(.dark) &': {
          outline: `2px solid hsl(var(${variable}-d))`,
        },
      },
    },
  }
}

export const select = {
  '.select': {
    '@apply border pr-10 font-semibold rounded-btn': {},
    '@apply border-base-content/0 dark:border-base-content-dark/0': {},
    '@apply bg-base-100 dark:bg-base-100-dark': {},
    '@apply text-base-content dark:text-base-content-dark': {},

    'background-image':
      'linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)',
    'background-position':
      'calc(100% - 20px) calc(1px + 50%), calc(100% - 16px) calc(1px + 50%)',
    'background-size': '4px 4px, 4px 4px',
    'background-repeat': 'no-repeat',

    '&:focus': {
      outline: '2px solid hsla(var(--bc) / 0.2)',
      'outline-offset': '2px',
      'border-color': 'inherit',
      '-webkit-box-shadow': 'none',
      'box-shadow': 'none',

      ':is(.dark) &': {
        outline: '2px solid hsla(var(--bc-d) / 0.2)',
      },
    },

    '&-bordered': {
      '@apply border-base-content/20 dark:border-base-content-dark/20': {},
    },

    '&-ghost': {
      '@apply bg-base-100/5 dark:bg-base-100-dark/5': {},
      '&:focus': {
        '@apply bg-base-100 dark:bg-base-100-dark': {},
        '@apply text-base-content dark:text-base-content-dark': {},
      },
    },

    ...setupWithColors('primary', '--p'),
    ...setupWithColors('secondary', '--s'),
    ...setupWithColors('accent', '--a'),
    ...setupWithColors('info', '--in'),
    ...setupWithColors('success', '--su'),
    ...setupWithColors('warning', '--wa'),
    ...setupWithColors('error', '--er'),

    '&-disabled, &[disabled]': {
      '@apply cursor-not-allowed': {},
      '@apply border-base-200 dark:border-base-200-dark': {},
      '@apply bg-base-200 dark:bg-base-200-dark': {},
      '@apply placeholder-base-content/20 dark:placeholder-base-content-dark/20':
        {},
      '@apply text-base-content/20 dark:text-base-content-dark/20': {},
    },

    [`&-multiple,
        &[multiple],
        &[size]&:not([size="1"])`]: {
      '@apply bg-none pr-4': {},
    },
  },

  '[dir="rtl"] .select': {
    'background-position':
      'calc(0% + 12px) calc(1px + 50%), calc(0% + 16px) calc(1px + 50%)',
  },
}

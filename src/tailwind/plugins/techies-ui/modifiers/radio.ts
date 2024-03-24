const setupRadio = (colorTag: string, outlineVar: string) => {
  return {
    [`&-${colorTag}`]: {
      '--chkbg': `var(${outlineVar})`,
      '--chkbg-dark': `var(${outlineVar}-d)`,
      [`@apply border-${colorTag} dark:border-${colorTag}-dark`]: {},
      [`@apply hover:border-${colorTag} dark:hover:border-${colorTag}-dark`]:
        {},

      '&:focus-visible': {
        outline: `2px solid hsl(var(${outlineVar}))`,
        'outline-offset': '2px',

        ':is(.dark) &': {
          outline: `2px solid hsl(var(${outlineVar}-d))`,
        },
      },

      '&:checked, &[aria-checked=true]': {
        '@apply appearance-none': {},
        'background-image': 'none',

        [`@apply border-${colorTag} dark:border-${colorTag}-dark`]: {},
        [`@apply bg-${colorTag} dark:bg-${colorTag}-dark`]: {},
        [`@apply text-${colorTag}-content dark:text-${colorTag}-content-dark`]:
          {},
      },
    },
  }
}

export const radio = {
  "input[type='radio'], [type='radio'], .radio": {
    '--chkbg': 'var(--bc)',
    '--chkbg-dark': 'var(--bc-dark)',
    '@apply h-6 w-6 cursor-pointer appearance-none rounded-full border': {},
    '@apply border-base-content/20 dark:border-base-content-dark/20': {},
    '@apply bg-base-100 dark:bg-base-100-dark': {},

    '@apply text-base-100 dark:text-base-100-dark': {},
    // 'background-color': 'transparent',
    'box-shadow': 'none',

    display: 'grid',
    'place-content': 'center',

    '&::before': {
      '@apply bg-transparent': {},
      content: '""',
      '@apply h-4 w-4': {},
      'border-radius': '50%',
      transform: 'scale(0)',
      transition: '120ms transform ease-in-out',
      //animation: 'radiomark var(--animation-input, 0.2s) ease-in-out',
      'box-shadow': 'inset 0 0 0 8px hsl(var(--bc))',

      ':is(.dark) &': {
        'box-shadow': 'inset 0 0 0 4px hsl(var(--bc-d))',
      },
    },

    '&:focus': {
      outline: 'none !important',
      'box-shadow': 'none',
      // 'outline-offset': 'max(2px, 0.15em)'
    },

    '&:checked &:hover:checked': {
      '@apply !border !border-base-content/50 dark:!border-base-content-dark/50':
        {},
      // 'background-color': 'transparent',
      'box-shadow': 'none',
    },

    '&:checked::before': {
      transform: 'scale(1)',
    },

    // [`&:checked, &[aria-checked=true]`]: {

    //     //'@apply appearance-none': {},
    //     'background-image': 'none',

    //     '@apply bg-base-content dark:bg-base-content-dark': {},

    //     //animation: 'radiomark var(--animation-input, 0.2s) ease-in-out',
    //     'box-shadow': '0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset',

    //     ':is(.dark) &': {
    //         'box-shadow': '0 0 0 4px hsl(var(--b1-d)) inset, 0 0 0 4px hsl(var(--b1-d)) inset',
    //     },

    //     // '&:focus': {

    //     // }
    // },

    ...setupRadio('primary', '--p'),
    ...setupRadio('secondary', '--s'),
    ...setupRadio('accent', '--a'),
    ...setupRadio('success', '--su'),
    ...setupRadio('warning', '--wa'),
    ...setupRadio('info', '--in'),
    ...setupRadio('error', '--er'),

    '&:disabled': {
      '@apply cursor-not-allowed opacity-20': {},
    },
  },

  '@keyframes radiomark': {
    '0%': {
      'box-shadow':
        '0 0 0 12px hsl(var(--b1)) inset, 0 0 0 12px hsl(var(--b1)) inset',

      ':is(.dark) &': {
        'box-shadow':
          '0 0 0 12px hsl(var(--b1-d)) inset, 0 0 0 12px hsl(var(--b1-d)) inset',
      },
    },

    '50%': {
      'box-shadow':
        '0 0 0 3px hsl(var(--b1)) inset, 0 0 0 3px hsl(var(--b1)) inset',

      ':is(.dark) &': {
        'box-shadow':
          '0 0 0 3px hsl(var(--b1-d)) inset, 0 0 0 3px hsl(var(--b1-d)) inset',
      },
    },

    '100%': {
      'box-shadow':
        '0 0 0 4px hsl(var(--b1)) inset, 0 0 0 4px hsl(var(--b1)) inset',

      ':is(.dark) &': {
        'box-shadow':
          '0 0 0 4px hsl(var(--b1-d)) inset, 0 0 0 4px hsl(var(--b1-d)) inset',
      },
    },
  },

  /* backward compatibility */
  '.radio-mark': {
    '@apply hidden': {},
  },
}

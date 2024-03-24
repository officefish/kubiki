const setupToggle = (colorTag: string, colorVariable: string) => {
  return {
    [`&-${colorTag}`]: {
      '&:focus-visible': {
        outline: [`2px solid hsl(var(${colorVariable}))`],

        ':is(.dark) &': {
          outline: [`2px solid hsl(var(${colorVariable}-d))`],
        },
      },

      '&:checked, &[checked="true"], &[aria-checked=true]': {
        [`@apply border-${colorTag}/10`]: {},
        [`@apply bg-${colorTag}`]: {},
        [`@apply text-${colorTag}-content`]: {},

        ':is(.dark) &': {
          [`@apply border-${colorTag}-dark/10`]: {},
          [`@apply bg-${colorTag}-dark`]: {},
          [`@apply text-${colorTag}-content-dark`]: {},
        },
      },
    },
  }
}

export const toggle = {
  '.toggle': {
    '--tglbg': 'hsl(var(--b1))',
    '--tglbg-dark': 'hsl(var(--b1-d))',
    '--handleoffset': '1.5rem',
    '--handleoffsetcalculator': 'calc(var(--handleoffset) * -1)',
    '--togglehandleborder': '0 0',

    '@apply h-6 w-12 cursor-pointer appearance-none border duration-300 ease-in-out rounded-badge':
      {},
    '@apply border-base-content/20 bg-base-content/50': {},

    transition:
      'background, box-shadow var(--animation-input, 0.2s) ease-in-out',
    'box-shadow':
      'var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset, var(--togglehandleborder)',

    ':is(.dark) &': {
      '@apply border-base-content-dark/20 bg-base-content-dark/50': {},
      'box-shadow':
        'var(--handleoffsetcalculator) 0 0 2px var(--tglbg-dark) inset, 0 0 0 2px var(--tglbg-dark) inset, var(--togglehandleborder)',
    },

    '[dir="rtl"] &': {
      '--handleoffsetcalculator': 'calc(var(--handleoffset) * 1)',
    },

    '&:focus-visible': {
      outline: '2px solid hsl(var(--bc))',
      'outline-offset': '2px',

      ':is(.dark) &': {
        outline: '2px solid hsl(var(--bc-d))',
      },
    },

    'background-image': 'none',

    '&:checked, &[checked="true"], &[aria-checked=true]': {
      '--handleoffsetcalculator': 'var(--handleoffset)',
      '@apply border-base-content bg-base-content': {},

      'background-image': 'none',

      ':is(.dark) &': {
        '@apply border-base-content-dark bg-base-content-dark': {},
      },

      '[dir="rtl"] &': {
        '--handleoffsetcalculator': 'calc(var(--handleoffset) * -1)',
      },
    },

    '&:indeterminate': {
      '@apply border-base-content bg-base-content': {},
      'box-shadow':
        'calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset',

      ':is(.dark) &': {
        '@apply border-base-content-dark bg-base-content-dark': {},
        'box-shadow':
          'calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg-dark) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg-dark) inset, 0 0 0 2px var(--tglbg-dark) inset',
      },

      '[dir="rtl"] &': {
        'box-shadow':
          'calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset, 0 0 0 2px var(--tglbg) inset',

        ':is(.dark) &': {
          'box-shadow':
            'calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg-dark) inset, calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg-dark) inset, 0 0 0 2px var(--tglbg-dark) inset',
        },
      },

      'background-image': 'none',
    },

    ...setupToggle('primary', '--p'),
    ...setupToggle('secondary', '--s'),
    ...setupToggle('accent', '--a'),
    ...setupToggle('info', '--in'),
    ...setupToggle('success', '--su'),
    ...setupToggle('warning', '--wa'),
    ...setupToggle('error', '--er'),

    '&:disabled': {
      '@apply cursor-not-allowed bg-transparent border-base-content opacity-30':
        {},
      '--togglehandleborder':
        '0 0 0 3px hsl(var(--bc)) inset, var(--handleoffsetcalculator) 0 0 3px hsl(var(--bc)) inset',

      ':is(.dark) &': {
        '@apply border-base-content-dark': {},
        '--togglehandleborder':
          '0 0 0 3px hsl(var(--bc-d)) inset, var(--handleoffsetcalculator) 0 0 3px hsl(var(--bc-d)) inset',
      },
    },
  },

  '.toggle-mark': {
    '@apply hidden': {},
  },
}

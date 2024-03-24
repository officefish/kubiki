const setupCornerBg = (dark: boolean) => {
  return `radial-gradient(circle at var(--circle-pos), 
    transparent var(--tab-grad), var(--tab-border-color${
      dark ? '-dark' : ''
    }) calc(var(--tab-grad) + 0.3px), 
    var(--tab-border-color${
      dark ? '-dark' : ''
    }) calc(var(--tab-grad) + var(--tab-border, 1px)), 
    var(--tab-bg${
      dark ? '-dark' : ''
    }) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.3px))`
}

export const tab = {
  '.tab': {
    '@apply text-opacity-50 hover:text-opacity-100': {},
    '--tab-color': 'hsla(var(--bc) / var(--tw-text-opacity, 1))',
    '--tab-bg': 'hsla(var(--b1) / var(--tw-bg-opacity, 1))',
    '--tab-border-color': 'hsla(var(--b3) / var(--tw-bg-opacity, 1))',

    '--tab-color-dark': 'hsla(var(--bc-d) / var(--tw-text-opacity, 1))',
    '--tab-bg-dark': 'hsla(var(--b1-d) / var(--tw-bg-opacity, 1))',
    '--tab-border-color-dark': 'hsla(var(--b3-d) / var(--tw-bg-opacity, 1))',

    //color: 'var(--tab-color)',
    '@apply text-tab-color dark:text-tab-color-dark': {},

    'padding-left': 'var(--tab-padding, 1rem)',
    'padding-right': 'var(--tab-padding, 1rem)',

    '&.tab-active:not(.tab-disabled):not([disabled])': {
      '@apply border-opacity-100 text-opacity-100': {},
      '@apply border-base-content dark:border-base-content-dark': {},
    },

    '&:focus': {
      '@apply outline-none': {},
    },

    '&:focus-visible': {
      outline: '2px solid currentColor',
      'outline-offset': '-3px',
      '&.tab-lifted': {
        'border-bottom-right-radius': 'var(--tab-radius, 0.5rem)',
        'border-bottom-left-radius': 'var(--tab-radius, 0.5rem)',
      },
    },

    /* disabled */
    '&-disabled, &-disabled:hover, &[disabled], &[disabled]:hover': {
      '@apply text-opacity-20 cursor-not-allowed': {},
      '@apply text-base-content dark:text-base-content-dark': {},
    },
  },

  '.tab-bg-base-100': {
    '--tab-bg': 'hsla(var(--b1) / var(--tw-bg-opacity, 1))',
    '--tab-bg-dark': 'hsla(var(--b1-d) / var(--tw-bg-opacity, 1))',
  },

  '.tab-bg-base-200': {
    '--tab-bg': 'hsla(var(--b2) / var(--tw-bg-opacity, 1))',
    '--tab-bg-dark': 'hsla(var(--b2-d) / var(--tw-bg-opacity, 1))',
  },

  '.tab-bg-base-300': {
    '--tab-bg': 'hsla(var(--b3) / var(--tw-bg-opacity, 1))',
    '--tab-bg-dark': 'hsla(var(--b3-d) / var(--tw-bg-opacity, 1))',
  },

  '.tab-bg-transparent': {
    '--tab-bg': 'transparent',
    '--tab-bg-dark': 'transparent',
  },

  '.tab-border-transparent': {
    '--tab-border-color': 'transparent',
    '--tab-border-color-dark': 'transparent',
  },

  '.tab-bordered': {
    '@apply border-opacity-20': {},
    '@apply border-base-content dark:border-base-content-dark': {},
    'border-style': 'solid',
    'border-bottom-width': 'calc(var(--tab-border, 1px) + 1px)',
  },

  '.tab-lifted': {
    border: 'var(--tab-border, 1px) solid transparent',
    'border-width': '0 0 var(--tab-border, 1px) 0',
    'border-top-left-radius': 'var(--tab-radius, 0.5rem)',
    'border-top-right-radius': 'var(--tab-radius, 0.5rem)',

    //'border-bottom-color': 'var(--tab-border-color)',
    '@apply border-b-tab-border-color dark:border-b-tab-border-color-dark': {},

    'padding-left': 'var(--tab-padding, 1rem)',
    'padding-right': 'var(--tab-padding, 1rem)',
    'padding-top': 'var(--tab-border, 1px)',

    '&.tab-active:not(.tab-disabled):not([disabled])': {
      'border-width':
        'var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px)',

      '@apply bg-tab-bg dark:bg-tab-bg-dark': {},

      '@apply border-l-tab-border-color dark:border-l-tab-border-color-dark':
        {},
      '@apply border-r-tab-border-color dark:border-r-tab-border-color-dark':
        {},
      '@apply border-t-tab-border-color dark:border-t-tab-border-color-dark':
        {},
      'padding-left': 'calc(var(--tab-padding, 1rem) - var(--tab-border, 1px))',
      'padding-right':
        'calc(var(--tab-padding, 1rem) - var(--tab-border, 1px))',
      'padding-bottom': 'var(--tab-border, 1px)',
      'padding-top': 0,
      '&:before, &:after': {
        'z-index': 1,
        content: "''",
        display: 'block',
        position: 'absolute',
        width: 'var(--tab-radius, 0.5rem)',
        height: 'var(--tab-radius, 0.5rem)',
        bottom: 0,
        '--tab-grad': 'calc(68% - var(--tab-border, 1px))',
        '--tab-corner-bg': setupCornerBg(false),
        '--tab-corner-bg-dark': setupCornerBg(true),
      },

      '&:before': {
        left: 'calc(var(--tab-radius, 0.5rem) * -1)',
        '--circle-pos': 'top left',
        'background-image': 'var(--tab-corner-bg)',

        ':is(.dark) &': {
          'background-image': 'var(--tab-corner-bg-dark)',
        },

        /* RTL quick fix */
        '[dir="rtl"] &': {
          '--circle-pos': 'top right',
        },
      },

      '&:after': {
        right: 'calc(var(--tab-radius, 0.5rem) * -1)',
        '--circle-pos': 'top right',
        'background-image': 'var(--tab-corner-bg)',

        ':is(.dark) &': {
          'background-image': 'var(--tab-corner-bg-dark)',
        },

        /* RTL quick fix */
        '[dir="rtl"] &': {
          '--circle-pos': 'top left',
        },
      },

      '&:first-child:before': {
        background: 'none',
      },

      '&:last-child:after': {
        background: 'none',
      },
    },
  },

  '.tab-lifted.tab-active:not(.tab-disabled):not([disabled]) + .tab-lifted.tab-active:not(.tab-disabled):not([disabled])':
    {
      '&:before': {
        background: 'none',
      },
    },

  '.tabs-boxed': {
    '@apply p-1 rounded-btn': {},
    '@apply bg-base-200 dark:bg-base-200-dark': {},

    '.tab': {
      '@apply rounded-btn': {},
    },

    '.tab-active:not(.tab-disabled):not([disabled])': {
      '@apply bg-primary dark:bg-primary-dark': {},
      '@apply text-primary-content dark:text-primary-content-dark': {},
      '@apply hover:text-primary-content dark:hover:text-primary-content-dark':
        {},
    },
  },
}

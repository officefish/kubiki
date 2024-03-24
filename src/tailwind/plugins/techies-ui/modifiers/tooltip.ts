export const tooltip = {
  '.tooltip': {
    '@apply relative inline-block text-center': {},
    '--tooltip-tail': '3px',
    '--tooltip-color': 'hsl(var(--n))',
    '--tooltip-text-color': 'hsl(var(--nc))',
    '--tooltip-tail-offset': 'calc(100% + 1px - var(--tooltip-tail))',

    '--tooltip-color-dark': 'hsl(var(--n-d))',
    '--tooltip-text-color-dark': 'hsl(var(--nc-d))',

    '&-primary': {
      '--tooltip-color': 'hsl(var(--p))',
      '--tooltip-text-color': 'hsl(var(--pc))',
      '--tooltip-color-dark': 'hsl(var(--p-d))',
      '--tooltip-text-color-dark': 'hsl(var(--pc-d))',
    },

    '&-secondary': {
      '--tooltip-color': 'hsl(var(--s))',
      '--tooltip-text-color': 'hsl(var(--sc))',
      '--tooltip-color-dark': 'hsl(var(--s-d))',
      '--tooltip-text-color-dark': 'hsl(var(--sc-d))',
    },

    '&-accent': {
      '--tooltip-color': 'hsl(var(--a))',
      '--tooltip-text-color': 'hsl(var(--ac))',
      '--tooltip-color-dark': 'hsl(var(--a-d))',
      '--tooltip-text-color-dark': 'hsl(var(--ac-d))',
    },

    '&-info': {
      '--tooltip-color': 'hsla(var(--in))',
      '--tooltip-text-color': 'hsl(var(--inc))',
      '--tooltip-color-dark': 'hsl(var(--in-d))',
      '--tooltip-text-color-dark': 'hsl(var(--inc-d))',
    },

    '&-success': {
      '--tooltip-color': 'hsla(var(--su))',
      '--tooltip-text-color': 'hsl(var(--suc))',
      '--tooltip-color-dark': 'hsl(var(--su-d))',
      '--tooltip-text-color-dark': 'hsl(var(--suc-d))',
    },

    '&-warning': {
      '--tooltip-color': 'hsla(var(--wa))',
      '--tooltip-text-color': 'hsl(var(--wac))',
      '--tooltip-color-dark': 'hsl(var(--wa-d))',
      '--tooltip-text-color-dark': 'hsl(var(--wac-d))',
    },

    '&-error': {
      '--tooltip-color': 'hsla(var(--er))',
      '--tooltip-text-color': 'hsl(var(--erc))',
      '--tooltip-color-dark': 'hsl(var(--er-d))',
      '--tooltip-text-color-dark': 'hsl(var(--erc-d))',
    },
  },

  '.tooltip:before, .tooltip:after': {
    '@apply opacity-0 transition delay-100 duration-200 ease-in-out': {},
  },

  '.tooltip:before': {
    '@apply max-w-xs rounded px-2 py-1 text-sm': {},
    'background-color': 'var(--tooltip-color)',
    color: 'var(--tooltip-text-color)',
    width: 'max-content',

    ':is(.dark) &': {
      'background-color': 'var(--tooltip-color-dark)',
      color: 'var(--tooltip-text-color-dark)',
    },
  },

  '.tooltip:after': {
    '@apply absolute': {},

    content: "''",
    'border-style': 'solid',
    'border-width': 'var(--tooltip-tail, 0)',
    width: 0,
    height: 0,
    display: 'block',
    position: 'absolute',
  },

  [`.tooltip.tooltip-open:before,
    .tooltip.tooltip-open:after,
    .tooltip:hover:before,
    .tooltip:hover:after`]: {
    '@apply opacity-100 delay-75': {},
  },

  [`.tooltip:not([data-tip]):hover:before,
    .tooltip:not([data-tip]):hover:after`]: {
    visibility: 'hidden',
    opacity: 0,
  },

  '.tooltip, .tooltip-top': {
    '&:after': {
      transform: 'translateX(-50%)',
      'border-color':
        'var(--tooltip-color) transparent transparent transparent',
      top: 'auto',
      left: '50%',
      right: 'auto',
      bottom: 'var(--tooltip-tail-offset)',

      ':is(.dark) &': {
        'border-color':
          'var(--tooltip-color-dark) transparent transparent transparent',
      },
    },
  },

  '.tooltip-bottom': {
    '&:after': {
      transform: 'translateX(-50%)',
      'border-color':
        'transparent transparent var(--tooltip-color) transparent',
      top: 'var(--tooltip-tail-offset)',
      left: '50%',
      right: 'auto',
      bottom: 'auto',

      ':is(.dark) &': {
        'border-color':
          'transparent transparent var(--tooltip-color-dark) transparent',
      },
    },
  },

  '.tooltip-left': {
    '&:after': {
      transform: 'translateY(-50%)',
      'border-color':
        'transparent transparent transparent var(--tooltip-color)',
      top: '50%',
      left: 'auto',
      right: 'calc(var(--tooltip-tail-offset) + 1px)',
      bottom: 'auto',

      ':is(.dark) &': {
        'border-color':
          'transparent transparent transparent var(--tooltip-color-dark)',
      },
    },
  },

  '.tooltip-right': {
    '&:after': {
      transform: 'translateY(-50%)',
      'border-color':
        'transparent var(--tooltip-color) transparent transparent',
      top: '50%',
      left: 'calc(var(--tooltip-tail-offset) + 1px)',
      right: 'auto',
      bottom: 'auto',

      ':is(.dark) &': {
        'border-color':
          'transparent var(--tooltip-color-dark) transparent transparent',
      },
    },
  },
}

export const button = {
  '.btn': {
    'min-height': '3rem',
    'padding-left': '1rem',
    'padding-right': '1rem',
    'font-size': '0.875rem',
    'line-height': '1.25rem',
  },

  '.btn-xs': {
    'padding-left': '0.5rem',
    'padding-right': '0.5rem',
    'min-height': '1.5rem',
    'font-size': '0.75rem',
  },

  '.btn-sm': {
    'padding-left': '0.75rem',
    'padding-right': '0.75rem',
    'min-height': '2rem',
    'font-size': '0.875rem',
  },

  '.btn-md': {
    'padding-left': '1rem',
    'padding-right': '1rem',
    'min-height': '3rem',
    'font-size': '1rem',
  },

  '.btn-lg': {
    'padding-left': '1.5rem',
    'padding-right': '1.5rem',
    'min-height': '4rem',
    'font-size': '1.125rem',
  },

  '.btn-wide': {
    width: '16rem',
  },

  '.btn-block': {
    width: '100%',
  },

  '.btn-square': {
    padding: 0,
    'min-width': '3rem',
    'min-height': '3rem',

    '&:where(.btn-xs)': {
      padding: 0,
      'min-width': '1.5rem',
      'min-height': '1.5rem',
    },

    '&:where(.btn-sm)': {
      padding: 0,
      'min-width': '2rem',
      'min-height': '2rem',
    },

    '&:where(.btn-md)': {
      padding: 0,
      'min-width': '3rem',
      'min-height': '3rem',
    },

    '&:where(.btn-lg)': {
      padding: 0,
      'min-width': '4rem',
      'min-height': '4rem',
    },
  },

  '.btn-circle': {
    padding: 0,
    'min-width': '3rem',
    'min-height': '3rem',
    'border-radius': '9999px',

    '&:where(.btn-xs)': {
      padding: 0,
      'min-width': '1.5rem',
      'min-height': '1.5rem',
      'border-radius': '9999px',
    },

    '&:where(.btn-sm)': {
      padding: 0,
      'min-width': '2rem',
      'min-height': '2rem',
      'border-radius': '9999px',
    },

    '&:where(.btn-md)': {
      padding: 0,
      'min-width': '3rem',
      'min-height': '3rem',
      'border-radius': '9999px',
    },

    '&:where(.btn-lg)': {
      padding: 0,
      'min-width': '4rem',
      'min-height': '4rem',
      'border-radius': '9999px',
    },
  },
}

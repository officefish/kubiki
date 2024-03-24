export const swap = {
  '.swap': {
    '@apply relative inline-grid select-none place-content-center': {},
  },

  '.swap > *': {
    '@apply col-start-1 row-start-1': {},
  },

  '.swap input': {
    '@apply appearance-none': {},
    outline: 'none',
    border: 'none',
    margin: 0,
    'background-color': 'transparent',
    'border-color': 'transparent',
    color: 'transparent',
    'background-image': 'none',
    '@apply w-full h-full': {},

    '&:focus, &:checked, &:focus-visible': {
      '@apply appearance-none': {},
      border: 'none',
      outline: 0,
      'background-image': 'none',
      'background-color': 'transparent',
      'border-color': 'transparent',
      color: 'transparent',
      'border-width': '0px',
      'box-shadow': 'none',
    },
  },

  [`.swap .swap-on,
    .swap .swap-indeterminate,
    .swap input:indeterminate ~ .swap-on`]: {
    '@apply opacity-0': {},
  },

  [`.swap input:checked ~ .swap-off,
    .swap.swap-active .swap-off,
    .swap input:indeterminate ~ .swap-off`]: {
    '@apply opacity-0': {},
  },

  [`.swap input:checked ~ .swap-on,
    .swap-active .swap-on,
    .swap input:indeterminate ~ .swap-indeterminate`]: {
    '@apply opacity-100': {},
  },
}

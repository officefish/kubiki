export const radialProgress = {
  '.radial-progress': {
    '--value': 0,
    '--size': '5rem',
    '--thickness': 'calc(var(--size) / 10)',

    '@apply text-current': {},
  },

  '.radial-progress:after': {
    '@apply bg-current': {},
  },
}

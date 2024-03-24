export const stat = {
  '.stats': {
    '@apply bg-base-100 text-base-content rounded-box': {},

    ':is(.dark) &': {
      '@apply bg-base-100-dark text-base-content-dark': {},
    },
  },

  ':where(.stats)': {
    '@apply divide-x divide-y-0 overflow-x-auto': {},
  },

  '.stat': {
    '@apply gap-x-4 border-base-content/10 px-6 py-4': {},

    '&-title': {
      '@apply text-base-content/60': {},

      ':is(.dark) &': {
        '@apply text-base-content-dark/60': {},
      },
    },

    '&-value': {
      '@apply text-4xl font-extrabold': {},
    },

    '&-desc': {
      '@apply text-xs text-base-content/60': {},
      ':is(.dark) &': {
        '@apply text-base-content-dark/60': {},
      },
    },

    '&-actions': {
      '@apply mt-4': {},
    },
  },
}

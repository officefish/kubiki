export const inputGroup = {
  '.input-group': {
    '@apply flex w-full items-stretch': {},

    '> .input': {
      '@apply isolate': {},
    },

    '> *, > .input, > .textarea, > .select': {
      '@apply rounded-none': {},
    },

    ':where(span)': {
      '@apply flex items-center px-4': {},
      '@apply bg-base-300 text-base-content': {},
      ':is(.dark) &': {
        '@apply bg-base-300-dark text-base-content-dark': {},
      },
    },

    '> :first-child': {
      'border-top-left-radius': 'var(--rounded-btn, 0.5rem)',
      'border-top-right-radius': 0,
      'border-bottom-left-radius': 'var(--rounded-btn, 0.5rem)',
      'border-bottom-right-radius': 0,
    },

    '> :last-child': {
      'border-top-left-radius': 0,
      'border-top-right-radius': 'var(--rounded-btn, 0.5rem)',
      'border-bottom-left-radius': 0,
      'border-bottom-right-radius': 'var(--rounded-btn, 0.5rem)',
    },

    '&-vertical': {
      '@apply flex-col': {},
      ':first-child': {
        'border-top-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-top-right-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 0,
      },
      ':last-child': {
        'border-top-left-radius': 0,
        'border-top-right-radius': 0,
        'border-bottom-left-radius': 'var(--rounded-btn, 0.5rem)',
        'border-bottom-right-radius': 'var(--rounded-btn, 0.5rem)',
      },
    },
  },
}

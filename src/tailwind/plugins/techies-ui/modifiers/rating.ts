export const rating = {
  '.rating': {
    '& input': {
      '@apply appearance-none': {},
      '-webkit-appearance': 'none',
    },

    ' :where(input)': {
      animation: 'rating-pop var(--animation-input, 0.25s) ease-out',
      '@apply !h-6 !w-6 !bg-base-content': {},
      ':is(.dark) &': {
        '@apply !bg-base-content-dark': {},
      },
    },

    '& .rating-hidden': {
      '@apply w-2 bg-transparent': {},
    },

    'input:checked ~ input, input[aria-checked=true] ~ input': {
      '@apply bg-base-content/20': {},
      ':is(.dark) &': {
        '@apply bg-base-content-dark/20': {},
      },
    },

    'input:focus-visible': {
      '@apply transition-transform duration-300 ease-in-out': {},
      transform: 'translateY(-0.125em)',
    },

    '& input:active:focus': {
      animation: 'none',
      transform: 'translateY(-0.125em)',
    },
  },

  '.rating-half': {
    ':where(input:not(.rating-hidden))': {
      '@apply w-3': {},
    },
  },

  '@keyframes rating-pop': {
    '0%': {
      transform: 'translateY(-0.125em)',
    },
    '40%': {
      transform: 'translateY(-0.125em)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
}

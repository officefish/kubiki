const setupFileInput = (colorTag: string, colorVariable: string) => {
  return {
    [`&-${colorTag}`]: {
      [`@apply border-${colorTag}`]: {},
      '&:focus': {
        outline: `2px solid hsl(var(${colorVariable}))`,
        ':is(.dark) &': {
          outline: `2px solid hsl(var(${colorVariable}-d))`,
        },
      },

      '&::file-selector-button': {
        [`@apply border-${colorTag} bg-${colorTag} text-${colorTag}-content`]:
          {},
        ':is(.dark) &': {
          [`@apply border-${colorTag}-dark bg-${colorTag}-dark text-${colorTag}-content-dark`]:
            {},
        },
      },
    },
  }
}

export const fileInput = {
  '.file-input': {
    '@apply border border-base-content/0 bg-base-100 rounded-btn text-base-content overflow-hidden':
      {},

    ':is(.dark) &': {
      '@apply border-base-content-dark/0 bg-base-100-dark text-base-content-dark':
        {},
    },

    '&::file-selector-button': {
      'border-style': 'solid',
      '@apply font-semibold uppercase no-underline border-neutral bg-neutral text-neutral-content':
        {},

      ':is(.dark) &': {
        '@apply border-neutral-dark bg-neutral-dark text-neutral-content-dark':
          {},
      },

      'border-width': 'var(--border-btn, 1px)',
      animation: 'button-pop var(--animation-btn, 0.25s) ease-out',
      'text-transform': 'var(--btn-text-case, uppercase)',
    },

    '&-bordered': {
      '@apply border border-base-content/20': {},

      ':is(.dark) &': {
        '@apply border-base-content-dark/20': {},
      },
    },

    '&:focus': {
      outline: '2px solid hsla(var(--bc) / 0.2)',
      'outline-offset': '2px',

      ':is(.dark) &': {
        outline: '2px solid hsla(var(--bc-d) / 0.2)',
      },
    },

    '&-ghost': {
      '@apply bg-base-100/5': {},

      ':is(.dark) &': {
        '@apply bg-base-100-dark/5': {},
      },

      '&:focus': {
        '@apply bg-base-100 text-base-content': {},
        'box-shadow': 'none',
        ':is(.dark) &': {
          '@apply bg-base-100-dark text-base-content-dark': {},
        },
      },

      '&::file-selector-button': {
        '@apply border border-transparent bg-transparent text-current': {},

        ':is(.dark) &': {
          '@apply border border-transparent bg-transparent text-current': {},
        },
      },
    },

    ...setupFileInput('primary', '--p'),
    ...setupFileInput('secondary', '--s'),
    ...setupFileInput('accent', '--a'),

    ...setupFileInput('info', '--in'),
    ...setupFileInput('success', '--su'),
    ...setupFileInput('warning', '--wa'),
    ...setupFileInput('error', '--er'),

    '&-disabled, &[disabled]': {
      '@apply cursor-not-allowed border-base-200 bg-base-200 text-base-content/20 placeholder-base-content/20':
        {},

      ':is(.dark) &': {
        '@apply border-base-200-dark bg-base-200-dark text-base-content-dark/20 placeholder-base-content-dark/20':
          {},
      },

      '&::file-selector-button': {
        '@apply border-opacity-0 bg-neutral/20 text-base-content/20': {},
        ':is(.dark) &': {
          '@apply bg-neutral-dark/20 text-base-content-dark/20': {},
        },
      },
    },
  },
}

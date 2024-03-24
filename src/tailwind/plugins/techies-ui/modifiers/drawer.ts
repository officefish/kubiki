export const drawer = {
  '.drawer.drawer-end > .drawer-toggle:checked ~ .drawer-content': {
    '@apply -translate-x-2': {},
  },

  '.drawer-toggle': {
    '& ~ .drawer-content': {
      '@apply transition-all duration-300 ease-in-out': {},
    },
    '& ~ .drawer-side': {
      '& > .drawer-overlay': {
        '@apply cursor-pointer bg-neutral-focus transition-all duration-300 ease-in-out':
          {},
        ':is(.dark) &': {
          '@apply bg-neutral-focus-dark': {},
        },
      },

      '& > .drawer-overlay + *': {
        '@apply transition-all duration-300 ease-in-out': {},
      },
    },

    '&:checked': {
      '& ~ .drawer-content': {
        '@apply translate-x-2': {},
      },
      '& ~ .drawer-side': {
        '& > .drawer-overlay': {
          opacity: '0.999999',
          /* 1 causes a bug on chrome 🤷‍♂️ */
          '@apply bg-opacity-40': {},
        },
      },
    },

    '&:focus-visible': {
      '& ~ .drawer-content .drawer-button': {
        outline: '2px solid hsl(var(--nf))',
        ':is(.dark) &': {
          outline: '2px solid hsl(var(--nf-d))',
        },

        'outline-offset': '2px',

        '&.btn-primary': {
          outline: '2px solid hsl(var(--p))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--p-d))',
          },
        },

        '&.btn-secondary': {
          outline: '2px solid hsl(var(--s))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--s-d))',
          },
        },

        '&.btn-accent': {
          outline: '2px solid hsl(var(--a))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--a-d))',
          },
        },

        '&.btn-info': {
          outline: '2px solid hsl(var(--in))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--in-d))',
          },
        },

        '&.btn-success': {
          outline: '2px solid hsl(var(--su))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--su-d))',
          },
        },

        '&.btn-warning': {
          outline: '2px solid hsl(var(--wa))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--wa-d))',
          },
        },

        '&.btn-error': {
          outline: '2px solid hsl(var(--er))',
          ':is(.dark) &': {
            outline: '2px solid hsl(var(--er-d))',
          },
        },

        '&.glass': {
          outline: '2px solid currentColor',
        },

        '&.btn-ghost': {
          outline: '2px solid currentColor',
        },

        '&.btn-link': {
          outline: '2px solid currentColor',
        },
      },
    },
  },
}

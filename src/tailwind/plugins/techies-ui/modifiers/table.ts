export const table = {
  '.table': {
    'text-align': 'left',
    ':where(th, td)': {
      padding: '1rem',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },

    'tr.active, tr.active:nth-child(even)': {
      'th, td': {
        '@apply bg-base-300 dark:bg-base-300-dark': {},
      },
    },

    'tr.hover:hover, tr.hover:nth-child(even):hover': {
      'th, td': {
        '@apply bg-base-300 dark:bg-base-300-dark': {},
      },
    },

    '&:where(:not(.table-zebra))': {
      ':where(thead, tbody, tfoot)': {
        ':where(tr:not(:last-child) :where(th, td))': {
          '@apply border-b border-base-200 dark:border-base-200-dark': {},
        },
      },
    },

    ':where(thead, tfoot)': {
      ':where(th, td)': {
        '@apply text-xs font-bold uppercase': {},
        '@apply bg-base-200 dark:bg-base-200-dark': {},
      },
    },

    ':where(tbody th, tbody td)': {
      '@apply bg-base-100 dark:bg-base-100-dark': {},
    },

    '&-zebra tbody': {
      'tr:nth-child(even)': {
        'th, td': {
          '@apply bg-base-200 dark:bg-base-200-dark': {},
        },
      },
    },
  },

  ':where(.table *:first-child)': {
    ':where(*:first-child)': {
      ':where(th, td)': {
        '&:first-child': {
          '@apply rounded-tl-lg': {},
        },
        '&:last-child': {
          '@apply rounded-tr-lg': {},
        },
      },
    },
  },

  ':where(.table *:last-child)': {
    ':where(*:last-child)': {
      ':where(th, td)': {
        '&:first-child': {
          '@apply rounded-bl-lg': {},
        },
        '&:last-child': {
          '@apply rounded-br-lg': {},
        },
      },
    },
  },
}

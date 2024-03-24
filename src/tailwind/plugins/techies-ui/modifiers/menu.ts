export const menu = {
  '.menu': {
    '@apply p-2': {},
    ':where(li:empty)': {
      '@apply bg-base-content/10': {},
      margin: '0.5rem 1rem',
      height: '1px',
      ':is(.dark) &': {
        '@apply bg-base-content-dark/10': {},
      },
    },
    ':where(li ul)': {
      '@apply pl-2 ml-4': {},
      '&:before': {
        '@apply absolute left-0 w-px top-3 bottom-3 bg-base-content/10': {},
        content: "''",
        ':is(.dark) &': {
          '@apply bg-base-content-dark/10': {},
        },
      },
    },

    /* :where(& > li:not(.menu-title) > details > ul) {
          @apply bg-base-100 shadow-xl rounded-box;
        } */
    [`:where(li:not(.menu-title) > *:not(ul):not(details):not(.menu-title)),
        :where(li:not(.menu-title) > details > summary:not(.menu-title))`]: {
      '@apply px-4 py-2 rounded-btn transition duration-200 ease-in-out text-left':
        {},
    },

    [`:where(li:not(.menu-title):not(.disabled) > *:not(ul):not(details):not(.menu-title)),
      :where(li:not(.menu-title):not(.disabled) > details > summary:not(.menu-title))`]:
      {
        '&.focus, &:focus': {
          '@apply outline-none bg-base-content/10 cursor-pointer': {},
          ':is(.dark) &': {
            '@apply bg-base-content-dark/10': {},
          },
        },
        // '@media (hover: hover)': {
        //     '&:hover': {
        //         '@apply outline-none bg-base-content/10 cursor-pointer': {},
        //         ':is(.dark) &': {
        //             '@apply bg-base-content-dark/10': {},
        //         }
        //     }
        // },

        '&:hover': {
          '@apply outline-none bg-base-content/10 cursor-pointer': {},
          ':is(.dark) &': {
            '@apply bg-base-content-dark/10': {},
          },
        },

        '&:active, &:where(.active)': {
          '@apply bg-neutral text-neutral-content': {},
          ':is(.dark) &': {
            '@apply bg-neutral-dark text-neutral-content-dark': {},
          },
        },

        '&:where(.active)': {
          '@apply [@media(hover:hover)]:bg-neutral [@media(hover:hover)]:text-neutral-content':
            {},
          ':is(.dark) &': {
            '@apply [@media(hover:hover)]:bg-neutral-dark [@media(hover:hover)]:text-neutral-content-dark':
              {},
          },
        },
      },

    '& li.disabled': {
      '@apply text-base-content/30': {},
      ':is(.dark) &': {
        '@apply text-base-content-dark/30': {},
      },
    },

    ':where(li > details > summary)::-webkit-details-marker': {
      '@apply hidden': {},
    },

    [`:where(li > details > summary):after,
      :where(li > .menu-dropdown-toggle):after`]: {
      '@apply justify-self-end': {},
      display: 'block',
      'margin-top': '-0.5rem',
      height: '0.5rem',
      width: '0.5rem',
      transform: 'rotate(45deg)',
      'transition-property': 'transform, margin-top',
      'transition-duration': '0.3s',
      'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      content: "''",
      'transform-origin': '75% 75%',
      'box-shadow': '2px 2px',
      'pointer-events': 'none',
    },

    [`:where(li > details[open] > summary):after,
        :where(li > .menu-dropdown-toggle.menu-dropdown-show):after`]: {
      transform: 'rotate(225deg)',
      'margin-top': 0,
    },

    '.menu-title': {
      '@apply text-sm font-bold text-base-content/40 px-4 py-2': {},
      ':is(.dark) &': {
        '@apply text-base-content-dark/40': {},
      },
    },
  },
}

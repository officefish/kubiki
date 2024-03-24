export const collapse = {
  '.collapse': {
    '@apply w-full rounded-box': {},
  },

  'details.collapse': {
    '@apply w-full': {},
    '& summary': {
      '@apply block relative': {},
      '&::-webkit-details-marker': {
        '@apply hidden': {},
      },
    },
  },

  '.collapse:focus-visible': {
    '@apply outline outline-2 outline-offset-2 outline-base-content': {},
  },

  'details.collapse summary': {
    '@apply outline-none': {},
  },

  [`.collapse:has(.collapse-title:focus-visible),
    .collapse:has(> input[type="checkbox"]:focus-visible),
    .collapse:has(> input[type="radio"]:focus-visible)`]: {
    '@apply outline outline-2 outline-offset-2 outline-base-content': {},
  },

  '.collapse-arrow .collapse-title:after': {
    '@apply absolute block h-2 w-2 transition-all ease-in-out rotate-[45deg] translate-y-[-100%]':
      {},
    'transition-duration': '0.2s',
    top: '50%',
    right: '1.4rem',
    content: "''",
    'transform-origin': '75% 75%',
    'box-shadow': '2px 2px',
    'pointer-events': 'none',
  },

  [`[dir="rtl"] .collapse-arrow .collapse-title:after`]: {
    '--tw-rotate': '-45deg',
  },

  [`.collapse-plus .collapse-title:after`]: {
    '@apply absolute block h-2 w-2 transition-all duration-300 ease-in-out': {},
    top: '0.9rem',
    right: '1.4rem',
    content: "'+'",
    'pointer-events': 'none',
  },

  [`.collapse:not(.collapse-open):not(.collapse-close) input[type="checkbox"],
      .collapse:not(.collapse-open):not(.collapse-close) input[type="radio"]:not(:checked),
      .collapse:not(.collapse-open):not(.collapse-close) .collapse-title`]: {
    '@apply cursor-pointer': {},
  },

  [`.collapse:focus:not(.collapse-open):not(.collapse-close):not(.collapse[open]) .collapse-title`]:
    {
      cursor: 'unset',
    },

  [`.collapse-title`]: {
    '@apply relative': {},
  },

  [`:where(.collapse > input[type="checkbox"]),
    :where(.collapse > input[type="radio"])`]: {
    'z-index': 1,
  },

  [`.collapse-title,
    :where(.collapse > input[type="checkbox"]),
    :where(.collapse > input[type="radio"])`]: {
    '@apply w-full p-4 pr-12': {},
    'min-height': '3.75rem',
    transition: 'background-color 0.2s ease-in-out',
  },

  '.collapse-content': {
    '@apply px-4': {},
    cursor: 'unset',
    transition: 'padding 0.2s ease-in-out, background-color 0.2s ease-in-out',
  },

  [` .collapse[open] :where(.collapse-content),
      .collapse-open :where(.collapse-content),
      .collapse:focus:not(.collapse-close) :where(.collapse-content),
      .collapse:not(.collapse-close) :where(input[type="checkbox"]:checked ~ .collapse-content),
      .collapse:not(.collapse-close) :where(input[type="radio"]:checked ~ .collapse-content)`]:
    {
      '@apply pb-4': {},
      transition: 'padding 0.2s ease-in-out, background-color 0.2s ease-in-out',
    },

  [`.collapse[open].collapse-arrow .collapse-title:after,
      .collapse-open.collapse-arrow .collapse-title:after,
      .collapse-arrow:focus:not(.collapse-close) .collapse-title:after,
      .collapse-arrow:not(.collapse-close) input[type="checkbox"]:checked ~ .collapse-title:after,
      .collapse-arrow:not(.collapse-close) input[type="radio"]:checked ~ .collapse-title:after`]:
    {
      '@apply rotate-[225deg] translate-y-[-50%]': {},
    },

  [`[dir="rtl"] .collapse[open].collapse-arrow .collapse-title:after,
      [dir="rtl"] .collapse-open.collapse-arrow .collapse-title:after,
      [dir="rtl"] .collapse-arrow:focus:not(.collapse-close) .collapse-title:after,
      [dir="rtl"]
        .collapse-arrow:not(.collapse-close)
        input[type="checkbox"]:checked
        ~ .collapse-title:after`]: {
    '--tw-rotate': '135deg',
  },

  [`.collapse[open].collapse-plus .collapse-title:after,
      .collapse-open.collapse-plus .collapse-title:after,
      .collapse-plus:focus:not(.collapse-close) .collapse-title:after,
      .collapse-plus:not(.collapse-close) input[type="checkbox"]:checked ~ .collapse-title:after,
      .collapse-plus:not(.collapse-close) input[type="radio"]:checked ~ .collapse-title:after`]:
    {
      content: "'−'",
    },
}

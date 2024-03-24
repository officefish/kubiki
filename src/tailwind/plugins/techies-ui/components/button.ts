export const button = {
  '.btn': {
    /* display */
    display: 'inline-flex',
    flexGrow: 'initial', // flex-grow-0
    flexShrink: 0, // flex-shrink-0;
    flexBasis: 'auto',
    /* flex setup */
    flexWrap: 'wrap', // flex-wrap
    flexDirection: 'initial',
    /* flex align */
    justifyContent: 'center', // justify-center
    alignItems: 'center', // items-center
    /* text setup */
    textAlign: 'center', // text-center
    lineHeight: '1em',
    /* usability */
    userSelect: 'none', // select-none
    /* cursor setup */
    cursor: 'pointer', // cursor-pointer
    /* border */
    borderColor: 'transparent',
    '@apply transition duration-200 ease-in-out': {},
    '&-disabled, &[disabled]': {
      pointerEvents: 'none',
    },
    /* loading */
    '&-loading': {
      '&, &:hover': {
        '@apply pointer-events-none': {},
      },
      '&:before': {
        '@apply mr-2 h-4 w-4 rounded-full border-2': {},
        animation: 'spin 2s linear infinite',
        content: "''",
        'border-top-color': 'transparent',
        'border-left-color': 'transparent',
        'border-bottom-color': 'currentColor',
        'border-right-color': 'currentColor',
      },
    },
  },

  '@media (prefers-reduced-motion: reduce)': {
    '.btn-loading:before': {
      animation: 'spin 10s linear infinite',
    },
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
}

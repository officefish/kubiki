const setupLink = (colorTag: string) => {
  return {
    [`&-${colorTag}`]: {
      [`@apply text-${colorTag} hover:text-${colorTag}`]: {},
      ':is(.dark) &': {
        [`@apply text-${colorTag}-dark hover:text-${colorTag}-dark`]: {},
      },
    },
  }
}

const setupLinkFocus = (colorTag: string) => {
  return {
    [`&-${colorTag}`]: {
      [`@apply text-${colorTag} hover:text-${colorTag}-focus`]: {},
      ':is(.dark) &': {
        [`@apply text-${colorTag}-dark hover:text-${colorTag}-focus-dark`]: {},
      },
    },
  }
}

export const link = {
  '.link': {
    ...setupLinkFocus('primary'),
    ...setupLinkFocus('secondary'),
    ...setupLinkFocus('accent'),
    ...setupLinkFocus('neutral'),
    ...setupLink('success'),
    ...setupLink('info'),
    ...setupLink('warning'),
    ...setupLink('error'),
    '&:focus': {
      '@apply outline-none': {},
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
      'outline-offset': '2px',
    },
  },
}

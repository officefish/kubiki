const setupBubble = (colorTag: string) => {
  return {
    [`&-${colorTag}`]: {
      [`@apply bg-${colorTag} text-${colorTag}-content`]: {},
      ':is(.dark) &': {
        [`@apply bg-${colorTag}-dark text-${colorTag}-content-dark`]: {},
      },
    },
  }
}

export const chat = {
  '.chat': {
    '&-bubble': {
      '@apply rounded-box': {},
      'min-height': '2.75rem',
      'min-width': '2.75rem',

      /* default */
      '&': {
        '@apply bg-neutral text-neutral-content': {},

        ':is(.dark) &': {
          '@apply bg-neutral-dark text-neutral-content-dark': {},
        },
      },

      ...setupBubble('primary'),
      ...setupBubble('secondary'),
      ...setupBubble('accent'),
      ...setupBubble('info'),
      ...setupBubble('success'),
      ...setupBubble('warning'),
      ...setupBubble('error'),
    },

    '&-start .chat-bubble': {
      '@apply rounded-bl-none': {},
      '&:before': {
        left: '-0.75rem',
      },
    },

    '&-end .chat-bubble': {
      '@apply rounded-br-none': {},
      '&:before': {
        left: '100%',
      },
    },
  },
}

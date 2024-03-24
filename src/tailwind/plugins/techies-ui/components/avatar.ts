export const avatar = {
  '.avatar': {
    '@apply relative inline-flex': {},
    '& > div': {
      '@apply block aspect-square overflow-hidden': {},
    },
    img: {
      '@apply h-full w-full object-cover': {},
    },

    '&.placeholder': {
      '& > div': {
        '@apply flex items-center justify-center': {},
      },
    },
  },
}

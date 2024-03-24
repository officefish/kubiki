const setupProgressBar = (color: string) => {
  return {
    [`&-${color}::-moz-progress-bar`]: {
      [`@apply bg-${color} dark:bg-${color}-dark`]: {},
    },
  }
}

const setupIndeterminate = (color: string) => {
  return {
    [`&-${color}:indeterminate::after`]: {
      [`@apply bg-${color} dark:bg-${color}-dark`]: {},
    },
  }
}

const setupProgressValue = (color: string) => {
  return {
    [`&-${color}::-webkit-progress-value`]: {
      [`@apply bg-${color} dark:bg-${color}-dark`]: {},
    },
  }
}

export const progress = {
  '.progress': {
    '@apply h-2 rounded-box': {},

    '&::-moz-progress-bar': {
      '@apply bg-neutral dark:bg-neutral-dark': {},
    },

    ...setupProgressBar('primary'),
    ...setupProgressBar('secondary'),
    ...setupProgressBar('accent'),
    ...setupProgressBar('info'),
    ...setupProgressBar('success'),
    ...setupProgressBar('warning'),
    ...setupProgressBar('error'),

    '&:indeterminate::after': {
      '@apply bg-neutral dark:bg-neutral-dark': {},
    },

    ...setupIndeterminate('primary'),
    ...setupIndeterminate('secondary'),
    ...setupIndeterminate('accent'),
    ...setupIndeterminate('info'),
    ...setupIndeterminate('success'),
    ...setupIndeterminate('warning'),
    ...setupIndeterminate('error'),

    '&::-webkit-progress-bar': {
      '@apply bg-neutral/20 dark:bg-neutral-dark/20 rounded-box': {},
    },

    '&::-webkit-progress-value': {
      '@apply bg-neutral-focus dark:bg-neutral-focus-dark rounded-box': {},
    },

    ...setupProgressValue('primary'),
    ...setupProgressValue('secondary'),
    ...setupProgressValue('accent'),
    ...setupProgressValue('info'),
    ...setupProgressValue('success'),
    ...setupProgressValue('warning'),
    ...setupProgressValue('error'),
  },

  '.progress:indeterminate::after': {
    content: "''",
    '@apply inset-y-0 -left-[40%] w-1/3 absolute rounded-box': {},
    animation: 'progress-loading 5s infinite ease-in-out',
  },

  '@keyframes progress-loading': {
    '50%': {
      left: '107%',
    },
  },
}

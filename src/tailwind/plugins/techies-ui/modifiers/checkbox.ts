const setupCheckbox = (
  colorTag: string,
  bgVariable: string,
  textVariable: string,
) => {
  return {
    [`&-${colorTag}`]: {
      '--chkbg': `var(${bgVariable})`,
      '--chkfg': `var(${textVariable})`,
      '--chkbg-dark': `var(${bgVariable}-d)`,
      '--chkfg-dark': `var(${textVariable}-d)`,
      [`@apply border-${colorTag} dark:border-${colorTag}-dark`]: {},
      [`@apply hover:border-${colorTag} dark:hover:border-${colorTag}-dark`]:
        {},

      '&focus, &:focus-visible': {
        outline: `2px solid hsl(var(${bgVariable}))`,
        ':is(.dark) &': {
          outline: `2px solid hsl(var(${bgVariable}-d))`,
        },
      },

      '&:checked, &[checked="true"], &[aria-checked="true"]': {
        [`@apply border-${colorTag} dark:border-${colorTag}-dark`]: {},
        [`@apply bg-${colorTag} dark:bg-${colorTag}-dark`]: {},
        [`@apply text-${colorTag}-content dark:text-${colorTag}-content-dark`]:
          {},
      },
    },
  }
}

export const checkbox = {
  '.checkbox': {
    '--chkbg': 'var(--bc)',
    '--chkbg-dark': 'var(--bc-d)',
    '--chkfg': 'var(--b1)',
    '--chkfg-dark': 'var(--b1-d)',
    '@apply h-6 w-6 cursor-pointer appearance-none border rounded-btn': {},
    '@apply border-base-content/20 dark:border-base-content-dark/20': {},

    '&:focus': {
      outline: 0,
    },

    '&:focus, &:focus-visible': {
      outline: '!important 2px solid hsl(var(--bc))',
      'outline-offset': '!important 2px',
      ':is(.dark) &': {
        outline: '!important 2px solid hsl(var(--bc-d))',
      },
    },

    '&:checked, &[checked="true"], &[aria-checked="true"]': {
      '@apply bg-no-repeat': {},
      '@apply bg-base-content dark:bg-base-content-dark': {},
      animation: 'checkmark var(--animation-input, 0.2s) ease-in-out',
      'background-image': `
        linear-gradient(-45deg, transparent 65%, hsl(var(--chkbg)) 65.99%), 
        linear-gradient(45deg, transparent 75%, hsl(var(--chkbg)) 75.99%), 
        linear-gradient(-45deg, hsl(var(--chkbg)) 40%, transparent 40.99%), 
        linear-gradient(45deg, hsl(var(--chkbg)) 30%, hsl(var(--chkfg)) 30.99%, 
        hsl(var(--chkfg)) 40%, transparent 40.99%), 
        linear-gradient(-45deg, hsl(var(--chkfg)) 50%, hsl(var(--chkbg)) 50.99%)`,

      ':is(.dark) &': {
        'background-image': `
        linear-gradient(-45deg, transparent 65%, hsl(var(--chkbg-dark)) 65.99%), 
        linear-gradient(45deg, transparent 75%, hsl(var(--chkbg-dark)) 75.99%), 
        linear-gradient(-45deg, hsl(var(--chkbg-dark)) 40%, transparent 40.99%), 
        linear-gradient(45deg, hsl(var(--chkbg-dark)) 30%, hsl(var(--chkfg-dark)) 30.99%, 
        hsl(var(--chkfg-dark)) 40%, transparent 40.99%), 
        linear-gradient(-45deg, hsl(var(--chkfg-dark)) 50%, hsl(var(--chkbg-dark)) 50.99%)`,
      },
    },

    '&:indeterminate': {
      '@apply bg-no-repeat': {},
      '@apply bg-base-content dark:bg-base-content-dark': {},
      animation: 'checkmark var(--animation-input, 0.2s) ease-in-out',
      'background-image': `
        linear-gradient(90deg, transparent 80%, hsl(var(--chkbg)) 80%), 
        linear-gradient(-90deg, transparent 80%, hsl(var(--chkbg)) 80%), 
        linear-gradient(0deg, hsl(var(--chkbg)) 43%, hsl(var(--chkfg)) 43%, 
        hsl(var(--chkfg)) 57%, hsl(var(--chkbg)) 57%)`,
      ':is(.dark) &': {
        'background-image': `
        linear-gradient(90deg, transparent 80%, hsl(var(--chkbg-dark)) 80%), 
        linear-gradient(-90deg, transparent 80%, hsl(var(--chkbg-dark)) 80%), 
        linear-gradient(0deg, hsl(var(--chkbg-dark)) 43%, hsl(var(--chkfg-dark)) 43%, 
        hsl(var(--chkfg-dark)) 57%, hsl(var(--chkbg-dark)) 57%)`,
      },
    },

    ...setupCheckbox('primary', '--p', '--pc'),
    ...setupCheckbox('secondary', '--s', '--sc'),
    ...setupCheckbox('accent', '--a', '--ac'),
    ...setupCheckbox('success', '--su', '--suc'),
    ...setupCheckbox('warning', '--wa', '--wac'),
    ...setupCheckbox('info', '--in', '--inc'),
    ...setupCheckbox('secondary', '--s', '--sc'),
    ...setupCheckbox('error', '--er', '--erc'),

    '&:disabled': {
      '@apply cursor-not-allowed border-transparent': {},
      '@apply bg-base-content/20 dark:bg-base-content-dark/20': {},
    },
  },

  '@keyframes checkmark': {
    '0%': {
      'background-position-y': '5px',
    },
    '50%': {
      'background-position-y': '-2px',
    },
    '100%': {
      'background-position-y': 0,
    },
  },

  '.checkbox-mark': {
    '@apply hidden': {},
  },

  '[dir="rtl"]': {
    '.checkbox': {
      '&:checked, &[checked="true"], &[aria-checked="true"]': {
        'background-image': `
        linear-gradient(45deg, transparent 65%, hsl(var(--chkbg)) 65.99%), 
        linear-gradient(-45deg, transparent 75%, hsl(var(--chkbg)) 75.99%), 
        linear-gradient(45deg, hsl(var(--chkbg)) 40%, transparent 40.99%), 
        linear-gradient(-45deg, hsl(var(--chkbg)) 30%, hsl(var(--chkfg)) 30.99%, 
        hsl(var(--chkfg)) 40%, transparent 40.99%), 
        linear-gradient(45deg, hsl(var(--chkfg)) 50%, hsl(var(--chkbg)) 50.99%)`,

        ':is(.dark) &': {
          'background-image': `
            linear-gradient(45deg, transparent 65%, hsl(var(--chkbg-dark)) 65.99%), 
            linear-gradient(-45deg, transparent 75%, hsl(var(--chkbg-dark)) 75.99%), 
            linear-gradient(45deg, hsl(var(--chkbg-dark)) 40%, transparent 40.99%), 
            linear-gradient(-45deg, hsl(var(--chkbg-dark)) 30%, hsl(var(--chkfg-dark)) 30.99%, 
            hsl(var(--chkfg-dark)) 40%, transparent 40.99%), 
            linear-gradient(45deg, hsl(var(--chkfg-dark)) 50%, hsl(var(--chkbg-dark)) 50.99%)`,
        },
      },
    },
  },
}

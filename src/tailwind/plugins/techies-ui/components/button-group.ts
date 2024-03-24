export const buttonGroup = {
  /* group */
  '.btn-group': {
    '@apply inline-flex': {},
    '& > input[type="radio"].btn': {
      '@apply appearance-none': {},
    },
    '& > input[type="radio"].btn:before': {
      content: 'attr(data-title)',
    },
  },
}

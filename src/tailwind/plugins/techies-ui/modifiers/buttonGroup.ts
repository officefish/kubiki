export const buttonGroup = {
  '.btn-group': {
    '& > input[type="radio"]:checked.btn, & > .btn-active': {
      '@apply border-primary bg-primary text-primary-content': {},
      ':is(.dark) &': {
        '@apply border-primary-dark bg-primary-dark text-primary-content-dark':
          {},
      },
      '&:focus-visible': {
        outline: '2px solid hsl(var(--p))',
        ':is(.dark) &': {
          outline: '2px solid hsl(var(--p-d))',
        },
      },
    },
  },
}

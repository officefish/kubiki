export const radio = {
  '.radio': {
    '@apply shrink-0': {},
  },

  'input[type="radio"]': {
    /* Add if not using autoprefixer */
    '@apply appearance-none': {},
    /* For iOS < 15 to remove gradient background */
    '@apply bg-base-100 dark:bg-base-100-dark': {},
    /* Not removed via appearance */
    margin: 0,
  },
}

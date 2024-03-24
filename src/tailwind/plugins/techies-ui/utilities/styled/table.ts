export const table = {
  '.table-normal': {
    ':where(th, td)': {
      '@apply p-4': {},
      '@apply text-base': {},
    },
  },

  '.table-compact': {
    ':where(th, td)': {
      '@apply p-2 text-sm': {},
    },
  },
}

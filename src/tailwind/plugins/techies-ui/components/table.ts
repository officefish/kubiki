export const table = {
  '.table': {
    position: 'relative',
    'th:first-child': {
      '@apply sticky left-0 z-[11]': {},
      /* because safari */
      position: '-webkit-sticky',
    },
  },
}

export const countdown = {
  ':root .countdown': {
    'line-height': '1em',
  },

  '.countdown': {
    display: 'inline-flex',

    '& > *': {
      height: '1em',
      '@apply inline-block overflow-y-hidden': {},

      '&:before': {
        position: 'relative',
        content:
          '"00A 01A 02A 03A 04A 05A 06A 07A 08A 09A 10A 11A 12A 13A 14A 15A 16A 17A 18A 19A 20A 21A 22A 23A 24A 25A 26A 27A 28A 29A 30A 31A 32A 33A 34A 35A 36A 37A 38A 39A 40A 41A 42A 43A 44A 45A 46A 47A 48A 49A 50A 51A 52A 53A 54A 55A 56A 57A 58A 59A 60A 61A 62A 63A 64A 65A 66A 67A 68A 69A 70A 71A 72A 73A 74A 75A 76A 77A 78A 79A 80A 81A 82A 83A 84A 85A 86A 87A 88A 89A 90A 91A 92A 93A 94A 95A 96A 97A 98A 99A"',
        'white-space': 'pre',
        top: 'calc(var(--value) * -1em)',
      },
    },
  },
}

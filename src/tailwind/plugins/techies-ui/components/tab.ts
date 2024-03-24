export const tab = {
  '.tabs': {
    display: 'flex',
    'flex-wrap': 'wrap',
    '@apply items-end': {},
  },

  '.tab': {
    display: 'inline-flex',
    position: 'relative',
    'text-align': 'center',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
    'align-items': 'center',
    cursor: 'pointer',
    'user-select': 'none',

    'font-size': '0.875rem',
    'line-height': '1.25rem',
    height: '2rem',
    '--tab-padding': '1rem',
  },
}

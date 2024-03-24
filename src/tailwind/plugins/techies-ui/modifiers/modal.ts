export const modal = {
  '.modal': {
    '@apply duration-200 ease-in-out bg-transparent': {},
    'transition-property': 'transform, opacity, visibility',
    'overflow-y': 'hidden',
    'overscroll-behavior': 'contain',
    '&:not(dialog:not(.modal-open)), &::backdrop': {
      'background-color': 'rgba(0, 0, 0, 0.3)',
      animation: 'modal-pop 0.2s ease-out',
    },
  },

  '.modal-backdrop': {
    '@apply grid col-start-1 row-start-1 justify-self-stretch self-stretch -z-[1] text-transparent':
      {},
  },

  '.modal-box': {
    '@apply transform p-6 transition duration-200 ease-in-out rounded-t-box':
      {},
    '@apply bg-base-100 dark:bg-base-100-dark': {},
    '@apply text-base-content dark:text-base-content-dark': {},
    '@apply col-start-1 row-start-1': {},
    '@apply w-11/12 max-w-lg scale-90 rounded-b-box rounded-t-box': {},
    'box-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    'overflow-y': 'auto',
    'overscroll-behavior': 'contain',
  },

  [`.modal-open .modal-box,
  .modal-toggle:checked + .modal .modal-box,
  .modal:target .modal-box,
  .modal[open] .modal-box
  `]: {
    '@apply translate-y-0 scale-100': {},
  },

  '.modal-action': {
    '@apply mt-6 justify-end space-x-2': {},
  },

  '@keyframes modal-pop': {
    '0%': {
      opacity: '0',
    },
  },
}

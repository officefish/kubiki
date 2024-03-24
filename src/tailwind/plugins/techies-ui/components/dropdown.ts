export const dropdown = {
  '.dropdown': {
    '@apply relative inline-block': {},
  },
  '.dropdown > *:focus': {
    '@apply outline-none': {},
  },
  '.dropdown .dropdown-content': {
    '@apply invisible absolute z-50 opacity-0': {},
  },
  '.dropdown-end .dropdown-content': {
    '@apply right-0': {},
  },
  '.dropdown-left .dropdown-content': {
    '@apply top-0 right-full bottom-auto': {},
  },
  '.dropdown-right .dropdown-content': {
    '@apply left-full top-0 bottom-auto': {},
  },
  '.dropdown-bottom .dropdown-content': {
    '@apply bottom-auto top-full': {},
  },
  '.dropdown-top .dropdown-content': {
    '@apply bottom-full top-auto': {},
  },
  '.dropdown-end.dropdown-right .dropdown-content': {
    '@apply bottom-0 top-auto': {},
  },
  '.dropdown-end.dropdown-left .dropdown-content': {
    '@apply bottom-0 top-auto': {},
  },

  [`.dropdown.dropdown-open .dropdown-content,
    .dropdown.dropdown-hover:hover .dropdown-content,
    .dropdown:not(.dropdown-hover):focus .dropdown-content,
    .dropdown:not(.dropdown-hover):focus-within .dropdown-content`]: {
    '@apply visible opacity-100': {},
  },
}

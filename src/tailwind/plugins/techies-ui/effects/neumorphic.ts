export const neumorphic = {
  '.neumorphic': {
    border: 'none',
    background: 'transparent',
    position: 'relative',

    '&:hover:enabled': {
      boxShadow: `-7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001`,
      transition: `all 0.3s ease`,
      textShadow: 'none',
    },

    '&:enabled:after': {
      position: 'absolute',
      content: "''",
      top: 0,
      left: 0,
      zIndex: -1,
      width: '100%',
      height: '100%',
      transform: 'scale(.1)',
      '-webkit-transform': 'scale(.1)',
    },

    '&:disabled': {
      cursor: 'default',
      transition: 'none',
      overflow: 'hidden',
    },

    '&:disabled:after': {
      display: 'block',
      position: 'absolute',
      content: "''",
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      boxShadow: `4px 4px 6px 0 rgba(255,255,255,.5),
                      -4px -4px 6px 0 rgba(116, 125, 136, .2), 
          inset -4px -4px 6px 0 rgba(255,255,255,.5),
          inset 4px 4px 6px 0 rgba(116, 125, 136, .3)`,
      transform: 'scale(1)',
      '-webkit-transform': 'scale(1)',
    },
  },
}

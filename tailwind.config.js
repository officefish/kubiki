const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: {
    files: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/client/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/client/app/**/*.{js,ts,jsx,tsx,mdx}",
    { raw: '' },
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', ...fontFamily.sans],
        'display': ['Oswald', 'sans-serif'],
        'old-english': ['var(--old-english-font)'],
        'roboto-serif': ['var(--roboto-serif-font)', ...fontFamily.serif],
        'philosopher': ['var(--philisopher-font)'],
        'volcorn': ['var(--volcorn-font)'],
        'playfair': ['var(--playfair-display-font)'],
        'overpass': ['var(--overpass-font)'],
        'inter-tight': ['var(--inter-tight-font)'], 
        'rubik-fade': ['var(--rubik-80s-fade-font)'],  
        'rubik-glitch': ['var(--rubik-glitch-font)'],  
        'jetbrains': ['var(--jetbrains-mono-font)'],
        'pt-mono': ['var(--pt-mono-font)']  
      },
    },
  },
  techies: {
    inbuilt: true
  },
  plugins: [
    //require('@tailwindcss/forms'), 
    require('./src/tailwind/plugins/techies-ui'),
  ],
}


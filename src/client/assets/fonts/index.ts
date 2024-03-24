import localFont from 'next/font/local'
import {
  Vollkorn,
  Philosopher,
  Roboto_Serif,
  Playfair_Display,
  Overpass,
  Inter_Tight,
  Rubik_80s_Fade,
  Rubik_Glitch,
  JetBrains_Mono,
  PT_Mono,
} from 'next/font/google'

export const oldEnglish = localFont({
  src: [
    {
      path: './EngraversOldEnglish-Med.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './EngraversOldEnglish-Bd.otf',
      weight: '400',
      style: 'bold',
    },
  ],
  variable: '--old-english-font',
})

export const volcorn = Vollkorn({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
})

export const philosopher = Philosopher({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const robotoSerif = Roboto_Serif({
  subsets: ['latin', 'cyrillic-ext'],
  axes: ['wdth', 'GRAD'],
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

export const overpass = Overpass({
  subsets: ['cyrillic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
})

export const interTight = Inter_Tight({
  subsets: ['cyrillic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
})

export const rubik80sFade = Rubik_80s_Fade({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  style: ['normal'],
})

export const rubikGlitch = Rubik_Glitch({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  style: ['normal'],
})

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['italic', 'normal'],
})

export const ptMono = PT_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  style: ['normal'],
})

import '@client/assets/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from '@client/utilities/layout.types'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

import {
  robotoSerif,
  oldEnglish,
  philosopher,
  volcorn,
  playfairDisplay,
  overpass,
  interTight,
  rubik80sFade,
  rubikGlitch,
  jetBrainsMono,
  ptMono,
} from '@client/assets/fonts'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  //const fonts = [robotoSerif, oldEnglish, philosopher, volcorn]

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <main>
      <style jsx global>{
        `
          :root {
            --roboto-serif-font: ${robotoSerif.style.fontFamily};
            --old-english-font: ${oldEnglish.style.fontFamily};
            --philisopher-font: ${philosopher.style.fontFamily};
            --volcorn-font: ${volcorn.style.fontFamily};
            --playfair-display-font: ${playfairDisplay.style.fontFamily};
            --overpass-font: ${overpass.style.fontFamily};
            --inter-tight-font: ${interTight.style.fontFamily};
            --rubik-80s-fade-font: ${rubik80sFade.style.fontFamily};
            --rubik-glitch-font: ${rubikGlitch.style.fontFamily};
            --jetbrains-mono-font: ${jetBrainsMono.style.fontFamily};
            --pt-mono-font: ${ptMono.style.fontFamily};
          }
        `
        // + `:root,
        // [data-theme] {
        //   background-color: hsla(var(--b1) / var(--tw-bg-opacity, 1));
        //   color: hsla(var(--bc) / var(--tw-text-opacity, 1));
        // }

        // html {
        //   -webkit-tap-highlight-color: transparent;
        // }`
      }</style>
      <Component {...pageProps} />
    </main>,
  )
}

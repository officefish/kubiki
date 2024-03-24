import Color from 'color'
import names, { NamesKeyType } from './names'

interface RGB {
  r: string
  g: string
  b: string
}

const HUE = 0
const SATURATION = 1
const LIGHTNESS = 2

const convert = (value: number) => value.toPrecision(5).replace(/\.?0+$/, '')

const toHSL = (color: string | RGB) => {
  const hsl = Color(color).hsl().array()
  return `${convert(hsl[HUE])} ${convert(hsl[SATURATION])}% ${convert(
    hsl[LIGHTNESS],
  )}% `
}

const toHSLwithMixin = (color: any, mixin: string, percentage: number) => {
  const hsl = color.mix(Color(mixin), percentage).saturate(10).hsl().array()
  return `${convert(hsl[HUE])} ${convert(hsl[SATURATION])}% ${convert(
    hsl[LIGHTNESS],
  )}% `
}

const toDarkenHSL = (color: string | RGB, darken: number) => {
  const hsl = Color(color).darken(darken).hsl().array()
  return `${convert(hsl[HUE])} ${convert(hsl[SATURATION])}% ${convert(
    hsl[LIGHTNESS],
  )}% `
}

const toLightenHSL = (color: string | RGB, lighten: number) => {
  const hsl = Color(color).lighten(lighten).hsl().array()
  return `${convert(hsl[HUE])} ${convert(hsl[SATURATION])}% ${convert(
    hsl[LIGHTNESS],
  )}% `
}

const toNegateHSL = (color: string | RGB) => {
  const hsl = Color(color).negate().hsl().array()
  return `${convert(hsl[HUE])} ${convert(hsl[SATURATION])}% ${convert(
    hsl[LIGHTNESS],
  )}% `
}

const generateForegroundColorFrom = (
  colorCode: string | RGB,
  percentage = 0.8,
) => {
  const color = Color(colorCode)
  return color.isDark()
    ? toHSLwithMixin(color, 'white', percentage)
    : toHSLwithMixin(color, 'black', percentage)
}

const findKey = (rule: string) => {
  return names.hasOwnProperty(rule) ? names[rule as NamesKeyType] : undefined
}

// convert theme colors
const convertEntriesToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  Object.entries(input).forEach(([rule, value]) => {
    const key = findKey(rule)
    if (key !== undefined) {
      result[key] = toHSL(value as string)
    } else {
      result[rule] = value
    }
  })
  return result
}
// auto generate focus colors
const convertDarkToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('primary-dark')) {
    result['--p-d'] = toNegateHSL(input['primary'])
  }
  if (!input.hasOwnProperty('secondary-dark')) {
    result['--s-d'] = toNegateHSL(input['secondary'])
  }
  if (!input.hasOwnProperty('accent-dark')) {
    result['--a-d'] = toNegateHSL(input['accent'])
  }
  if (!input.hasOwnProperty('neutral-dark')) {
    result['--n-d'] = toNegateHSL(input['neutral'])
  }
  return result
}
// auto generate light focus colors
const convertLightFocusToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('primary-focus')) {
    result['--pf'] = toDarkenHSL(input['primary'], 0.2)
  }
  if (!input.hasOwnProperty('secondary-focus')) {
    result['--sf'] = toDarkenHSL(input['secondary'], 0.2)
  }
  if (!input.hasOwnProperty('accent-focus')) {
    result['--af'] = toDarkenHSL(input['accent'], 0.2)
  }
  if (!input.hasOwnProperty('neutral-focus')) {
    result['--nf'] = toDarkenHSL(input['neutral'], 0.2)
  }
  return result
}
// auto generate dark focus colors
const convertDarkFocusToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('primary-focus-dark')) {
    if (input.hasOwnProperty('primary-dark')) {
      result['--pf-d'] = toLightenHSL(input['primary-dark'], 0.2)
    } else {
      result['--pf-d'] = toDarkenHSL(input['primary'], 0.2)
    }
  }
  if (!input.hasOwnProperty('secondary-focus-dark')) {
    if (input.hasOwnProperty('secondary-dark')) {
      result['--sf-d'] = toLightenHSL(input['secondary-dark'], 0.2)
    } else {
      result['--sf-d'] = toDarkenHSL(input['secondary'], 0.2)
    }
  }
  if (!input.hasOwnProperty('accent-focus-dark')) {
    if (input.hasOwnProperty('accent-dark')) {
      result['--af-d'] = toLightenHSL(input['accent-dark'], 0.2)
    } else {
      result['--af-d'] = toDarkenHSL(input['accent'], 0.2)
    }
  }
  if (!input.hasOwnProperty('neutral-focus-dark')) {
    if (input.hasOwnProperty('neutral-dark')) {
      result['--nf-d'] = toLightenHSL(input['neutral-dark'], 0.2)
    } else {
      result['--nf-d'] = toDarkenHSL(input['neutral'], 0.2)
    }
  }
  return result
}
// auto generate light base colors
const convertLightBaseToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('base-100')) {
    result['--b1'] = toHSL('white')
  }
  if (!input.hasOwnProperty('base-200')) {
    result['--b2'] = toDarkenHSL('white', 0.1)
  }
  if (!input.hasOwnProperty('base-300')) {
    result['--b3'] = toDarkenHSL('white', 0.2)
  }
  return result
}
// auto generate base colors
const convertDarkBaseToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('base-100-dark')) {
    result['--b1-d'] = toHSL('black')
  }
  if (!input.hasOwnProperty('base-200-dark')) {
    result['--b2-d'] = toLightenHSL('black', 0.1)
  }
  if (!input.hasOwnProperty('base-300-dark')) {
    result['--b3-d'] = toLightenHSL('black', 0.2)
  }
  return result
}
// auto generate light state colors
const convertLightStateToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('info')) {
    result['--in'] = 198 + ' ' + 93 + '%' + ' ' + 60 + '%'
  }
  if (!input.hasOwnProperty('success')) {
    result['--su'] = 158 + ' ' + 64 + '%' + ' ' + 52 + '%'
  }
  if (!input.hasOwnProperty('warning')) {
    result['--wa'] = 43 + ' ' + 96 + '%' + ' ' + 56 + '%'
  }
  if (!input.hasOwnProperty('error')) {
    result['--er'] = 0 + ' ' + 91 + '%' + ' ' + 71 + '%'
  }
  return result
}
// auto generate dark state colors
const convertDarkStateToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('info-dark')) {
    result['--in-d'] = 198 + ' ' + 93 + '%' + ' ' + 60 + '%'
  }
  if (!input.hasOwnProperty('success-dark')) {
    result['--su-d'] = 158 + ' ' + 64 + '%' + ' ' + 52 + '%'
  }
  if (!input.hasOwnProperty('warning-dark')) {
    result['--wa-d'] = 43 + ' ' + 96 + '%' + ' ' + 56 + '%'
  }
  if (!input.hasOwnProperty('error-dark')) {
    result['--er-d'] = 0 + ' ' + 91 + '%' + ' ' + 71 + '%'
  }
  return result
}
// auto generate content colors
const convertLightContentToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('base-content')) {
    result['--bc'] = generateForegroundColorFrom(input['base-100'])
  }
  if (!input.hasOwnProperty('primary-content')) {
    result['--pc'] = generateForegroundColorFrom(input['primary'])
  }
  if (!input.hasOwnProperty('secondary-content')) {
    result['--sc'] = generateForegroundColorFrom(input['secondary'])
  }
  if (!input.hasOwnProperty('accent-content')) {
    result['--ac'] = generateForegroundColorFrom(input['accent'])
  }
  if (!input.hasOwnProperty('neutral-content')) {
    result['--nc'] = generateForegroundColorFrom(input['neutral'])
  }
  if (!input.hasOwnProperty('info-content')) {
    if (input.hasOwnProperty('info')) {
      result['--inc'] = generateForegroundColorFrom(input['info'])
    } else {
      result['--inc'] = 198 + ' ' + 100 + '%' + ' ' + 12 + '%'
    }
  }
  if (!input.hasOwnProperty('success-content')) {
    if (input.hasOwnProperty('success')) {
      result['--suc'] = generateForegroundColorFrom(input['success'])
    } else {
      result['--suc'] = 158 + ' ' + 100 + '%' + ' ' + 10 + '%'
    }
  }
  if (!input.hasOwnProperty('warning-content')) {
    if (input.hasOwnProperty('warning')) {
      result['--wac'] = generateForegroundColorFrom(input['warning'])
    } else {
      result['--wac'] = 43 + ' ' + 100 + '%' + ' ' + 11 + '%'
    }
  }
  if (!input.hasOwnProperty('error-content')) {
    if (input.hasOwnProperty('error')) {
      result['--erc'] = generateForegroundColorFrom(input['error'])
    } else {
      result['--erc'] = 0 + ' ' + 100 + '%' + ' ' + 14 + '%'
    }
  }
  return result
}
// auto generate content colors
const convertDarkContentToHSL = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('base-content-dark')) {
    result['--bc-d'] = generateForegroundColorFrom(input['base-100-dark'])
  }
  if (!input.hasOwnProperty('primary-content-dark')) {
    result['--pc-d'] = generateForegroundColorFrom(input['primary-dark'])
  }
  if (!input.hasOwnProperty('secondary-content-dark')) {
    result['--sc-d'] = generateForegroundColorFrom(input['secondary-dark'])
  }
  if (!input.hasOwnProperty('accent-content-dark')) {
    result['--ac-d'] = generateForegroundColorFrom(input['accent-dark'])
  }
  if (!input.hasOwnProperty('neutral-content-dark')) {
    result['--nc-d'] = generateForegroundColorFrom(input['neutral-dark'])
  }
  if (!input.hasOwnProperty('info-content-dark')) {
    if (input.hasOwnProperty('info-dark')) {
      result['--inc-d'] = generateForegroundColorFrom(input['info-dark'])
    } else {
      result['--inc-d'] = 198 + ' ' + 100 + '%' + ' ' + 12 + '%'
    }
  }
  if (!input.hasOwnProperty('success-content-dark')) {
    if (input.hasOwnProperty('success-dark')) {
      result['--suc-d'] = generateForegroundColorFrom(input['success-dark'])
    } else {
      result['--suc-d'] = 158 + ' ' + 100 + '%' + ' ' + 10 + '%'
    }
  }
  if (!input.hasOwnProperty('warning-content-dark')) {
    if (input.hasOwnProperty('warning-dark')) {
      result['--wac-d'] = generateForegroundColorFrom(input['warning-dark'])
    } else {
      result['--wac-d'] = 43 + ' ' + 100 + '%' + ' ' + 11 + '%'
    }
  }
  if (!input.hasOwnProperty('error-content-dark')) {
    if (input.hasOwnProperty('error-dark')) {
      result['--erc-d'] = generateForegroundColorFrom(input['error-dark'])
    } else {
      result['--erc-d'] = 0 + ' ' + 100 + '%' + ' ' + 14 + '%'
    }
  }
  return result
}
// auto generate css variables
const generateVariables = (input: any) => {
  const result: { [k: string]: any } = {}
  if (!input.hasOwnProperty('--rounded-box')) {
    result['--rounded-box'] = '1rem'
  }
  if (!input.hasOwnProperty('--rounded-btn')) {
    result['--rounded-btn'] = '0.5rem'
  }
  if (!input.hasOwnProperty('--rounded-badge')) {
    result['--rounded-badge'] = '1.9rem'
  }
  if (!input.hasOwnProperty('--animation-btn')) {
    result['--animation-btn'] = '0.25s'
  }
  if (!input.hasOwnProperty('--animation-input')) {
    result['--animation-input'] = '.2s'
  }
  if (!input.hasOwnProperty('--btn-text-case')) {
    result['--btn-text-case'] = 'uppercase'
  }
  if (!input.hasOwnProperty('--btn-focus-scale')) {
    result['--btn-focus-scale'] = '0.95'
  }
  if (!input.hasOwnProperty('--border-btn')) {
    result['--border-btn'] = '1px'
  }
  if (!input.hasOwnProperty('--tab-border')) {
    result['--tab-border'] = '1px'
  }
  if (!input.hasOwnProperty('--tab-radius')) {
    result['--tab-radius'] = '0.5rem'
  }
  return result
}

const convertToHSL = (input?: any) => {
  if (!input) return {}
  const entries = convertEntriesToHSL(input)
  const dark = convertDarkToHSL(input)
  const lightFocus = convertLightFocusToHSL(input)
  const darkFocus = convertDarkFocusToHSL(input)
  const lightBase = convertLightBaseToHSL(input)
  const darkBase = convertDarkBaseToHSL(input)
  const lightState = convertLightStateToHSL(input)
  const darkState = convertDarkStateToHSL(input)
  const lightContent = convertLightContentToHSL(input)
  const darkContent = convertDarkContentToHSL(input)
  const variables = generateVariables(input)
  return {
    ...entries,
    ...dark,
    ...lightFocus,
    ...darkFocus,
    ...lightBase,
    ...darkBase,
    ...lightState,
    ...darkState,
    ...lightContent,
    ...darkContent,
    ...variables,
  }
}

const getThemeName = (theme: string) => theme.split(/=|]/)[1]

export const injectThemes = (addBase: any, config: any, themes: any) => {
  const hasTechiesConfig =
    config('techies') !== undefined && config('techies.themes') !== undefined

  const useDefaultThemes =
    config('techies') !== undefined && config('techies.inbuilt') === true

  // define exports
  const includedThemes: { [k: string]: any } = {}
  const themeOrder: any[] = []

  // add default themes
  if (!hasTechiesConfig) {
    if (useDefaultThemes) {
      Object.entries(themes).forEach(([theme]) => {
        const themeName = getThemeName(theme)
        includedThemes[theme] = convertToHSL(themes[theme])
        themeOrder.push(themeName)
      })
    } else {
      // or only daisy theme
      const daisy = '[data-theme=daisy]'
      includedThemes[daisy] = convertToHSL(themes[daisy])
      themeOrder.push('daisy')
    }
  }

  // inject themes in order
  themeOrder.forEach((themeName, index) => {
    if (index === 0) {
      // first theme as root
      addBase({
        [':root']: includedThemes['[data-theme=' + themeName + ']'],
      })
    } else {
      addBase({
        ['[data-theme=' + themeName + ']']:
          includedThemes['[data-theme=' + themeName + ']'],
      })
    }
  })

  return { themeOrder, includedThemes }
}

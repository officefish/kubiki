import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import type { UseThemeProps, ThemeProviderProps } from './types'
import {
  getLocalStorageValue,
  getLocalStorageJsonValue,
} from '@client/services/local-storage.service'

const systemColorSchemas = ['light', 'dark']
//const MEDIA = '(prefers-color-scheme: dark)'
const ThemeContext = createContext<UseThemeProps | undefined>(undefined)

const defaultContext: UseThemeProps = {
  theme: '',
  systemTheme: 'light',
  themes: [],
  setTheme: () => {},
  setSystemTheme: () => {},
}

export const useColorSchemas = () => {
  const context = useContext(ThemeContext) ?? defaultContext
  return {
    themes: context?.themes,
    theme: context?.theme,
    setTheme: context?.setTheme,
  }
}

export const useSystemColorSchemas = () => {
  const context = useContext(ThemeContext) ?? defaultContext
  return {
    modes: systemColorSchemas,
    mode: context?.systemTheme,
    setMode: context?.setSystemTheme,
  }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const context = useContext(ThemeContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>
  return <Theme {...props} />
}

const Theme: React.FC<ThemeProviderProps> = ({
  forcedTheme,
  forcedSystemTheme,
  disableTransitionOnChange = false,
  enableColorScheme = true,
  themeStorageKey = 'theme',
  systemThemeStorageKey = 'system-theme',
  availableThemesStorageKey = 'available-themes',
  themes = [],
  defaultTheme = '',
  defaultSystemTheme = 'light',
  systemAttribute = 'class',
  attribute = 'data-theme',
  children,
}) => {
  const [theme, setThemeState] = useState(() =>
    getLocalStorageValue(themeStorageKey, forcedTheme ?? defaultTheme),
  )

  const [systemTheme, setSystemThemeState] = useState(() =>
    getLocalStorageValue(
      systemThemeStorageKey,
      forcedSystemTheme ?? defaultSystemTheme,
    ),
  )
  const [availableThemes, setAvailableThemesState] = useState(() =>
    getLocalStorageJsonValue(availableThemesStorageKey, themes),
  )

  const applySystemTheme = useCallback((newSystemTheme: string | undefined) => {
    const name = newSystemTheme
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (systemAttribute === 'class') {
      d.classList.remove(...systemColorSchemas)
      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }

    if (enableColorScheme) {
      const fallback = systemColorSchemas.includes(defaultSystemTheme)
        ? defaultSystemTheme
        : null
      const colorScheme = systemColorSchemas.includes(systemTheme as string)
        ? systemTheme
        : fallback
      d.style.colorScheme = colorScheme as string
    }
    enable?.()
  }, [])

  const applyTheme = useCallback((newTheme: string | undefined) => {
    const name = newTheme
    const enable = disableTransitionOnChange ? disableAnimation() : null
    const d = document.documentElement

    if (attribute === 'class') {
      d.classList.remove(...themes)
      if (name) d.classList.add(name)
    } else {
      if (name) {
        d.setAttribute(attribute, name)
      } else {
        d.removeAttribute(attribute)
      }
    }

    if (enableColorScheme) {
      const fallback = themes.includes(defaultTheme) ? defaultTheme : ''
      const colorScheme = themes.includes(theme as string) ? theme : fallback
      d.style.colorScheme = colorScheme as string
    }
    enable?.()
  }, [])

  const setSystemTheme = useCallback(
    (newSystemTheme: string) => {
      setSystemThemeState(newSystemTheme)
      // Save to storage
      try {
        localStorage.setItem(systemThemeStorageKey, newSystemTheme)
      } catch (e) {
        // Unsupported
      }
    },
    [forcedSystemTheme],
  )

  const setTheme = useCallback(
    (newTheme: string) => {
      setThemeState(newTheme)
      // Save to storage
      try {
        localStorage.setItem(themeStorageKey, newTheme)
      } catch (e) {
        // Unsupported
      }
    },
    [forcedTheme],
  )

  const setAvailableThemes = useCallback((themes: string[]) => {
    setAvailableThemesState(themes)
    // Save to storage
    try {
      localStorage.setItem(availableThemesStorageKey, JSON.stringify(themes))
    } catch (e) {
      // Unsupported
    }
  }, [])

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === themeStorageKey) {
        const newTheme = e.newValue || defaultTheme
        setTheme(newTheme)
      }
      if (e.key === systemThemeStorageKey) {
        const newSystemTheme = e.newValue || defaultSystemTheme
        setSystemTheme(newSystemTheme)
      }
      if (e.key === availableThemesStorageKey) {
        const themesList = (e.newValue || []) as Array<string>
        setAvailableThemes(themesList)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setTheme, setSystemTheme])

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applySystemTheme(forcedSystemTheme ?? systemTheme)
  }, [forcedSystemTheme, systemTheme])

  useEffect(() => {
    applyTheme(forcedTheme ?? theme)
  }, [forcedTheme, theme])

  useEffect(() => {
    setAvailableThemes(themes)
  }, [themes])

  const providerValue = useMemo(
    () => ({
      theme: theme,
      setTheme,
      forcedTheme,
      themes: availableThemes,
      systemTheme: systemTheme as 'light' | 'dark' | undefined,
      setSystemTheme,
      forcedSystemTheme: forcedSystemTheme as 'light' | 'dark' | undefined,
    }),
    [
      theme,
      setTheme,
      forcedTheme,
      themes,
      systemTheme,
      setSystemTheme,
      forcedSystemTheme,
    ],
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  )
}

const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

// const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
//   if (!e) e = window.matchMedia(MEDIA)
//   const isDark = e.matches
//   const systemTheme = isDark ? 'dark' : 'light'
//   return systemTheme
// }

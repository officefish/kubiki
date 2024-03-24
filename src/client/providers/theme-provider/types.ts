export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[]
  /* forced theme from list of avaliable names */
  forcedTheme?: string
  /** Forced light/dark mode for the current page */
  forcedSystemTheme?: 'light' | 'dark'
  /** Update the theme */
  setTheme: (theme: string) => void
  /** Active theme name */
  theme?: string
  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'light' | 'dark'
  /** Update system theme */
  setSystemTheme: (theme: string) => void
}

export interface ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[]
  /** Forced theme name for the current page */
  forcedTheme?: string
  /** Forced light/dark mode for the current page */
  forcedSystemTheme?: string
  /** Disable all CSS transitions when switching themes */
  disableTransitionOnChange?: boolean
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean
  /** Key used to store theme setting in localStorage */
  themeStorageKey?: string
  /** Key used to store light/dark mode setting in localStorage */
  systemThemeStorageKey?: string
  /** Key used to store all available setting in localStorage */
  availableThemesStorageKey?: string
  /** Default theme name */
  defaultTheme?: string
  /** Default theme name (for v0.0.12 and lower the default was light). */
  defaultSystemTheme?: string
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  systemAttribute?: string | 'class'
  /** Nonce string to pass to the inline script for CSP headers */
  attribute?: string | 'class'
  nonce?: string

  children?: React.ReactNode
}

export interface UseDesignSystemProps {
  /** List of all available pages to redirect */
  pages?: string[]
  /* Set active page */
  setPage: (page: string) => void
  /** Active page name */
  page?: string
  /* default page to redirect */
  defaultPage?: string
}

export interface DesignSystemProviderProps {
  /** List of all available pages to redirect */
  pages?: string[]
  /* default page to redirect */
  defaultPage?: string

  forcedPage?: string
  /** Key used to store selected page in localStorage */
  pageStorageKey?: string
  children?: React.ReactNode
}

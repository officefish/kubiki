import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react'
import { getLocalStorageValue } from '@client/services/local-storage.service'
import { useRouter } from 'next/router'

import { UseDesignSystemProps, DesignSystemProviderProps } from './types'

const DesignSystemContext = createContext<UseDesignSystemProps | undefined>(
  undefined,
)

const defaultContext: UseDesignSystemProps = {
  page: '',
  pages: [],
  setPage: () => {},
}

export const useDesignSystemContext = () => {
  const context = useContext(DesignSystemContext) ?? defaultContext
  return {
    pages: context?.pages,
    page: context?.page,
    setPage: context?.setPage,
  }
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = (
  props,
) => {
  const context = useContext(DesignSystemContext)

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>
  return <DesignSystem {...props} />
}

const DesignSystem: React.FC<DesignSystemProviderProps> = ({
  forcedPage,
  pages,
  defaultPage = 'summary',
  pageStorageKey = 'design-system-current',
  children,
}) => {
  const [activePage, setActivePageState] = useState(() =>
    getLocalStorageValue(pageStorageKey, defaultPage),
  )

  const router = useRouter()

  const applyActivePage = useCallback((pageToRedirect: string) => {
    router.push(pageToRedirect)
  }, [])

  const setActivePage = useCallback((pageToRedirect: string) => {
    setActivePageState(pageToRedirect)
    // Save to storage
    try {
      localStorage.setItem(pageStorageKey, pageToRedirect)
    } catch (e) {
      // Unsupported
    }
  }, [])

  // Whenever activePage change apply it
  useEffect(() => {
    if (activePage) applyActivePage(forcedPage ?? activePage)
  }, [forcedPage, activePage])

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === pageStorageKey) {
        const activePage = e.newValue || defaultPage
        setActivePage(activePage)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [setActivePage])

  const providerValue = useMemo(
    () => ({
      page: activePage,
      setPage: setActivePage,
      pages,
    }),
    [activePage, setActivePage, pages],
  )

  return (
    <DesignSystemContext.Provider value={providerValue}>
      {children}
    </DesignSystemContext.Provider>
  )
}

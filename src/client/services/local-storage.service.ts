const isServer = typeof window === 'undefined'

export const getLocalStorageValue = (key: string, fallback?: string) => {
  if (isServer) return undefined
  let value
  try {
    value = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return value || fallback
}

export const getLocalStorageJsonValue = (key: string, fallback?: string[]) => {
  if (isServer) return undefined
  let value
  try {
    value = JSON.parse(localStorage.getItem(key) as string) || undefined
  } catch (e) {
    // Unsupported
  }
  return value || fallback
}

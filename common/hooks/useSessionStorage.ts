export const useSessionStorage = () => {
  const getItem = (key: string) => {
    if (typeof window !== 'undefined') {
      const value = sessionStorage.getItem(key)

      return value ? JSON.parse(value) : undefined
    }

    return undefined
  }

  const setItem = (key: string, value: unknown) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  const removeItem = (key: string) => {
    sessionStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem,
  }
}

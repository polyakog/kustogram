export const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  const getItem = (key: string) => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : undefined
    } else {
      return undefined
    }
  }
  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }
  return {
    setItem,
    getItem,
    removeItem
  }
}

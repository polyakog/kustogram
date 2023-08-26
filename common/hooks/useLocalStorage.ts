export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  } else {
    return undefined;
  }
};

export const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearAll = () => {
    localStorage.clear();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clearAll
  };
};

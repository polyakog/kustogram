import { useCallback, useRef } from 'react'

export const useDebounce = (callback: () => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        callback(...(args as []))
      }, delay)
    },
    [callback]
  )

  return debouncedCallback
}

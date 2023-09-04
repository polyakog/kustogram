import { useRouter } from 'next/router'

import { getItem } from './useLocalStorage'

export const useAuth = () => {
  const token: string | undefined = getItem('accessToken')
  const { asPath: path } = useRouter()
  const isAvailablePath = () => path.includes('/auth')

  if (!isAvailablePath() && !token) {
    return false
  }

  return true
}

import { adminAuth } from '../constants/Admin/adminSession'

import { useSessionStorage } from './useSessionStorage'

export const useIsAdmin = () => {
  const { getItem } = useSessionStorage()

  const token = getItem(adminAuth.KEY_ADMIN_TOKEN)

  if (token === adminAuth.ADMIN_TOKEN) {
    return true
  }

  return false
}

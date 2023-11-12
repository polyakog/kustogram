import { useSessionStorage } from './useSessionStorage'
import { adminAuth } from '../constants/Admin/adminSession'

export const useIsAdmin = () => {
  const { getItem } = useSessionStorage()

  const token = getItem(adminAuth.KEY_ADMIN_TOKEN)

  if (token === adminAuth.ADMIN_TOKEN) {
    return true
  }

  return false
}

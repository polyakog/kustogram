import { BaseQueryApi } from '@reduxjs/toolkit/dist/query'
import { getItem } from 'common/hooks/useLocalStorage'

export const contentTypeSetup = (
  headers: Headers,
  { endpoint }: Pick<BaseQueryApi, 'endpoint'>,
  UPLOAD_ENDPOINTS: string[]
) => {
  if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
    headers.set('Content-Type', `application/json`)
  }
  const token = getItem('accessToken')

  headers.set('Authorization', `Bearer ${token}`)

  return headers
}

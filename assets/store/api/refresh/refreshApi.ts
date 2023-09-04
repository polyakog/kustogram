import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AccessToken } from './types'

export const refreshApi = createApi({
  reducerPath: 'refreshApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kustogram.site/api/v1/auth/',
    credentials: 'include',
    prepareHeaders: headers => {
      return headers
    },
  }),
  endpoints: builder => ({
    refreshToken: builder.mutation<AccessToken, void>({
      query: () => ({
        url: 'refresh-token',
        method: 'POST',
      }),
    }),
  }),
})

export const { useRefreshTokenMutation } = refreshApi

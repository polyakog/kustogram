import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { NotAuthorization, RefreshTokenResponse } from 'assets/store/api/auth/types'
import { removeItem, setItem } from 'common/hooks/useLocalStorage'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'
import { getBrowserInfo } from 'common/utils/getBrowserInfo'

import { DeleteDeviceRequest, GetAllDevicesResponse, GetDevicesResponse } from './types'

const statusCode = 401

const browserData = getBrowserInfo()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kustogram.site/api/v1/devices',
  credentials: 'include',
  method: 'POST',
  prepareHeaders: (headers, { endpoint }) => contentTypeSetup(headers, { endpoint }, []),
})

const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    const res = result as NotAuthorization

    if (res.error.originalStatus === statusCode) {
      const refreshResult = await baseQuery(
        {
          url: 'https://kustogram.site/api/v1/auth/refresh-token',
          body: browserData,
          method: 'POST',
        },
        api,
        extraOptions
      )

      if (refreshResult.data) {
        const refreshRes = refreshResult as RefreshTokenResponse

        setItem('accessToken', refreshRes.data.accessToken)
        result = await baseQuery(args, api, extraOptions)
      } else {
        const { origin } = window.location

        window.location.replace(`${origin}/auth/login`)
      }
    }
  }

  return result
}

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['deleteDevice', 'deleteAllDevices'],
  endpoints: builder => ({
    getDevices: builder.query<GetAllDevicesResponse, null>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['deleteAllDevices', 'deleteDevice'],
    }),
    getCurrentDevice: builder.query<GetDevicesResponse, void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
      providesTags: ['deleteAllDevices', 'deleteDevice'],
    }),
    deleteAllDevices: builder.mutation<void, void>({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteAllDevices'],
    }),
    deleteDevice: builder.mutation<void, DeleteDeviceRequest>({
      query: body => ({
        url: '/device',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['deleteDevice'],
    }),
  }),
})

export const {
  useGetDevicesQuery,
  useGetCurrentDeviceQuery,
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
} = devicesApi

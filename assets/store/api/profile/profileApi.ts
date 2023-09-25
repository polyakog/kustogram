import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react'
import { setItem } from 'common/hooks/useLocalStorage'
import { contentTypeSetup } from 'common/utils/contentTypeSetup'

import { NotAuthorization, RefreshTokenResponse } from '../auth/types'

import { AuthMeType, SaveProfileInfoType, UserType } from './types'

const statusCode = 401

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://kustogram.site/api/v1/',
    credentials: 'include',
    method: 'POST',
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ['saveAvatar']),
  }),
  {
    maxRetries: 1,
  }
)

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
        'https://kustogram.site/api/v1/auth/refresh-token',
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

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['UserInfo'],
  endpoints: builder => ({
    profile: builder.query<UserType, void>({
      query: () => ({
        url: 'users/profiles/profile',
        method: 'GET',
      }),
      providesTags: ['UserInfo'],
    }),
    saveProfileInfo: builder.mutation<unknown, SaveProfileInfoType>({
      query: (body: UserType) => {
        return {
          method: 'POST',
          url: `users/profiles/save-profileInfo`,
          body,
        }
      },
    }),
    authMe: builder.query<AuthMeType, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'DELETE',
          url: `users/profiles/avatar`,
        }
      },
    }),
    saveAvatar: builder.mutation<void, FormData>({
      query: (body: FormData) => {
        return {
          method: 'POST',
          url: `users/profiles/save-avatar`,
          body,
        }
      },
      // async onQueryStarted(body, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     profileApi.util.updateQueryData('profile', undefined, draft => {
      //       const file = URL.createObjectURL(body.entries().next().value[1])

      //       Object.assign(draft || {}, { photo: file })
      //     })
      //   )

      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: ['UserInfo'],
    }),
  }),
})

export const {
  useLazyProfileQuery,
  useSaveProfileInfoMutation,
  useLazyAuthMeQuery,
  useSaveAvatarMutation,
  useProfileQuery,
  useAuthMeQuery,
  useDeleteAvatarMutation,
} = profileApi

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

import {
  AllPaymentsResponse,
  AllSubscriptionsResponse,
  CurrentSubscription,
  PaypalRequest,
  PaypalResponse,
  StripeRequest,
  StripeResponse,
} from './types'

const statusCode = 401

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://kustogram.site/api/v1/payments',
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

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    stripe: builder.mutation<StripeResponse, StripeRequest>({
      query: body => ({
        url: 'stripe',
        method: 'POST',
        body,
      }),
    }),
    paypal: builder.mutation<PaypalResponse, PaypalRequest>({
      query: body => ({
        url: 'paypal',
        method: 'POST',
        body,
      }),
    }),
    subscriptions: builder.query<AllSubscriptionsResponse, void>({
      query: () => ({
        url: 'subscriptions',
        method: 'GET',
      }),
    }),
    currentSubscription: builder.query<CurrentSubscription, void>({
      query: () => ({
        url: 'current-subscription',
        method: 'GET',
      }),
    }),
    payments: builder.query<AllPaymentsResponse, void>({
      query: () => ({
        url: 'payments',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useStripeMutation,
  usePaymentsQuery,
  usePaypalMutation,
  useCurrentSubscriptionQuery,
  useSubscriptionsQuery,
} = paymentsApi

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { authApi } from './api/auth/authApi'
import { devicesApi } from './api/devices/devicesApi'
import { paymentsApi } from './api/payments/paymentsApi'
import { postsApi } from './api/posts/postsApi'
import { profileApi } from './api/profile/profileApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      postsApi.middleware,
      paymentsApi.middleware,
      devicesApi.middleware
    ),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

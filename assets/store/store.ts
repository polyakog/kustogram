import { configureStore } from '@reduxjs/toolkit'
import { passwordRecoveryApi } from 'assets/api/password_recovery_api'

export const store = configureStore({
    reducer: {
         [passwordRecoveryApi.reducerPath]: passwordRecoveryApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(passwordRecoveryApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
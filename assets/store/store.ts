import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/auth/authApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch)

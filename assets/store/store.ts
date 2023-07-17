import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { profileApi } from "./api/profile/profileApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware)
});

setupListeners(store.dispatch);

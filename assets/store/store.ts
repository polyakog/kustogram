import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { profileApi } from "./api/profile/profileApi";
import { postsApi } from "./api/posts/postsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware, postsApi.middleware)
});

setupListeners(store.dispatch);

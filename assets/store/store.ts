import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { profileApi } from "./api/profile/profileApi";
import { postsApi } from "./api/posts/postsApi";
import { refreshApi } from "./api/refresh/refreshApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [refreshApi.reducerPath]: refreshApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      postsApi.middleware,
      refreshApi.middleware
    )
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

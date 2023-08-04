import { createSlice, PayloadAction, SerializedError, ThunkAction } from "@reduxjs/toolkit";
import { MeType } from "./api/auth/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import type { Session } from "next-auth";

const slice = createSlice({
  name: "app",
  initialState: {
    error: undefined as FetchBaseQueryError | SerializedError | undefined,
    isLoading: false,
    isAppInitialized: false,
    me: null as MeType | null,
    session: undefined as Session | undefined | null
  },

  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setError: (
      state,
      action: PayloadAction<{ error: FetchBaseQueryError | SerializedError | undefined }>
    ) => {
      state.error = action.payload.error;
    },
    setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
      state.isAppInitialized = action.payload.isAppInitialized;
    },
    setUser: (state, action: PayloadAction<{ me: MeType }>) => {
      state.me = action.payload.me;
    },
    setSession: (state, action: PayloadAction<{ session: Session }>) => {
      state.session = action.payload.session;
    }
  }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

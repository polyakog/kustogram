import { createSlice, PayloadAction, SerializedError, ThunkAction } from "@reduxjs/toolkit";
import { MeType } from "./api/auth/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const slice = createSlice({
  name: "app",
  initialState: {
    error: undefined as FetchBaseQueryError | SerializedError | undefined,
    isLoading: false,
    isAppInitialized: false,
    me: null as MeType | null
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
    }
  }

  // extraReducers: (builder) => {
  //   builder
  //   .addCase(fetchUser.pending, (state, action) => {
  //     state.isLoading = true
  //     state.error = null
  //   } )
  //   .addCase(fetchUser.fulfilled, (state, action) => {
  //     state.isLoading = false
  //     state.user=action.payload.user
  //     state.isAppInitialized = action.payload.isAppInitialized
  //   } )
  // }
});

// export const fetchUser = createAppAsyncThunk<{ user: MeType, isAppInitialized: boolean  }, void>(
//   Path.LOGIN,

//       () => {
//         const {data: user} = useMeQuery();

//         return { user: user, isAppInitialized: true };

//       }

// );

export const appReducer = slice.reducer;
export const appActions = slice.actions;

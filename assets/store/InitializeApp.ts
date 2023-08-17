import { appActions } from "./app-reducer";
import { MeType } from "./api/auth/types";
import { batch } from "react-redux";
import { AppDispatch } from "./store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import type { Session } from "next-auth";

export const initializeApp = (
  dispatch: AppDispatch,
  me?: MeType | undefined,
  isLoading?: boolean,
  error?: FetchBaseQueryError | SerializedError | undefined
  // session?: Session | undefined | null
) => {
  switch (true) {
    // case !!session:
    //   batch(() => {
    //     dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
    //     dispatch(appActions.setSession({ session: session! }));
    //   });
    //   break;
    case isLoading:
      batch(() => {
        dispatch(appActions.setIsLoading({ isLoading: true }));
      });
    case !!error:
      batch(() => {
        dispatch(appActions.setError({ error }));
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: false }));
        dispatch(appActions.setIsLoading({ isLoading: false }));
      });
      break;
    default:
      batch(() => {
        dispatch(appActions.setUser({ me: me! }));
        dispatch(appActions.setIsLoading({ isLoading: false }));
        dispatch(appActions.setError({ error: undefined }));
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
      });
      break;
  }
};

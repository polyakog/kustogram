import { appActions } from "./app-reducer";
import { MeType } from "./api/auth/types";
import { batch } from "react-redux";
import { AppDispatch } from "./store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

export const initializeApp = (
  me: MeType | undefined,
  isLoading: boolean,
  error: FetchBaseQueryError | SerializedError | undefined,
  dispatch: AppDispatch
) => {
  switch (true) {
    case isLoading:
      batch(() => {
        dispatch(appActions.setIsLoading({ isLoading: true }));
      });
      break;
    case !!me:
      batch(() => {
        // dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
        dispatch(appActions.setUser({ me: me! }));
        dispatch(appActions.setIsLoading({ isLoading: false }));
      });
    case !error:
      batch(() => {
        dispatch(appActions.setError({ error: undefined }));
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
      });

      break;
    case !!error:
      batch(() => {
        dispatch(appActions.setError({ error: error }));
        dispatch(appActions.setIsAppInitialized({ isAppInitialized: false }));
        dispatch(appActions.setIsLoading({ isLoading: false }));
      });

    default:
      break;
  }
};

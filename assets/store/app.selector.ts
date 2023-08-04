import { RootState } from "./store";

export const isLoadingSelector = (state: RootState) => state.app.isLoading;
export const errorSelector = (state: RootState) => state.app.error;
export const isAppInitializedSelector = (state: RootState) => state.app.isAppInitialized;
export const meSelector = (state: RootState) => state.app.me;
export const getSession = (state: RootState) => state.app.session;

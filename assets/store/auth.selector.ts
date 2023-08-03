import { RootState } from "./store";

export const getAuthQueries = (state: RootState) => state.authApi.queries;

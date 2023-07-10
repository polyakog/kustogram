import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {loadState} from '../../../../common/components/localStorage/localStorage';
import {UserType} from './types';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../../../common/components/localStorage/types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    prepareHeaders: (headers) => {
      const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
      headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', `application/json`)
      return headers
    },
    // fetchFn: async (url) => {
    //
    //   const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    //
    //   const options = {
    //     // method: 'POST',
    //     headers: new Headers({
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //
    //     }),
    //     // body: JSON.stringify(body),
    //   };
    //
    //   const response = await fetch(url, options);
    //
    //   return response
    // },
  }),
  endpoints: (builder) => ({
    profile: builder.query<UserType, void>({
      query: () => ({
        url: "users/profiles/profile",
        method: "GET"
      })
    }),
  })
})

export const { useProfileQuery } = profileApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadState } from "../../../../common/components/localStorage/localStorage";
import { AvatarType, UserType } from "./types";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../../../common/components/localStorage/types";
import { AuthMeType } from "pages/profile/settings";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    prepareHeaders: (headers) => {
      const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", `application/json`);
      return headers;
    }
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
    saveProfileInfo: builder.mutation<any, any>({
      query: (body: UserType) => {
        return {
          method: "POST",
          url: `users/profiles/save-profileInfo`,
          body
        };
      }
    }),
    authMe: builder.query<AuthMeType, void>({
      query: () => ({
        url: "auth/me",
        method: "GET"
      })
    }),
    saveAvatar: builder.mutation<undefined, AvatarType>({
      query: (body: any) => {
        return {
          method: "POST",
          url: `users/profiles/save-avatar`,
          prepareHeaders: (headers: any) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers;
          },
          body: body
        };
      }
    })
  })
});

export const {
  useLazyProfileQuery,
  useSaveProfileInfoMutation,
  useLazyAuthMeQuery,
  useSaveAvatarMutation,
  useProfileQuery,
  useAuthMeQuery
} = profileApi;

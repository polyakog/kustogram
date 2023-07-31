import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthMeType, UserType } from "./types";
import { getItem } from "../../../../common/hooks/useLocalStorage";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    prepareHeaders: (headers, { endpoint }) => {
      const UPLOAD_ENDPOINTS = ["saveAvatar"];
      if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
        headers.set("Content-Type", `application/json`);
      }
      const token = getItem("accessToken");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    profile: builder.query<UserType, void>({
      query: () => ({
        url: "users/profiles/profile",
        method: "GET"
      }),
      providesTags: ["UserInfo"]
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
    saveAvatar: builder.mutation<void, FormData>({
      query: (body: FormData) => {
        return {
          method: "POST",
          url: `users/profiles/save-avatar`,
          body: body
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData("profile", undefined, (draft) => {
            const file = URL.createObjectURL(body.entries().next().value[1]);
            Object.assign(draft ? draft : {}, { photo: file });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["UserInfo"]
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

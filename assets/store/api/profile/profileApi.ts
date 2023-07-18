import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadState } from "../../../../common/components/localStorage/localStorage";
import { AuthMeType, UserType } from "./types";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../../../common/components/localStorage/types";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    prepareHeaders: (headers, { endpoint }) => {
      // условие для создания автоматического заголовка при загрузке аватарки
      const UPLOAD_ENDPOINTS = ["saveAvatar"];
      if (!UPLOAD_ENDPOINTS.includes(endpoint)) {
        headers.set("Content-Type", `application/json`);
      }

      const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
      headers.set("Authorization", `Bearer ${token}`);

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
      async onQueryStarted(
        // 1 параметр: QueryArg - аргументы, которые приходят в query
        body,
        // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData(
            // 1 параметр: endpointName, который мы выполняем после удачного первого запроса (invalidatesTags)
            "profile",
            // 2 параметр: QueryArgFrom - параметры, которые приходят в endpoint выше
            undefined,
            // 3 параметр: Коллбек функция.
            (draft) => {
              const file = URL.createObjectURL(body.entries().next().value[1]); // достаем файл из FormData
              Object.assign(draft, { photo: file });
            }
          )
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
  useSaveAvatarMutation
} = profileApi;

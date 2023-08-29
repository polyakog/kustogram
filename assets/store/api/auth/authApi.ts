import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckLinkType,
  LoginResponseType,
  LoginType,
  MeType,
  NewPasswordResType,
  NewPasswordType,
  RegistrationType,
  SendLinkType
} from "./types";
import { getItem } from "../../../../common/hooks/useLocalStorage";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kustogram.site/api/v1/",
    // baseUrl: process.env.BASE_URL,
    fetchFn: async (url) => {
      const token = getItem("accessToken");
      const options = {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        })
      };
      return await fetch(url, options);
    }
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<any, RegistrationType>({
      query: (body) => ({
        url: "auth/registration",
        method: "POST",
        body
      })
    }),
    login: builder.mutation<LoginResponseType, LoginType>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body
      })
    }),

    loginWithGoogle: builder.mutation<LoginResponseType, { code: string }>({
      query: (body) => ({
        url: "auth/google",
        method: "POST",
        body
      })
    }),
    loginWithGithub: builder.mutation<LoginResponseType, { code: string }>({
      query: (body) => ({
        url: "auth/github",
        method: "POST",
        body
      })
    }),

    sendRecoveryLink: builder.mutation<any, SendLinkType>({
      query: (body) => ({
        method: "POST",
        url: `/auth/password-recovery`,
        body
      })
    }),
    newPassword: builder.mutation<NewPasswordResType, NewPasswordType>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/new-password`,
          body
        };
      }
    }),
    checkLinkHandler: builder.query<any, CheckLinkType>({
      query: (code) => {
        return {
          method: "GET",
          url: `/auth/email-confirmation/${code}`
        };
      }
    }),
    refreshLink: builder.mutation<any, any>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/refresh-link`,
          body
        };
      }
    }),
    me: builder.query<MeType, void>({
      query: () => {
        return {
          method: "GET",
          url: `/auth/me`
        };
      }
    })
  })
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendRecoveryLinkMutation,
  useNewPasswordMutation,
  useLazyCheckLinkHandlerQuery,
  useRefreshLinkMutation,
  useLazyMeQuery,
  useLoginWithGoogleMutation,
  useLoginWithGithubMutation
} = authApi;

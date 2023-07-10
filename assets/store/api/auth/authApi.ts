import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {loadState} from '../../../../common/components/localStorage/localStorage';
import {
  CheckLinkType,
  LoginResponseType,
  LoginType,
  NewPasswordResType,
  NewPasswordType,
  ProfileType,
  RegistrationType,
  SendLinkType
} from "./types";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../../../common/components/localStorage/types";



export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/",
    fetchFn: async (url) => {

      const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

      const options = {
        // method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',

        }),
        // body: JSON.stringify(body),
      };

      const response = await fetch(url, options);

      return response
    },
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
    sendRecoveryLink: builder.mutation<any, SendLinkType>({
      query: (body) => ({
        method: "POST",
        url: `/auth/password-recovery`,
        body
      }),
    }),
    newPassword: builder.mutation<NewPasswordResType, NewPasswordType>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/new-password`,
          body
        };
      },
    }),
    checkLinkHandler: builder.query<any, CheckLinkType>({
      query: (code) => {
        return {
          method: "GET",
          url: `/auth/email-confirmation/${code}`,
        };
      },
    }),
    refreshLink: builder.mutation<any, any>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/refresh-link`,
          body
        };
      },
    }),


    //заглушка!!!!!!!
      setProfile: builder.mutation<undefined, ProfileType>({
        query: (body) => ({
          url: "auth/registration",
          method: "POST",
          body
        })
      }),
    //заглушка!!!!!!!
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      })
    }),
  })
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendRecoveryLinkMutation,
  useNewPasswordMutation,
  useLogoutMutation,
  useSetProfileMutation,
  useLazyCheckLinkHandlerQuery,
  useRefreshLinkMutation
} = authApi

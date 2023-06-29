import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {LoginType, NewPasswordType, RegistrationType, SendLinkType} from "./types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://calypso-one.vercel.app/"}),
  endpoints: (builder) => ({
    registration: builder.mutation<undefined, RegistrationType>({
      query: (body) => ({
        url: "auth/registration",
        method: "POST",
        body
      })
    }),
    login: builder.mutation<undefined, LoginType>({
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
      })
    }),
    newPassword: builder.mutation<any, NewPasswordType>({
      query: (body) => {
        return {
          method: "POST",
          url: `/auth/new-password`,
          body
        };
      },
    }),


  })
})

export const {
  useRegistrationMutation,
  useLoginMutation,
  useSendRecoveryLinkMutation,
  useNewPasswordMutation
} = authApi

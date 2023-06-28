import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {LoginType, RegistrationType} from "./types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://calypso-one.vercel.app/" }),
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

  })
})

export const { useRegistrationMutation,useLoginMutation } = authApi

import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  loginOrEmail: string
  password: string
}
export type SendLinkType = {
  email: string
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string | string[] | undefined
}

export type NewPasswordResType = {
  status: number
  data: {
    errorsMessages: {
      message: string,
      field: string
    } []
  }
}

export type RegistrationResType = {
  data: null
}

export type ErrorRegistrationType = {
       status: number
    data: {
      errorsMessages: {
        message: string,
        field: string
      } []
    }
  }



export type LoginResponseType = {
  accessToken: string
}

export type ProfileType = {
  username: string
  firstname: string
  lastname: string
  birthday: string
  city: string
  aboutMe: string
}

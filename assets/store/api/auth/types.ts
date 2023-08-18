import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  email: string;
  password: string;
};
export type SendLinkType = {
  email: string
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string | string[] | undefined
}
export type CheckLinkType =  string | string[] | undefined


export type NewPasswordResType = {
  status: number
  data: {
    errorsMessages: {
      message: string
      field: string
    }[]
  }
}
export type LoginResponseType = {
  accessToken: string
  profile:boolean
}

export type ProfileType = {
  username: string
  firstname: string
  lastname: string
  birthday: string
  city: string
  aboutMe: string
}

export type RegistrationResponseError = {
  status: number
  data: {
    errorsMessages: ErrorMessagesType[];
  };
};

export type MeType = {
  id: string;
  login: string;
  email: string;
};

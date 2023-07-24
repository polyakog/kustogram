export type RegistrationType = {
  login: string;
  email: string;
  password: string;
};
export type LoginType = {
  loginOrEmail: string;
  password: string;
};
export type SendLinkType = {
  email: string;
};
export type NewPasswordType = {
  newPassword: string;
  recoveryCode: string | string[] | undefined;
};
export type CheckLinkType = string | string[] | undefined;

export type NewPasswordResType = {
  status: number;
  data: {
    errorsMessages: {
      message: string;
      field: string;
    }[];
  };
};
export type LoginResponseType = {
  accessToken: string;
  profile: boolean;
};

type ErrorMessagesType = {
  field: string;
  message: string;
};

export type RegistrationResponseError = {
  status: number;
  data: {
    errorsMessages: ErrorMessagesType[];
  };
};

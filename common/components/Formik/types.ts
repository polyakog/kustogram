import { FormikErrors, FormikState, FormikTouched } from "formik";
import { TFunction } from "next-i18next";
import React, { ChangeEvent } from "react";

type FormikAllValuesType = {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
  email?: string;
  loginOrEmail?: string;
  newPassword?: string;
  recoveryCode?: string;
  firstname?: string;
  lastname?: string;
  birthday?: string;
  city?: string;
  aboutMe?: string;
};

export type labelType = {
  children?: React.ReactNode;
  id?: string;
  type?: string;
  title: string;
  name: keyof FormikAllValuesType;
  border?: string;
  errors: FormikErrors<FormikAllValuesType>;
  touched: FormikTouched<FormikAllValuesType>;
  value: string;
  onChange: (e: string) => void;
  width?: string;
  errorShow?: boolean;
  textAreaData?: string;
  marginBottom?: string;
  t?: TFunction;
};

export type FormValueRegistration = {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
};
export type FormValueLogin = {
  loginOrEmail: string;
  password: string;
};

export type FormValueProfile = {
  username: string;
  firstname: string;
  lastname: string;
  birthday: string;
  city: string;
  aboutMe: string;
};

export type FormValueRecovery = {
  email: string;
};

export type FormNewPasswordType = {
  newPassword: string;
  recoveryCode: string;
};

export type ResetForm = {
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            username: string;
            password: string;
            passwordConfirmation: string;
            email: string;
            loginOrEmail: string;
            newPassword: string;
            recoveryCode: string;
            firstname: string;
            lastname: string;
            birthday: string;
            city: string;
            aboutMe: string;
          }>
        >
      | undefined
  ) => void;
};

export type FiledProps = {
  id?: string;
  type?: string;
  border?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  // onChange: ChangeEvent<HTMLTextAreaElement> | ((value: string) => void);
  width?: string;
  textAreaData?: string;
};

export type SetFieldErrorType = {
  setFieldError: (field: string, message: string | undefined) => void;
};

export type TextAreaPropsType = {
  id?: string;
  type?: string;
  border?: string;
  name?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  width?: string;
  textAreaData?: string;
};

export type StyledErrorMsgPropsType = {
  errorShow?: boolean;
};

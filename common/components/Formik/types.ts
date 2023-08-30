import React, { ChangeEvent } from 'react'

import { FormikErrors, FormikState, FormikTouched } from 'formik'
import { TFunction } from 'next-i18next'

export type FormikAllValuesType = {
  aboutMe?: string
  birthday?: string
  city?: string
  email?: string
  firstname?: string
  lastname?: string
  loginOrEmail?: string
  newPassword?: string
  password?: string
  passwordConfirmation?: string
  recoveryCode?: string
  username?: string
}

export type labelType = {
  border?: string
  children?: React.ReactNode
  errorShow?: boolean
  errors: FormikErrors<FormikAllValuesType>
  id?: string
  margin?: string
  name: keyof FormikAllValuesType
  onChange: (e: string) => void
  t?: TFunction
  textAreaData?: string
  title: string
  touched: FormikTouched<FormikAllValuesType>
  type?: string
  value: string
  width?: string
}

export type FormValueRegistration = {
  email: string
  password: string
  passwordConfirmation: string
  username: string
}
export type FormValueLogin = {
  loginOrEmail: string
  password: string
}

export type FormValueProfile = {
  aboutMe: string
  birthday: string
  city: string
  firstname: string
  lastname: string
  username: string
}

export type FormValueRecovery = {
  email: string
}

export type FormNewPasswordType = {
  newPassword: string
  recoveryCode: string
}

export type ResetForm = {
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            aboutMe: string
            birthday: string
            city: string
            email: string
            firstname: string
            lastname: string
            loginOrEmail: string
            newPassword: string
            password: string
            passwordConfirmation: string
            recoveryCode: string
            username: string
          }>
        >
      | undefined
  ) => void
}

export type FiledProps = {
  border?: string
  id?: string
  name?: string
  onChange: (value: string) => void
  textAreaData?: string
  type?: string
  value: string
  // onChange: ChangeEvent<HTMLTextAreaElement> | ((value: string) => void);
  width?: string
}

export type SetFieldErrorType = {
  setFieldError: (field: string, message: string | undefined) => void
}

export type TextAreaPropsType = {
  border?: string
  id?: string
  name?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  textAreaData?: string
  type?: string
  value?: string
  width?: string
}

export type StyledErrorMsgPropsType = {
  errorShow?: boolean
}

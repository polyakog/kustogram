/* eslint-disable no-magic-numbers */
import * as Yup from 'yup'

export const validateLogin = Yup.object().shape({
  loginOrEmail: Yup.string().required('req_login').email('invalid_email'),
  password: Yup.string().min(6, 'short_pas').max(20, 'long_pas').required('req_pas'),
})

export const validateAdminLogin = Yup.object().shape({
  loginOrEmail: Yup.string().required('required Field').email('invalid email'),
  password: Yup.string()
    .min(1, 'short password')
    .max(20, 'login password')
    .required('password required'),
})

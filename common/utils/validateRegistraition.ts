/* eslint-disable no-magic-numbers */
import * as Yup from 'yup'

export const validateRegistration = Yup.object().shape({
  username: Yup.string()
    .min(6, 'too_short')
    .max(30, 'too_long')
    .required('req_user')
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, 'inv_user'),
  password: Yup.string()
    .matches(/^\S*$/, 'spaces cannot be used')
    .min(6, 'short_pas')
    .max(20, 'long_pas')
    .required('req_pas'),
  email: Yup.string().email('invalid_email').required('req_email'),
  passwordConfirmation: Yup.string()
    .matches(/^\S*$/, 'spaces cannot be used')
    .required('req_pas')
    .oneOf([Yup.ref('password')], 'pas_match')
    .min(6, 'short_pas')
    .max(20, 'long_pas'),
})

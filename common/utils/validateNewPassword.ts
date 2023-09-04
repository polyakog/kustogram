/* eslint-disable no-magic-numbers */
import * as Yup from 'yup'

export const validateNewPassword = Yup.object().shape({
  newPassword: Yup.string().min(6, 'short_pas').max(20, 'long_pas').required('req'),
  passwordConfirmation: Yup.string()
    .required('req')
    .oneOf([Yup.ref('newPassword')], 'pas_match'),
})

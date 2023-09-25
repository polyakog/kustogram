/* eslint-disable no-magic-numbers */
import dayjs from 'dayjs'
import * as Yup from 'yup'

const twoHundredYearsAgo = dayjs().subtract(200, 'year')
const nowDate = dayjs()

export const validateProfile = Yup.object().shape({
  username: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required username')
    .matches(/^[a-zA-Z](.[a-zA-Z0-9_-]*)$/, 'invalid username'),
  firstname: Yup.string().max(20, 'Too Long!').required('Required firstname'),
  lastname: Yup.string().max(20, 'Too Long!').required('Required lastname'),
  birthday: Yup.date()
    .typeError('Invalid type of date')
    .max(nowDate, 'Date should not be greate than today')
    .min(twoHundredYearsAgo, 'You are too old!')
    .required('Required birthday'),
  city: Yup.string().max(20, 'Too Long!').required('Required city'),
  aboutMe: Yup.string().max(200, 'Too Long!'),
})

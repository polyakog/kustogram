import Calendar, { CalendarProps } from 'common/components/Calendar/Calendar'
import { StyledErrorMsg } from 'common/components/Formik/Formik.styled'
import { Field } from 'formik'

const ProfileCalendar = ({ setFieldValue, date, errors, touched, t }: CalendarProps) => {
  return (
    <>
      <Field
        component={Calendar}
        date={date}
        errors={errors}
        name="birthday"
        setFieldValue={setFieldValue}
        t={t}
        touched={touched}
      />
      {!!errors && touched && <StyledErrorMsg>{t ? t(`${errors}`) : errors}</StyledErrorMsg>}
    </>
  )
}

export default ProfileCalendar

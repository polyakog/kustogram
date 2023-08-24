import Calendar, { CalendarProps } from "common/components/Calendar/Calendar";
import { StyledErrorMsg } from "common/components/Formik/Formik.styled";
import { Field } from "formik";

const ProfileCalendar = ({ setFieldValue, date, errors, touched, t }: CalendarProps) => {
  return (
    <>
      <Field
        name="birthday"
        component={Calendar}
        setFieldValue={setFieldValue}
        date={date}
        errors={errors}
        touched={touched}
        t={t}
      />
      {!!errors && touched && <StyledErrorMsg>{errors}</StyledErrorMsg>}
    </>
  );
};

export default ProfileCalendar;

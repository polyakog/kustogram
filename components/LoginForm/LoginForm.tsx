import React, {FC} from 'react';
import {Form, FormikProps} from "formik";
import {LoginType} from "@/types/FormikTypes";
import {useShow} from "../../assets/hooks/useShow";


type LoginFormPropsType = {
  formik: FormikProps<LoginType>;
}
const LoginForm: FC<LoginFormPropsType> = ({formik}) => {
  const { show, onButtonIconClick } = useShow();

  return (
    <Form>

    </Form>
  );
};

export default LoginForm;
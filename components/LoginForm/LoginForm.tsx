import React, {FC} from 'react';
import {Form, FormikProps} from "formik";
import {LoginType} from "@/types/FormikTypes";
import {useShow} from "../../assets/hooks/useShow";
import {StyledErrorMsg, StyledField, StyledForm, StyledSignIn, StyledText} from "../../styles/styles";
import {Button, ThemeButton} from "../Button/ui/Button";


type LoginFormPropsType = {
  formik: FormikProps<LoginType>;
}
const LoginForm: FC<LoginFormPropsType> = ({formik}) => {
  const { show, onButtonIconClick } = useShow();

  const { isValid, dirty, isSubmitting, handleChange, values } = { ...formik };
  return (
    <Form>


      <StyledForm>
        <label>
          Username
          <StyledField
            name="username"
            // border={errors.username?.length ? "red" : "white"}
          />

        </label>
      </StyledForm>
      {/*<PasswordForm*/}
      {/*  showPass={show}*/}
      {/*  name="password"*/}
      {/*  label="Password"*/}
      {/*  onIconClick={onButtonIconClick}*/}
      {/*/>*/}
      <StyledSignIn href="/registration">Forgot Password</StyledSignIn>
      {/*<Button*/}
      {/*  disabled={!isValid || !dirty || isSubmitting}*/}
      {/*  className={styles.loginButton}*/}
      {/*  type="submit"*/}
      {/*  variant="contained"*/}
      {/*  color="primary"*/}
      {/*>*/}
      {/*  Sign in*/}
      {/*</Button>*/}
      {/*<Button theme={ThemeButton.PRIMARY}>Log In</Button>*/}
      <StyledText>Don’t have an account?</StyledText>
      <StyledSignIn href="/registration">Sign up</StyledSignIn>
    </Form>
  );
};

export default LoginForm;
import React from 'react';
import {Formik} from "formik";

import showPasswordBtn from "../../../public/icons/eye-outline.svg";
import hidePasswordBtn from "../../../public/icons/eye-off-outline.svg";

import {useRouter} from "next/router";
import {useLoginMutation} from "../../../assets/store/api/auth/authApi";
import {saveState} from "../../../common/components/localStorage/localStorage";
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from "../../../common/components/localStorage/types";
import {FormValueLogin, ResetForm, SetFieldErrorType} from "../../../common/components/Formik/types";
import {
  StyledContainerAuth,
  StyledForgotLink,
  StyledLinkBlock
} from "../../../styles/styledComponents/auth/Auth.styled";
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth";
import {
  StyledAuthForm,
  StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper, StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import AuthIcons from "../../../features/auth/AuthIcons";
import {useShowPassword} from "../../../common/hooks/useShowPassword";
import {validateLogin} from "../../../common/utils/validateLogin";
import {FormikLabel} from "../../../common/components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../../common/components/Button/Button";
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout";


const Login = () => {

  const route = useRouter()
  const {
    passwordType,
    showPassword,
  } =
    useShowPassword()

  const initialAuthValues = {
    password: "",
    loginOrEmail: ""
  }

  const [loginHandler, {data}] = useLoginMutation()

  if (data) {
    saveState(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken)
    data.profile ? route.push('/profile'):route.push('/profile/settings')
  }


  const handleSubmit = async (
    values: FormValueLogin,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    }
    try {
      await loginHandler(data)
        .unwrap()
        .then(() => resetForm())
        .catch(() =>
          setFieldError(
            "password",
            "Password or email - incorrect. Try again"
          )
        )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Sing In"}>
        <AuthIcons/>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateLogin}
          onSubmit={handleSubmit}
        >
          {({errors, touched, values, setFieldValue}) => (
            <StyledAuthForm>
              <FormikLabel
                name="loginOrEmail"
                onChange={(e) => setFieldValue("loginOrEmail", e)}
                value={values.loginOrEmail}
                type={"text"}
                title={"login or Email"}
                border={errors.loginOrEmail?.length && touched.loginOrEmail ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <FormikLabel
                id="pass"
                name="password"
                onChange={(e) => setFieldValue("password", e)}
                value={values.password}
                type={passwordType}
                title={"Password"}
                border={errors.password?.length && touched.password ? "red" : "white"}
                errors={errors}
                touched={touched}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
              </FormikLabel>
              <StyledLinkBlock>
                <StyledForgotLink href="/recovery">Forgot Password</StyledForgotLink>
              </StyledLinkBlock>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Sign in
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Don’t have an account?</StyledText>
          <StyledSignIn href="/registration">Sign up</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Login.getLayout = getLayout
export default Login;


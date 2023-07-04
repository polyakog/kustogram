import React from 'react';
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {Button, ThemeButton} from "../../components/Button/Button";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {Formik} from "formik";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";
import {
  StyledAuthForm,
  StyledContainerAuth,
  StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper, StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled";
import {useShowPassword} from "../../assets/hooks/useShowPassword";
import {useLoginMutation} from "../../store/api/auth/authApi";
import {FormValueLogin, ResetForm} from "../../components/Formik/types";
import {FormikLabel} from "../../components/Formik/FormikLabel";
import showPasswordBtn from "../../public/icons/eye-outline.svg";
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg";
import {validateLogin} from "../../utils/validateLogin";
import styled from 'styled-components';
import Link from 'next/link';
import {baseTheme} from '../../styles/styledComponents/theme';
import {loadState, saveState} from '../../components/localStorage/localStorage';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from '../../components/localStorage/types';
import {useRouter} from "next/router";


const Login = () => {
  const route = useRouter()
  const token = loadState(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  const profile = false

  console.log('token profile', token, profile)

  const {
    passwordType,
    showPassword,
  } =
    useShowPassword()

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [loginHandler, {data}] = useLoginMutation()
  if (data) {
    saveState(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken)
  }

  const handleSubmit = async (values: FormValueLogin, {resetForm}: ResetForm) => {

    const data = {
      loginOrEmail: values.loginOrEmail,
      password: values.password,
    }
    try {
      const res = await loginHandler(data)
      console.log('LOGIN', res)
      alert('Шалунишка!!! Авторизуйся!!!! Сделать проверку на вход и переход по профилю ')

      //   route.push('/login')
      // } else {
      resetForm()
        !profile ? route.push('/profile/settings')
          : route.push('/profile')
      // }

    }
catch
  (error)
  {
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

const StyledForgotLink = styled(Link)
  `
    color: ${baseTheme.colors.light[900]};
    font-weight: 400;
    font-size: 14px;
    font-family: Arial;
    line-height: 24px;
  `
export const StyledLinkBlock = styled.div
  `
    width: 100%;
    text-align: right;
    padding-bottom: 24px;
  `

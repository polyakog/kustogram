import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {
  StyledErrorMsg,
  StyledForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "styles/styles"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "assets/hooks/useShowPassword"
import {SignupSchema} from "../../utils/validateRegistraition";
import FormikLabel from "../../components/Formik/FormikLabel";
import {FormikField} from "../../components/Formik/FormikField";
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons";
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {StyledContainerAuth} from "../login";
import {Button, ThemeButton} from "../../components/Button/ui/Button";

export default function Registration() {
  const {passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation} =
    useShowPassword()

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Sing In'}>
        <AuthIcons/>
        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
            email: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, {resetForm}) => {
            const data = {
              email: values.email,
              password: values.password,
              login: values.username
            }

            try {
              await fetch("https://calypso-one.vercel.app/auth/registration", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(() => console.log("otpravleno"))
              resetForm()
            } catch {
              console.log("err")
            }
          }}
        >
          {({errors, touched}) => (
            <StyledForm>
              <FormikLabel>
                Username
                <FormikField
                  name="username"
                  border={errors.username?.length && touched.username ? "red" : "white"}
                />
                {errors.username && touched.username ? (
                  <StyledErrorMsg>{errors.username}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <FormikLabel id="pass">
                Password
                <FormikField
                  name="password"
                  type={passwordType}
                  border={errors.password?.length && touched.password ? "red" : "white"}
                />
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
                {errors.password && touched.password ? (
                  <StyledErrorMsg>{errors.password}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <FormikLabel id="pass">
                Password confirmation
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
                <FormikField
                  name="passwordConfirmation"
                  type={passwordConfirmationType}
                  border={
                    errors.passwordConfirmation?.length && touched.passwordConfirmation
                      ? "red"
                      : "white"
                  }
                />
                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <FormikLabel>
                Email
                <FormikField
                  name="email"
                  type="email"
                  border={errors.email?.length && touched.email ? "red" : "white"}
                />
                {errors.email && touched.email ? (
                  <StyledErrorMsg>{errors.email}</StyledErrorMsg>
                ) : null}
              </FormikLabel>
              <Button theme={ThemeButton.PRIMARY} type="submit">Sign Up</Button>
            </StyledForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Don’t have an account?</StyledText>
          <StyledSignIn href="/login">Sign up</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout

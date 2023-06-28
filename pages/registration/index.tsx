import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "assets/hooks/useShowPassword"
import {validateRegistration} from "../../utils/validateRegistraition"
import AuthIcons from "../../components/Wrappers/Auth/AuthIcons"
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth"
import {Button, ThemeButton} from "../../components/Button/Button"
import {FormikLabel} from "../../components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledContainerAuth, StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import {useRegistrationMutation} from "store/api/auth/authApi"
import {FormValueRegistration, ResetForm} from "components/Formik/types"

export default function Registration() {
  const {
    passwordType,
    passwordConfirmationType,
    showPassword,
    showPasswordConfirmation
  } =
    useShowPassword()

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [registrationHandler] = useRegistrationMutation()


  const handleSubmit = async (values: FormValueRegistration, {resetForm}: ResetForm) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username
    }
    try {
      await registrationHandler(data)
      resetForm()
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
          validationSchema={validateRegistration}
          onSubmit={handleSubmit}
        >
          {({
              errors,
              touched,
              values,
              setFieldValue
            }) => (
            <StyledAuthForm>
              <FormikLabel
                name="username"
                onChange={(e) => setFieldValue("username", e)}
                value={values.username}
                type={"text"}
                title={"Username"}
                border={errors.username?.length && touched.username ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <FormikLabel
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
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
              <FormikLabel
                id="pass"
                name="passwordConfirmation"
                onChange={(e) => setFieldValue("passwordConfirmation", e)}
                value={values.passwordConfirmation}
                type={passwordConfirmationType}
                title={"Password confirmation"}
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? "red"
                    : "white"
                }
                errors={errors}
                touched={touched}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
              </FormikLabel>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Sign up
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>Don’t have an account?</StyledText>
          <StyledSignIn href="/login">Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout

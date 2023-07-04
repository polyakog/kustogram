import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../../public/icons/eye-off-outline.svg"
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "../../../common/hooks/useShowPassword"
import {validateRegistration} from "../../../common/utils/validateRegistraition"
import AuthIcons from "../../../features/auth/AuthIcons"
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth"
import {Button, ThemeButton} from "../../../common/components/Button/Button"
import {FormikLabel} from "../../../common/components/Formik/FormikLabel"
import {useRegistrationMutation} from "../../../assets/store/api/auth/authApi";
import {FormValueRegistration, ResetForm, SetFieldErrorType} from "../../../common/components/Formik/types";
import {RegistrationResponseError} from "../../../assets/store/api/auth/types";
import {StyledContainerAuth} from "../../../styles/styledComponents/auth/Auth.styled";
import {
  StyledAuthForm,
  StyledShowPasswordBtn, StyledSignIn,
  StyledSignInWrapper, StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";


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

  const handleSubmit = async (
    values: FormValueRegistration,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username
    }
    try {
      await registrationHandler(data)
        .unwrap()
        .then(() => resetForm())
    } catch (error) {
      const err = error as RegistrationResponseError
      if ("data" in err) {
        const messages = err.data
        if (messages.errorsMessages.length > 1) {
          setFieldError("username", "User with this username is already registered")
          setFieldError("email", "User with this email is already registered")
        } else {
          if (messages.errorsMessages[0].field === "email") {
            setFieldError("username", "")
            setFieldError("email", "User with this email is already registered")
          } else {
            setFieldError("username", "User with this username is already registered")
            setFieldError("email", "")
          }
        }
      }
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Sing Up"}>
        <AuthIcons />
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRegistration}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
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
          <StyledText>Do you have an account?</StyledText>
          <StyledSignIn href="/auth/login">Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout

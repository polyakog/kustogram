import React from "react"
import {Formik} from "formik"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth"
import {Button, ThemeButton} from "../../components/Button/Button"
import {FormikLabel} from "../../components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledContainerAuth,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import {useSendRecoveryLinkMutation} from "../../store/api/auth/authApi"
import {FormValueRecovery, ResetForm} from "../../components/Formik/types"
import {validateRecovery} from "../../utils/validateRecovery";

export default function Registration() {

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: ""
  }

  const [recoveryHandler] = useSendRecoveryLinkMutation()


  const handleSubmit = async (values: FormValueRecovery, {resetForm}: ResetForm) => {
    const data = {
      email: values.email,
    }
    try {
      await recoveryHandler(data)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Forgot Password"}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRecovery}
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
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
                errors={errors}
                touched={touched}
              />
              <StyledSignInWrapper>
                <StyledText>Enter your email address and we will send you further instructions
                </StyledText>
              </StyledSignInWrapper>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Send Link
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledSignIn href="/login">Back to Sign in</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Registration.getLayout = getLayout

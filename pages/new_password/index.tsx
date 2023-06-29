import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "../../assets/hooks/useShowPassword"
import {WrapperContainerAuth} from "../../components/Wrappers/Auth/WrapperContainerAuth";
import {useNewPasswordMutation} from "../../store/api/auth/authApi";
import {FormNewPasswordType, ResetForm} from "../../components/Formik/types";
import {
  StyledAuthForm,
  StyledContainerAuth,
  StyledShowPasswordBtn, StyledSignInWrapper, StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled";
import {FormikLabel} from "../../components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../components/Button/Button";
import {validateNewPassword} from "../../utils/validateNewPassword";

export default function NewPassword() {

  const initialAuthValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    loginOrEmail: "",
    newPassword: "",
    recoveryCode: "",
  }

  const [newPasswordHandler] = useNewPasswordMutation()

  let recoveryCode = "gddj5"
  const handleSubmit = async (values: FormNewPasswordType, {resetForm}: ResetForm) => {
    const data = {
      newPassword: values.newPassword,
      recoveryCode: recoveryCode
    }
    try {
      await newPasswordHandler(data)
      resetForm()
    } catch (error) {
      console.log(error)
    }
  }


  const {
    passwordType,
    passwordConfirmationType,
    showPassword,
    showPasswordConfirmation
  } =
    useShowPassword()

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={'Create New Password'}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateNewPassword}
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
                id="pass"
                name="newPassword"
                onChange={(e) => setFieldValue("newPassword", e)}
                value={values.newPassword}
                type={passwordType}
                title={"New password"}
                border={errors.newPassword?.length && touched.newPassword ? "red" : "white"}
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
              <StyledSignInWrapper>
                <StyledText>Your password must be between 6 and 20 characters</StyledText>
              </StyledSignInWrapper>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Create new password
              </Button>
            </StyledAuthForm>
          )}
        </Formik>

      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

NewPassword.getLayout = getLayout
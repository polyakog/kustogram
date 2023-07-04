import React, { useEffect, useState } from "react"
import { Formik } from "formik"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import { WrapperContainerAuth } from "../../components/Wrappers/Auth/WrapperContainerAuth"
import { Button, ThemeButton } from "../../components/Button/Button"
import { FormikLabel } from "../../components/Formik/FormikLabel"
import {
  StyledAuthForm,
  StyledContainerAuth,
  StyledRecoveryWrapper,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../styles/styledComponents/auth/FormikAuth.styled"
import { useSendRecoveryLinkMutation } from "../../store/api/auth/authApi"
import { FormValueRecovery, ResetForm } from "../../components/Formik/types"
import { validateRecovery } from "../../utils/validateRecovery"
import { EmailSentModal } from "components/PopUpModal/EmailSentModal"
import { baseTheme } from "styles/styledComponents/theme"
import Image from "next/image"

// ///                                           ///   //
// страница восстановления пароля. Пользователь вводит email
// отправляется запрос на сервер, отображается сообщение
// об отправке ссылки на почту
// ///                                           ///   //

export default function Recovery() {
  const initialAuthValues = {
    // username: "",
    // password: "",
    // passwordConfirmation: "",
    email: ""
    // loginOrEmail: ""
  }

  const [isMessageSent, setIsMessageSent] = useState(false) // отправлено ли сообщение
  const [email, setEmail] = useState("") // введенный email
  const [isModalOpen, setIsModalOpen] = useState(false) // открыто ли модальное окно

  const [recoveryHandler, result] = useSendRecoveryLinkMutation()

  console.log('result', result)
  // Обработчик нажатия кнопки подтверждения в форме
  useEffect(() => {
    if (result.isSuccess) {
      setIsModalOpen(true)
      setIsMessageSent(true)
    }
  }, [result])
  const handleSubmit = async (values: FormValueRecovery, { resetForm }: ResetForm) => {
    const data = {
      email: values.email
    }
    try {
      recoveryHandler(data)
      resetForm()
      setEmail(values.email)
    } catch (error) {
      console.log(error)
    }
  }

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={"Forgot Password"}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateRecovery}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm errorShow={true}>
              <FormikLabel
                name="email"
                onChange={(e) => setFieldValue("email", e)}
                value={values.email}
                type={"email"}
                title={"email"}
                border={errors.email?.length && touched.email ? "red" : "white"}
                errors={errors}
                touched={touched}
                errorShow={true}
              />
              <StyledRecoveryWrapper>
                <StyledText color={baseTheme.colors.light[950]}>
                  Enter your email address and we will send you further instructions
                </StyledText>
                {isMessageSent && (
                  <StyledText>We have sent a link to confirm your email to {email}</StyledText>
                )}
              </StyledRecoveryWrapper>

              <Button width="100%" theme={ThemeButton.PRIMARY} type="submit">
                {isMessageSent ? "Send Link Again" : "Send Link"}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledSignIn href="/login">Back to Sign in</StyledSignIn>
        </StyledSignInWrapper>
        <Image priority alt="Captcha" width={260} height={60} src="/captcha.png" />
      </WrapperContainerAuth>
      {isModalOpen && (
        <EmailSentModal
          title="Email Sent"
          bodyText={`We have sent a link to confirm your email to ${email}`}
          handleModalClose={handleModalClose}
        ></EmailSentModal>
      )}
    </StyledContainerAuth>
  )
}

Recovery.getLayout = getLayout

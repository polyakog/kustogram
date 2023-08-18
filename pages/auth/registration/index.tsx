import React, {useState} from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../../public/img/icons/eye-outline.svg"
import hidePasswordBtn from "../../../public/img/icons/eye-off-outline.svg"
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "../../../common/hooks/useShowPassword"
import {validateRegistrationEn, validateRegistrationRu} from "../../../common/utils/validateRegistraition"
import AuthIcons from "../../../features/auth/AuthIcons"
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth"
import {Button} from "../../../common/components/Button/Button"
import {FormikLabel} from "../../../common/components/Formik/FormikLabel"
import {useRegistrationMutation} from "../../../assets/store/api/auth/authApi";
import {FormValueRegistration, ResetForm, SetFieldErrorType} from "../../../common/components/Formik/types";
import {RegistrationResponseError} from "../../../assets/store/api/auth/types";
import {StyledContainerAuth} from "../../../styles/styledComponents/auth/Auth.styled";
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "../../../next-i18next.config.js";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Path } from "../../../common/enums/path";
import { ThemeButton } from "../../../common/enums/themeButton";
import { useLocalStorage } from "../../../common/hooks/useLocalStorage";
import styled from "styled-components";
import { registrationErrorHandler } from "common/utils/registrationErrorHandler";
import { Modal } from "../../../common/components/Modals/ModalPublic/Modal";

export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

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
  const [email, setEmail] = useState("")
  const [isModalActive, setIsModalActive] = useState(false)
  const router = useRouter()
  const {t, i18n} = useTranslation()

  const handleModalClose = () => {
    setIsModalActive(false)
    router.push(Path.LOGIN)
  }

  const handleSubmit = async (
    values: FormValueRegistration,
    {resetForm, setFieldError}: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username
    }
    try {
      await registrationHandler(data)
        .unwrap()
        .then(() => {
          setEmail(data.email)
          localStorage.setItem('email', data.email)
          resetForm()
          setIsModalActive(true)
        })
    } catch (error) {
      const err = error as RegistrationResponseError
      if ("data" in err) {
        const messages = err.data
        if (messages.errorsMessages.length > 1) {
          setFieldError("username", t("user_err"))
          setFieldError("email", t("email_err"))
        } else {
          if (messages.errorsMessages[0].field === "email") {
            setFieldError("username", "")
            setFieldError("email", t("email_err"))
          } else {
            setFieldError("username", t("user_err"))
            setFieldError("email", "")
          }
        }
      }
    }
  }

  return (
    <>
      {isModalActive && (
        <Modal
          title="Email sent"
          bodyText={`We have sent a link to confirm your email to ${email}`}
          handleModalClose={handleModalClose}
        />
      )}
      <StyledContainerAuth style={{filter: isModalActive ? "blur(4px)" : ""}}>
        <WrapperContainerAuth title={t("sign_up")}>
          <AuthIcons/>
          <Formik
            initialValues={initialAuthValues}
            validationSchema={i18n.language == 'en' ? validateRegistrationEn : validateRegistrationRu}
            onSubmit={handleSubmit}
          >
            {({errors, touched, values, setFieldValue}) => (
              <StyledAuthForm>
                <FormikLabel
                  name="username"
                  onChange={(e) => setFieldValue("username", e)}
                  value={values.username}
                  type={"text"}
                  title={t("username")}
                  border={errors.username?.length && touched.username ? "red" : "white"}
                  errors={errors}
                  touched={touched}
                />
                <FormikLabel
                  name="email"
                  onChange={(e) => setFieldValue("email", e)}
                  value={values.email}
                  type={"email"}
                  title={"Email"}
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
                  title={t("password")}
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
                  title={t("password_conf_label")}
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
                  {t("sign_up")}
                </Button>
              </StyledAuthForm>
            )}
          </Formik>
          <StyledSignInWrapper>
            <StyledText>{t("have_account")}</StyledText>
            <StyledSignIn href={Path.LOGIN}>{t("sign_in")}</StyledSignIn>
          </StyledSignInWrapper>
        </WrapperContainerAuth>
      </StyledContainerAuth>
    </>
  )
}

Registration.getLayout = getLayout

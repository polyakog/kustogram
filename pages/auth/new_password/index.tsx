import React from "react"
import {Formik} from "formik"
import showPasswordBtn from "../../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../../public/icons/eye-off-outline.svg"
import {getLayout} from "../../../common/components/Layout/BaseLayout/BaseLayout"
import {useShowPassword} from "../../../common/hooks/useShowPassword"
import {WrapperContainerAuth} from "../../../features/auth/WrapperContainerAuth";
import {useNewPasswordMutation} from "../../../assets/store/api/auth/authApi";
import {FormNewPasswordType, ResetForm} from "../../../common/components/Formik/types";
import {
  StyledAuthForm,
  StyledShowPasswordBtn, StyledSignInWrapper, StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import {FormikLabel} from "../../../common/components/Formik/FormikLabel";
import {Button, ThemeButton} from "../../../common/components/Button/Button";
import {validateNewPassword} from "../../../common/utils/validateNewPassword";
import {useRouter} from "next/router"
//translate import
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from '../../../next-i18next.config.js'
import {useTranslation} from 'next-i18next'
import {StyledContainerAuth} from "../../../styles/styledComponents/auth/Auth.styled";

// ///                                           ///   //
// страница введения нового пароля. Пользователь вводит данные,
// отправляется запрос на сервер вместе с кодом восстановления, полученным на почту
// Success - переключение на страницу логина, fail - на страницу повторной отправки сообщения
// ///                                           ///   //

// getStaticProps Определения языка, указанного в url
export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

export default function NewPassword() {

  const initialAuthValues = {
    // username: "",
    // password: "",
    passwordConfirmation: "",
    // email: "",
    // loginOrEmail: "",
    newPassword: "",
    recoveryCode: "",
  }

  const [newPasswordHandler, {error}] = useNewPasswordMutation()

  const {t} = useTranslation()    // функция перевода на выбранный язык
  const router = useRouter()
  const {code} = router.query       // получение кода восстановления для сервера

  // Обработчик нажатия кнопки подтверждения в форме  
  const handleSubmit = async (values: FormNewPasswordType, {resetForm}: ResetForm) => {
    const data = {
      newPassword: values.newPassword,
      recoveryCode: code
    }
    try {
      await newPasswordHandler(data)
      resetForm()
    } catch (error) {
      router.push('/recovery')
    }
  }

  // хук открытия и скрытия пароля
  const {
    passwordType, passwordConfirmationType,
    showPassword, showPasswordConfirmation
  } = useShowPassword()

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t("n_password_title")}>
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
                title={t("password_lable")}
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
                title={t("password_conf_lable")}
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
                <StyledText>{t("info")}</StyledText>
              </StyledSignInWrapper>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {t("n_password_btn")}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>

      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

NewPassword.getLayout = getLayout
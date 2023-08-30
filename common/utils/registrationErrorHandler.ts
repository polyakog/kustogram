import { RegistrationResponseError } from 'assets/store/api/auth/types'
import { SetFieldErrorType } from 'common/components/Formik/types'
import { TFunction } from 'i18next'

export const registrationErrorHandler = (
  error: RegistrationResponseError,
  t: TFunction<'translation', undefined>,
  { setFieldError }: SetFieldErrorType
): void => {
  if ('data' in error) {
    const messages = error.data.errorsMessages

    messages.forEach(({ message, field }) => {
      let tMessage = ''

      switch (message) {
        case 'Invalid email':
          tMessage = t('invalid_email')
          break
        case 'User with this email is already registered':
          tMessage = t('email_err')
          break
        case 'User with this username is already registered':
          tMessage = t('user_err')
          break
        default:
          tMessage = t('some_err')
      }
      setFieldError(field, tMessage)
    })

    // if (messages.length > 1) {
    //   setFieldError("username", t("user_err"));
    //   messages[1].message === "Invalid email"
    //     ? setFieldError("email", t("invalid_email"))
    //     : setFieldError("email", t("email_err"));
    // } else {
    //   if (messages[0].field === "email") {
    //     if (messages[0].message === "Invalid email") {
    //       setFieldError("email", t("invalid_email"));
    //     } else {
    //       setFieldError("email", t("email_err"));
    //     }
    //     setFieldError("username", "");
    //   } else {
    //     setFieldError("username", t("user_err"));
    //     setFieldError("email", "");
    //   }
    // }
  }
}

import { RegistrationResponseError } from 'assets/store/api/auth/types'
import { Formik } from 'formik'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { baseTheme } from 'styles/styledComponents/theme'

import { useNewPasswordMutation } from '../../../assets/store/api/auth/authApi'
import { Button } from '../../../common/components/Button/Button'
import { FormikLabel } from '../../../common/components/Formik/FormikLabel'
import { FormNewPasswordType, ResetForm } from '../../../common/components/Formik/types'
import { getLayout } from '../../../common/components/Layout/BaseLayout/BaseLayout'
import { Path } from '../../../common/enums/path'
import { ThemeButton } from '../../../common/enums/themeButton'
import { useShowPassword } from '../../../common/hooks/useShowPassword'
import { validateNewPassword } from '../../../common/utils/validateNewPassword'
import { WrapperContainerAuth } from '../../../features/auth/WrapperContainerAuth'
import hidePasswordBtn from '../../../public/img/icons/eye-off-outline.svg'
import showPasswordBtn from '../../../public/img/icons/eye-outline.svg'
import { StyledContainerAuth } from '../../../styles/styledComponents/auth/Auth.styled'
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignInWrapper,
  StyledText,
} from '../../../styles/styledComponents/auth/FormikAuth.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const NewPassword = () => {
  const initialAuthValues = {
    passwordConfirmation: '',
    newPassword: '',
    recoveryCode: '',
  }

  const [newPasswordHandler] = useNewPasswordMutation()

  const { t } = useTranslation()
  const router = useRouter()
  const { code } = router.query

  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword()

  const handleSubmit = async (values: FormNewPasswordType, { resetForm }: ResetForm) => {
    const data = {
      newPassword: values.newPassword,
      recoveryCode: code,
    }

    try {
      await newPasswordHandler(data)
        .unwrap()
        .then(() => {
          resetForm()
          router.push(Path.LOGIN)
        })
    } catch (error) {
      const err = error as RegistrationResponseError

      if ('data' in err) {
        await router.push(Path.NEW_PASSWORD_ERROR)
      }
    }
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t('n_password_title')}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateNewPassword}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm>
              <FormikLabel
                border={errors.newPassword?.length && touched.newPassword ? 'red' : 'white'}
                errors={errors}
                id="pass"
                name="newPassword"
                t={t}
                title={t('n_password_label')}
                touched={touched}
                type={passwordType}
                value={values.newPassword}
                onChange={e => setFieldValue('newPassword', e)}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === 'password' ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
              </FormikLabel>
              <FormikLabel
                errors={errors}
                id="pass"
                name="passwordConfirmation"
                t={t}
                title={t('password_conf_label')}
                touched={touched}
                type={passwordConfirmationType}
                value={values.passwordConfirmation}
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? 'red'
                    : 'white'
                }
                onChange={e => setFieldValue('passwordConfirmation', e)}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === 'password' ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
              </FormikLabel>
              <StyledSignInWrapper margin="0 0 29px 0">
                <StyledText
                  color={baseTheme.colors.light[900]}
                  fontSize="14px"
                  textAlign="left"
                  width="auto"
                >
                  {t('info')}
                </StyledText>
              </StyledSignInWrapper>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {t('n_password_btn')}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

export default NewPassword

NewPassword.getLayout = getLayout

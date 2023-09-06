import { useState } from 'react'

import { useRegistrationMutation } from 'assets/store/api/auth/authApi'
import { RegistrationResponseError } from 'assets/store/api/auth/types'
import { Button } from 'common/components/Button/Button'
import { FormikLabel } from 'common/components/Formik/FormikLabel'
import { FormValueRegistration, ResetForm, SetFieldErrorType } from 'common/components/Formik/types'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import { Path } from 'common/enums/path'
import { ThemeButton } from 'common/enums/themeButton'
import { useLocalStorage } from 'common/hooks/useLocalStorage'
import { useShowPassword } from 'common/hooks/useShowPassword'
import { registrationErrorHandler } from 'common/utils/registrationErrorHandler'
import { validateRegistration } from 'common/utils/validateRegistraition'
import AuthIcons from 'features/auth/AuthIcons'
import { ProvidersPropsType } from 'features/auth/types'
import { WrapperContainerAuth } from 'features/auth/WrapperContainerAuth'
import { Formik } from 'formik'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import hidePasswordBtn from 'public/img/icons/eye-off-outline.svg'
import showPasswordBtn from 'public/img/icons/eye-outline.svg'
import styled from 'styled-components'
import { StyledContainerAuth } from 'styles/styledComponents/auth/Auth.styled'
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText,
} from 'styles/styledComponents/auth/FormikAuth.styled'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context

  return {
    props: {
      provider: {
        google: {
          AUTH_URL: process.env.GOOGLE_AUTH_URL,
          SCOPE: process.env.GOOGLE_SCOPE,
          REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
          ID: process.env.GOOGLE_ID,
        },
        github: {
          AUTH_URL: process.env.GITHUB_AUTH_URL,
          SCOPE: process.env.GITHUB_SCOPE,
          REDIRECT_URI: process.env.GITHUB_REDIRECT_URI,
          ID: process.env.GITHUB_ID,
        },
      },
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const Registration = (props: ProvidersPropsType) => {
  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword()

  const { provider } = props

  const initialAuthValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
  }

  const [registrationHandler] = useRegistrationMutation()
  const [isModalActive, setIsModalActive] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()
  const { setItem, getItem } = useLocalStorage()

  const handleModalClose = () => {
    setIsModalActive(false)
    router.push(Path.LOGIN)
  }

  const handleSubmit = async (
    values: FormValueRegistration,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      email: values.email,
      password: values.password,
      login: values.username,
    }

    try {
      await registrationHandler(data)
        .unwrap()
        .then(() => {
          setItem('email', data.email)
          resetForm()
          setIsModalActive(true)
        })
    } catch (error: unknown) {
      registrationErrorHandler(error as RegistrationResponseError, t, { setFieldError })
    }
  }

  return (
    <>
      {isModalActive && (
        <Modal
          bodyText={`We have sent a link to confirm your email to ${getItem('email')}`}
          handleModalClose={handleModalClose}
          title="Email sent"
        >
          <Button theme={ThemeButton.PRIMARY} width="96px" onClick={handleModalClose}>
            OK
          </Button>
        </Modal>
      )}
      <StyledContainerAuth style={{ filter: isModalActive ? 'blur(4px)' : 'blur(0px)' }}>
        <WrapperContainerAuth title={t('sign_up')}>
          <AuthIcons provider={provider} />
          <Formik
            initialValues={initialAuthValues}
            validationSchema={validateRegistration}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <StyledAuthForm>
                <FormikLabel
                  border={errors.username?.length && touched.username ? 'red' : 'white'}
                  errors={errors}
                  name="username"
                  t={t}
                  title={t('username')}
                  touched={touched}
                  type="text"
                  value={values.username}
                  onChange={e => setFieldValue('username', e)}
                />
                <FormikLabel
                  border={errors.email?.length && touched.email ? 'red' : 'white'}
                  errors={errors}
                  name="email"
                  t={t}
                  title="Email"
                  touched={touched}
                  type="email"
                  value={values.email}
                  onChange={e => setFieldValue('email', e)}
                />
                <FormikLabel
                  border={errors.password?.length && touched.password ? 'red' : 'white'}
                  errors={errors}
                  id="pass"
                  name="password"
                  t={t}
                  title={t('password')}
                  touched={touched}
                  type={passwordType}
                  value={values.password}
                  onChange={e => setFieldValue('password', e)}
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
                    src={
                      passwordConfirmationType === 'password' ? showPasswordBtn : hidePasswordBtn
                    }
                    onClick={() => showPasswordConfirmation()}
                  />
                </FormikLabel>
                <StyledButton theme={ThemeButton.PRIMARY} type="submit">
                  {t('sign_up')}
                </StyledButton>
              </StyledAuthForm>
            )}
          </Formik>
          <StyledSignInWrapper>
            <StyledText>{t('have_account')}</StyledText>
            <StyledSignIn href={Path.LOGIN}>{t('sign_in')}</StyledSignIn>
          </StyledSignInWrapper>
        </WrapperContainerAuth>
      </StyledContainerAuth>
    </>
  )
}

const StyledButton = styled(Button)`
  margin-top: 20px;
`

export default Registration

Registration.getLayout = getLayout

import { useEffect } from 'react'

import { useLazyMeQuery, useLoginMutation } from 'assets/store/api/auth/authApi' // ?
import { LoginResponseType } from 'assets/store/api/auth/types'
import { Button } from 'common/components/Button/Button'
import { FormikLabel } from 'common/components/Formik/FormikLabel'
import { FormValueLogin, ResetForm, SetFieldErrorType } from 'common/components/Formik/types'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { Path } from 'common/enums/path'
import { ThemeButton } from 'common/enums/themeButton'
import { useLocalStorage } from 'common/hooks/useLocalStorage'
import { useShowPassword } from 'common/hooks/useShowPassword'
import { validateLogin } from 'common/utils/validateLogin'
import AuthIcons from 'features/auth/AuthIcons'
import { ProvidersPropsType } from 'features/auth/types'
import { WrapperContainerAuth } from 'features/auth/WrapperContainerAuth'
import { Formik } from 'formik'
import { GetStaticPropsContext } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import hidePasswordBtn from 'public/img/icons/eye-off-outline.svg'
import showPasswordBtn from 'public/img/icons/eye-outline.svg'
import {
  StyledContainerAuth,
  StyledForgotLink,
  StyledLinkBlock,
} from 'styles/styledComponents/auth/Auth.styled'
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText,
} from 'styles/styledComponents/auth/FormikAuth.styled'
import { LoadingStyle } from 'styles/styledComponents/profile/profile.styled'

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
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const Login = (props: ProvidersPropsType) => {
  const { provider } = props
  /*   ________Инициализация_____________ */ // ?

  const [getInitialize, { data: me, isLoading, error }] = useLazyMeQuery()

  /*   ________/Инициализация_____________ */ // ?

  const { t } = useTranslation()
  const route = useRouter()
  const { passwordType, showPassword } = useShowPassword()

  const { removeItem, setItem } = useLocalStorage()
  // const { data: session, status } = useSession();
  // const status = "unauthenticated";
  // const session = "";

  const initialAuthValues = {
    password: '',
    loginOrEmail: '',
  }

  const [loginHandler, { data: loginRes }] = useLoginMutation()

  redirect(loginRes, setItem, route)

  const handleSubmit = async (
    values: FormValueLogin,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      email: values.loginOrEmail,
      password: values.password,
    }

    try {
      await loginHandler(data)
        .unwrap()
        /// / eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then(res => {
          removeItem('email')
          setItem('userEmail', data.email)
          resetForm()
          getInitialize()
        })
        .catch(() => setFieldError('password', t('log_in_err')))
    } catch (err) {
      console.log('LoginError:', err)
    }
  }

  useEffect(() => {
    getInitialize()
  }, [])

  useEffect(() => {
    redirect(loginRes, setItem, route)
  }, [me, isLoading, error, loginRes])

  if (isLoading) return <div style={LoadingStyle}>Loading...</div>

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t('signIn_title')}>
        <AuthIcons provider={provider} />
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm>
              <FormikLabel
                border={errors.loginOrEmail?.length && touched.loginOrEmail ? 'red' : 'white'}
                errors={errors}
                name="loginOrEmail"
                t={t}
                title={t('email_label')}
                touched={touched}
                type="text"
                value={values.loginOrEmail}
                onChange={e => setFieldValue('loginOrEmail', e)}
              />
              <FormikLabel
                border={errors.password?.length && touched.password ? 'red' : 'white'}
                errors={errors}
                id="pass"
                margin="48px"
                name="password"
                t={t}
                title={t('password_label')}
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
              <StyledLinkBlock>
                <StyledForgotLink href="/auth/recovery">
                  {t('forgotPassword_link')}
                </StyledForgotLink>
              </StyledLinkBlock>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {t('signIn_title')}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
        <StyledSignInWrapper>
          <StyledText>{t('notAccount_title')}</StyledText>
          <StyledSignIn href={Path.REGISTRATION}>{t('signUp_link')}</StyledSignIn>
        </StyledSignInWrapper>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  )
}

Login.getLayout = getLayout
export default Login

export const redirect = (
  loginRes: LoginResponseType | undefined,
  setItem: (key: string, value: string) => void,
  route: NextRouter
) => {
  if (loginRes) {
    setItem('accessToken', loginRes.accessToken)
    loginRes.profile
      ? route.push(Path.PROFILE)
      : route.push(`${Path.PROFILE_SETTINGS}?profile=${loginRes.profile}`)
  }
}

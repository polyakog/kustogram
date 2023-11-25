import { ThemeButton } from 'common/enums/themeButton'
import { useSessionStorage } from 'common/hooks/useSessionStorage'
import { useShowPassword } from 'common/hooks/useShowPassword'
import { validateAdminLogin } from 'common/utils/validateLogin'
import { WrapperContainerAuth } from 'features/auth/WrapperContainerAuth'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import hidePasswordBtn from 'public/img/icons/eye-off-outline.svg'
import showPasswordBtn from 'public/img/icons/eye-outline.svg'
import styled from 'styled-components'
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
} from 'styles/styledComponents/auth/FormikAuth.styled'

import { adminAuth } from '../../constants/Admin/adminSession'
import { Button } from '../Button/Button'
import { FormikLabel } from '../Formik/FormikLabel'
import { FormValueLogin, SetFieldErrorType } from '../Formik/types'

export const AdminLogin = () => {
  const { setItem } = useSessionStorage()
  const { reload } = useRouter()
  const { passwordType, showPassword } = useShowPassword()

  const initialAuthValues = {
    password: '',
    loginOrEmail: '',
  }

  const handleSubmit = (values: FormValueLogin, { setFieldError }: SetFieldErrorType) => {
    if (
      values.loginOrEmail === process.env.NEXT_PUBLIC_AUTH_ADMIN_LOGIN &&
      values.password === process.env.NEXT_PUBLIC_AUTH_ADMIN_PASSWORD
    ) {
      setItem(adminAuth.KEY_ADMIN_TOKEN, adminAuth.ADMIN_TOKEN)
      reload()
    } else {
      setFieldError('password', 'invalid email or password')
      setFieldError('loginOrEmail', 'invalid email or password')
    }
  }

  return (
    <Container>
      <WrapperContainerAuth title="Sign In Admin">
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateAdminLogin}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm>
              <FormikLabel
                border={errors.loginOrEmail?.length && touched.loginOrEmail ? 'red' : 'white'}
                errors={errors}
                name="loginOrEmail"
                title="Email"
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
                title="Password"
                touched={touched}
                type={passwordType}
                value={values.password}
                onChange={e => setFieldValue('password', e)}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === 'password' ? showPasswordBtn : hidePasswordBtn}
                  onClick={showPassword}
                />
              </FormikLabel>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                Sign In
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
      </WrapperContainerAuth>
    </Container>
  )
}

export const Container = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

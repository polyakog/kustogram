import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import { getLayout } from '../common/components/Layout/BaseLayout/BaseLayout'
import { Path } from '../common/enums/path'
import kusto from '../public/img/kusto.png'
import { baseTheme } from '../styles/styledComponents/theme'

import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => (
  <StyledBlockMainWrapper>
    <Image alt="Logo" height={180} src={kusto} width={180} priority />
    <StyledBlockMain>
      <p>
        <Link href={Path.LOGIN}>Login</Link>
      </p>
      <p>
        <Link href={Path.REGISTRATION}>registration</Link>
      </p>
      <p>
        <Link href={Path.FORGOT_PASSWORD}>recovery</Link>
      </p>
      <p>
        <Link href={Path.PROFILE}>profile</Link>
      </p>
      <p>
        <Link href={Path.PROFILE_SETTINGS}>profile/settings</Link>
      </p>
      <p>
        <Link href={Path.NEW_PASSWORD}>auth/new_password</Link>
      </p>
      <p>
        <Link href={Path.REGISTRATION_SUCCESS}>registration/success</Link>
      </p>
      <p>
        <Link href={Path.REGISTRATION_ERROR}>Registration_error</Link>
      </p>
      <p>
        <Link href={Path.NEW_PASSWORD_ERROR}>Password_error</Link>
      </p>
      <p>
        <Link href={Path.ERROR_404}>Page_ERROR_404_</Link>
      </p>
      <p>
        <Link href={Path.ADMIN}>Admin</Link>
      </p>
    </StyledBlockMain>
  </StyledBlockMainWrapper>
)

Home.getLayout = getLayout
export default Home

const StyledBlockMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & a {
    color: ${baseTheme.colors.light[100]};
    text-decoration: none;
  }
`
const StyledBlockMainWrapper = styled.div`
  padding: 60px;
`

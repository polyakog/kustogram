// import { ProvidersPropsType } from 'features/auth/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import github from '../../public/img/icons/github-svgrepo-com.svg'
import google from '../../public/img/icons/google-svgrepo-com.svg'
// import { baseTheme } from '../../styles/styledComponents/theme'

import { oauthRequest } from './oauth2Request'
import { ProvidersPropsType } from './types'

const AuthIcons = (provider: ProvidersPropsType) => {
  // const { push } = useRouter()
  const router = useRouter()

  const handle = (providerName: string) => {
    const url = oauthRequest(providerName, provider)

    router.push(url)
  }

  return (
    <StyledIconBlock>
      <Image
        alt="google"
        height={36}
        src={google}
        width={36}
        onClick={() => {
          handle('google')
        }}
      />
      <Image
        alt="github"
        height={36}
        src={github}
        width={36}
        onClick={() => {
          handle('github')
        }}
      />

      {/* <Message>SignIn with Google or Github</Message> */}
    </StyledIconBlock>
  )
}

export default AuthIcons

const StyledIconBlock = styled.div`
  position: relative;
  max-width: 132px;
  width: 100%;
  margin: 10px 50px 20px 50px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 60px;

  &:hover div {
    display: block;
    text-align: center;
  }
  & img {
    cursor: pointer;
  }
`
// const SigninStyle = styled.div`
//   cursor: pointer;
// `

// const Link = styled.a`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// `

// const Message = styled.div`
//   position: absolute;
//   top: -90px;
//   left: 16px;
//   display: none;
//   color: ${baseTheme.colors.warning[100]};
//   background: ${baseTheme.colors.dark[300]};
//   opacity: 0.9;
//   padding: 10px;
//   border-radius: 2px;
//   font-family: Inter;
// `

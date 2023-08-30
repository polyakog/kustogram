import { Button } from 'common/components/Button/Button'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { ThemeButton } from 'common/enums/themeButton'
import { oauthRequest } from 'features/auth/oauth2Request'
import { ProvidersPropsType } from 'features/auth/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import github from 'public/img/icons/github-svgrepo-com.svg'
import google from 'public/img/icons/google-svgrepo-com.svg'
import {
  BlockButton,
  SigninWrapper,
  buttonStyle,
  spanStyle,
} from 'styles/styledComponents/auth/signin.styled'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

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

const Signin = (props: ProvidersPropsType) => {
  // const route = useRouter()
  const { t } = useTranslation()

  const handle = (providerName: string) => {
    const url = oauthRequest(providerName, props)

    console.log(url)
    window.location.assign(url)
  }
  const buttonData = [
    { name: 'google', src: google, text: 'Google' },
    { name: 'github', src: github, text: 'GitHub' },
  ]

  return (
    <SigninWrapper>
      <BlockButton>
        {buttonData.map((provider, i) => {
          return (
            <Button
              key={i}
              style={buttonStyle}
              theme={ThemeButton.SECONDARY}
              type="button"
              width="300"
              onClick={() => {
                handle(provider.name)
              }}
            >
              <Image alt="google" height={24} src={provider.src} width={24} />
              <span style={spanStyle}>{`${t('signin')} ${provider.text}`}</span>
            </Button>
          )
        })}
      </BlockButton>
    </SigninWrapper>
  )
}

Signin.getLayout = getLayout
export default Signin

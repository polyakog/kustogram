import { useState } from 'react'

import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { Oauth } from 'common/components/Oauth/Oauth'
import { useOAuthCode } from 'common/hooks/useOAuthCode'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

import { ErrorType } from '../google'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const GithubRedirect = () => {
  const [connectionError, setConnectionError] = useState<ErrorType>()
  const [accountError, setAccountError] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const provider = { isGoogle: false, isGithub: true }

  useOAuthCode({ provider, setConnectionError, setAccountError, setStatus })

  return (
    <div>
      <Oauth
        accountError={accountError}
        connectionError={connectionError}
        provider={provider}
        status={status}
      />
    </div>
  )
}

GithubRedirect.getLayout = getLayout
export default GithubRedirect

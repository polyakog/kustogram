import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { useOAuthCode } from 'common/hooks/useOAuthCode'
import { useState } from 'react'
import { Oauth } from 'common/components/Oauth/Oauth'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

export type ErrorType = {
  data: { errorsMessages: Array<{ message: string }> }
  status: number | null
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const GoogleRedirect = () => {
  const [connectionError, setConnectionError] = useState<ErrorType | undefined>()
  const [accountError, setAccountError] = useState<string | undefined>('')
  const [status, setStatus] = useState<string>('')
  const provider = { isGoogle: true, isGithub: false }

  useOAuthCode({ provider, setConnectionError, setAccountError, setStatus })

  return (
    <div>
      <Oauth
        connectionError={connectionError}
        accountError={accountError}
        status={status}
        provider={provider}
      />
    </div>
  )
}

GoogleRedirect.getLayout = getLayout
export default GoogleRedirect

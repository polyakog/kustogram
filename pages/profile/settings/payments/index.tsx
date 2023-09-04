import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'

import { getLayout } from '../../../../common/components/Layout/PageLayout/PageLayout'
import { SettingsPageWrapper } from '../../../../features/settings/SettingsPageWrapper'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}
const Payments = () => {
  const { t } = useTranslation()

  return <SettingsPageWrapper>payments</SettingsPageWrapper>
}

Payments.getLayout = getLayout
export default Payments

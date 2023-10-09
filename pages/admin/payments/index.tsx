import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const Payments = () => {
  return <h1>posts</h1>
}

export default Payments
Payments.getLayout = getLayout

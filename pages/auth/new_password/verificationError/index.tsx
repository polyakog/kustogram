import VerificationWindow from 'features/auth/VerificationWindow'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

import { getLayout } from '../../../../common/components/Layout/BaseLayout/BaseLayout'
import { Path } from '../../../../common/enums/path'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const Verification = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleClick = () => {
    router.push(Path.FORGOT_PASSWORD)
  }

  return (
    <VerificationWindow
      btnTitle={t('resend_btn_recov')}
      handleClick={handleClick}
      text={t('link_exp_text')}
      title={t('link_exp_title_recov')}
    />
  )
}

Verification.getLayout = getLayout

export default Verification

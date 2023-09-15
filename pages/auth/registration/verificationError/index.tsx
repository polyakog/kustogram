import { useState } from 'react'

import { useRefreshLinkMutation } from 'assets/store/api/auth/authApi'
import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import { useLocalStorage } from 'common/hooks/useLocalStorage'
import VerificationWindow from 'features/auth/VerificationWindow'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
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

const Verification = () => {
  const [isModalActive, setIsModalActive] = useState(false)
  const { getItem } = useLocalStorage()

  const { t } = useTranslation()

  const data = { email: getItem('email') }

  const [refreshLinkHandler] = useRefreshLinkMutation()

  const handleClick = () => {
    refreshLinkHandler(data)
      .unwrap()
      .then(() => {
        setIsModalActive(true)
      })
  }

  const handleModalClose = () => {
    setIsModalActive(false)
  }

  return (
    <>
      {' '}
      {isModalActive && (
        <Modal
          bodyText={`We have sent a refresh link your email to ${getItem('email')}`}
          handleModalClose={handleModalClose}
          title="Refresh link"
        />
      )}
      <VerificationWindow
        btnTitle={t('resend_btn')}
        handleClick={handleClick}
        text={t('link_exp_text')}
        title={t('link_exp_title')}
      />
    </>
  )
}

Verification.getLayout = getLayout

export default Verification

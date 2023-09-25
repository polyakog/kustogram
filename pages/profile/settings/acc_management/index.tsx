import { useState, useEffect } from 'react'

import {
  useCurrentSubscriptionQuery,
  usePaypalMutation,
  useStripeMutation,
} from 'assets/store/api/payments/paymentsApi'
import { PaymentsForm } from 'common/components/Forms/PaymentsForm/PaymentsForm'
import { TypeForm } from 'common/components/Forms/TypeForm/TypeForm'
import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import Modal from 'common/components/Modals/ModalPublic/Modal'
import { useClient } from 'common/hooks/useClients'
import { dateParser } from 'common/utils/dateParser'
import { SettingsPageWrapper } from 'features/settings/SettingsPageWrapper'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import paypal from 'public/img/icons/paypal-svgrepo-com.svg'
import stripe from 'public/img/icons/stripe-svgrepo-com.svg'
import { useTranslation } from 'react-i18next'
import {
  AccountType,
  AutoRenewal,
  AutoRenewalWrapper,
  CheckBox,
  CheckBoxWrapper,
  CurrentSubscription,
  Date,
  ExpireWrapper,
  ModalBtn,
  NextPayments,
  PageWrapper,
  PayPal,
  PaymentsSection,
  Section,
  Stripe,
  SubscriptionCost,
  SubscriptionsHeading,
  SubscriptionsWrapper,
  Text,
  Wrapper,
} from 'styles/styledComponents/acc_management/acc_management.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const AccountManagement = () => {
  const { t, i18n } = useTranslation()
  const client = useClient()
  const { asPath, push } = useRouter()

  const { language } = i18n

  const [sendStripeRequest] = useStripeMutation()
  const [sendPaypalRequest] = usePaypalMutation()
  const { data: currentSubscriptions } = useCurrentSubscriptionQuery()

  const [isBusiness, setIsBusiness] = useState(false)
  const [selectedId, setSelectedId] = useState('1')
  const [selectedAccType, setSelectedAccType] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [expireAt, setExpiteAt] = useState('')
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isAutoRenewal, setIsAutoReneval] = useState(false)

  useEffect(() => {
    if (asPath.includes('success')) {
      setIsSuccess(true)
    }
    if (asPath.includes('error')) {
      setIsError(true)
    }
  }, [asPath])

  useEffect(() => {
    if (currentSubscriptions) {
      setExpiteAt(dateParser(currentSubscriptions?.expireAt))
    }
  }, [expireAt, currentSubscriptions])

  useEffect(() => {
    if (currentSubscriptions) {
      setSelectedAccType(t('business'))
      setIsBusiness(true)
    }
  }, [currentSubscriptions])

  const sendPaymentRequest = (paymentType: string): void => {
    const data = [
      {
        productId: selectedId,
        quantity: 1,
      },
    ]

    if (paymentType === 'stripe') {
      sendStripeRequest(data)
        .unwrap()
        .then(res => push(res.url))
    } else {
      sendPaypalRequest(data)
        .unwrap()
        .then(res => push(res.url))
    }
  }

  const handleCrossClick = () => {
    setIsError(false)
    setIsSuccess(false)
    push(asPath.split('?')[0])
  }

  const handleModalClose = () => {
    setIsError(false)
    setIsSuccess(false)
    push(asPath.split('?')[0])
  }

  return (
    client && (
      <SettingsPageWrapper>
        {isError && (
          <Modal
            bodyText={t('transaction_error')}
            handleCrossClick={handleCrossClick}
            handleModalClose={handleModalClose}
            height={language === 'en' ? '200px' : '240px'}
            title={t('error_modal')}
            width="360px"
          >
            <ModalBtn type="button" onClick={handleModalClose}>
              {t('error_btn')}
            </ModalBtn>
          </Modal>
        )}
        {isSuccess && (
          <Modal
            bodyText={t('transaction_success')}
            handleCrossClick={handleCrossClick}
            handleModalClose={handleModalClose}
            height="200px"
            title={t('success_modal')}
          >
            <ModalBtn type="button" onClick={handleModalClose}>
              {t('success_btn')}
            </ModalBtn>
          </Modal>
        )}
        <PageWrapper>
          {currentSubscriptions && (
            <Section>
              <CurrentSubscription>{t('current_subscription')}</CurrentSubscription>
              <SubscriptionsWrapper>
                <Wrapper key={expireAt}>
                  <ExpireWrapper>
                    <SubscriptionsHeading>{t('expire_at')}</SubscriptionsHeading>
                    <Date>{expireAt}</Date>
                  </ExpireWrapper>
                  <NextPayments>
                    <SubscriptionsHeading>{t('next_payment')}</SubscriptionsHeading>
                    <NextPayments>{isAutoRenewal ? expireAt : '-'}</NextPayments>
                  </NextPayments>
                </Wrapper>
              </SubscriptionsWrapper>
              <AutoRenewalWrapper>
                <CheckBoxWrapper>
                  <CheckBox
                    checked={isAutoRenewal}
                    type="checkbox"
                    onChange={() => setIsAutoReneval(prev => !prev)}
                  />
                </CheckBoxWrapper>
                <AutoRenewal>{t('auto_renewal')}</AutoRenewal>
              </AutoRenewalWrapper>
            </Section>
          )}
          <Section>
            <AccountType>{t('account_type')}</AccountType>
            <TypeForm
              selectedAccType={selectedAccType || t('personal')}
              setIsBusiness={setIsBusiness}
              setSelectedAccType={setSelectedAccType}
              t={t}
            />
          </Section>
          {isBusiness ? (
            <>
              <Section>
                <SubscriptionCost>{t('your_subscription_costs')}</SubscriptionCost>
                <PaymentsForm
                  selectedPayment={selectedPayment || t('2_1_Day')}
                  setSelectedId={setSelectedId}
                  setSelectedPayment={setSelectedPayment}
                  t={t}
                />
              </Section>
              <PaymentsSection>
                <PayPal alt="paypal" src={paypal} onClick={() => sendPaymentRequest('paypal')} />
                <Text>{t('or')}</Text>
                <Stripe alt="stripe" src={stripe} onClick={() => sendPaymentRequest('stripe')} />
              </PaymentsSection>
            </>
          ) : null}
        </PageWrapper>
      </SettingsPageWrapper>
    )
  )
}

AccountManagement.getLayout = getLayout
export default AccountManagement

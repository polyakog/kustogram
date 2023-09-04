import React, { useState } from 'react'

import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import paypal from 'public/img/icons/paypal-svgrepo-com.svg'
import stripe from 'public/img/icons/stripe-svgrepo-com.svg'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'

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

const AccountManagement = () => {
  const { t } = useTranslation()

  const payments = [t('10_1_Day'), t('50_7_Day'), t('100_month')]
  const accountType = [t('personal'), t('business')]

  const [accountTypeChecked, setAccountTypeChecked] = useState([true, false])
  const [paymentChecked, setPaymentChecked] = useState([true, false, false])

  const selectAccountType = (ind: number) => {
    setAccountTypeChecked(accountTypeChecked =>
      accountTypeChecked.map((item, index) => {
        if (ind === index) {
          item = true
        } else {
          item = false
        }

        return item
      })
    )
  }

  const selectPayment = (ind: number) => {
    setPaymentChecked(paymentChecked =>
      paymentChecked.map((item, index) => {
        if (index === ind) {
          item = true
        } else {
          item = false
        }

        return item
      })
    )
  }

  return (
    <SettingsPageWrapper>
      <PageWrapper>
        <Section>
          <AccountType>{t('account_type')}</AccountType>
          <TypeForm>
            {accountType.map((type, index) => (
              <LabelType key={type}>
                <Type
                  checked={accountTypeChecked[index]}
                  onChange={() => selectAccountType(index)}
                />
                <Text>{type}</Text>
              </LabelType>
            ))}
          </TypeForm>
        </Section>
        {accountTypeChecked[1] && (
          <>
            <Section>
              <SubscriptionCost>{t('your_subscription_costs')}</SubscriptionCost>
              <PaymentsForm>
                {payments.map((payment, index) => (
                  <PaymentsLabel key={payment}>
                    <Payment
                      checked={paymentChecked[index]}
                      onChange={() => selectPayment(index)}
                    />
                    <Text>{payment}</Text>
                  </PaymentsLabel>
                ))}
              </PaymentsForm>
            </Section>
            <PaymentsSection>
              <PayPal alt="paypal" src={paypal} />
              <Text>{t('or')}</Text>
              <Stripe alt="stripe" src={stripe} />
            </PaymentsSection>
          </>
        )}
      </PageWrapper>
    </SettingsPageWrapper>
  )
}

AccountManagement.getLayout = getLayout
export default AccountManagement

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const Section = styled.section``

const TypeForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`

const PaymentsForm = styled(TypeForm)``

const AccountType = styled.h2`
  color: white;
  margin-bottom: 6px;
`

const Text = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
`

const Type = styled.input.attrs({
  type: 'radio',
  name: 'type',
})`
  &:checked {
    accent-color: black;
  }
`

const LabelType = styled.label.attrs({
  htmlFor: 'type',
})`
  margin-right: 12px;
`

const PaymentsLabel = styled.label.attrs({
  htmlFor: 'payments',
})`
  margin-right: 12px;
`

const Payment = styled.input.attrs({
  type: 'radio',
  name: 'paymenys',
})`
  &:checked {
    accent-color: black;
  }
`

const PaymentsSection = styled.section`
  align-self: flex-end;
  display: flex;
  gap: 54px;
  align-items: center;
`

const PayPal = styled(Image)`
  cursor: pointer;
`

const Stripe = styled(PayPal)``

const SubscriptionCost = styled(AccountType)``

import { usePaymentsQuery } from 'assets/store/api/payments/paymentsApi'
import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import { useClient } from 'common/hooks/useClients'
import { convertCentsToDollars } from 'common/utils/convertCentsToDollars'
import { dateParser } from 'common/utils/dateParser'
import { getSubscriptionType } from 'common/utils/getSubscriptionType'
import { TabBar } from 'features/settings/TabBar'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}
const Payments = () => {
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const client = useClient()

  const { data: payments } = usePaymentsQuery()

  const tableHeadingData = [
    t('date_of_payment'),
    t('end_of_subscription'),
    t('price'),
    t('subscription_type'),
    t('payment_type'),
  ]

  return (
    client && (
      <>
        <TabBarWrapper>
          <TabBar />
        </TabBarWrapper>
        <PageWrapper>
          <Table>
            <TableHeading>
              {tableHeadingData.map((name, index) => (
                <HeadingText key={name} style={{ paddingLeft: index === 0 ? '24px' : '0' }}>
                  {name}
                </HeadingText>
              ))}
            </TableHeading>
            {payments?.items.map(payment => (
              <TableRow key={payment.dateOfPayments}>
                <Cell style={{ paddingLeft: '24px' }}>{dateParser(payment.dateOfPayments)}</Cell>
                <Cell>{dateParser(payment.endDateOfSubscription)}</Cell>
                <Cell>{convertCentsToDollars(payment.price)}</Cell>
                <Cell>{getSubscriptionType(payment.price, language)}</Cell>
                <Cell>{payment.paymentType}</Cell>
              </TableRow>
            ))}
          </Table>
        </PageWrapper>
      </>
    )
  )
}

Payments.getLayout = getLayout
export default Payments

export const Table = styled.table`
  border-collapse: collapse;
  padding: 0 24px;
`

export const TabBarWrapper = styled.div`
  max-width: 726px;
  width: 100%;
  padding: 36px 0 24px;
`

export const HeadingText = styled.td`
  padding: 12px 0;
  font-weight: 600;
`

export const TableHeading = styled.tr`
  padding: 12px 0;
  background: #171717;
`
export const TableRow = styled.tr`
  padding: 12px 0;
`

export const Cell = styled.td`
  min-width: 60px;
  padding: 12px 0;
  font-weight: 400;
`

export const PageWrapper = styled.div`
  display: flex;
  margin: 0 6% 0 12px;
  max-width: 1027px;
  display: flex;
  flex-direction: column;
  min-height: 76vh;
`

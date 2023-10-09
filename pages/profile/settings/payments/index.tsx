import { useEffect, useState } from 'react'

import { useLazyPaymentsQuery } from 'assets/store/api/payments/paymentsApi'
import { getLayout } from 'common/components/Layout/PageLayout/PageLayout'
import PaymentsTable from 'common/components/Table/Table'
import { useClient } from 'common/hooks/useClients'
import PagesNavigation from 'features/settings/Pagination'
import { TabBar } from 'features/settings/TabBar'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'
import { PageWrapper, TabBarWrapper } from 'styles/styledComponents/payments/payments.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}
const Payments = () => {
  const initialPageSize = 10

  const { t, i18n } = useTranslation()
  const { language } = i18n

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [getPayments, { data: payments }] = useLazyPaymentsQuery()
  const client = useClient()

  useEffect(() => {
    getPayments({ page, pageSize })
  }, [page, pageSize])

  return (
    client && (
      <>
        <TabBarWrapper>
          <TabBar />
        </TabBarWrapper>
        <PageWrapper>
          <PaymentsTable language={language} payments={payments} t={t} />
          {payments && (
            <PagesNavigation
              pageNumber={payments.page}
              pagesCount={payments.pagesCount}
              pageSize={pageSize}
              t={t}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </PageWrapper>
      </>
    )
  )
}

Payments.getLayout = getLayout
export default Payments

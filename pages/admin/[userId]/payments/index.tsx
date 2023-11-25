import { useState } from 'react'

import { useQuery } from '@apollo/client'
import { GET_USER_IMAGES, GET_USER_PAYMENTS } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import PaymentsTable from 'common/components/Table/Table'
import { adminUserTabData } from 'common/utils/adminUserTabData'
import UserInfo from 'features/admin/UserInfo/UserInfo'
import PagesNavigation from 'features/settings/Pagination'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context
  const { userId } = params || {}

  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['admin', 'common', 'nav_bar', 'post_cr'],
        config
      )),
      userId,
    },
  }
}

type propsType = {
  userId: string
}

const AdminUserPayments = ({ userId }: propsType) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // запрос данных с сервера через GraphQL
  const {
    loading,
    error,
    data: userPayments,
  } = useQuery(GET_USER_PAYMENTS, {
    variables: { id: userId },
  })

  if (error) {
    console.log(error)
  }

  const { t, i18n } = useTranslation()
  const { language } = i18n

  // Базовый URL для вкладок
  const baseUrl = `/admin/${userId}`

  // разбивка платежей на страницы
  let payments

  const allUserPayments = userPayments?.user?.payments

  if (allUserPayments) {
    const totalCount = allUserPayments.length
    const pagesCount = Math.ceil(totalCount / pageSize)

    const startItem = (page - 1) * pageSize
    const endItem = startItem + pageSize

    const partUserPayments = allUserPayments.slice(startItem, endItem)

    // формирование объекта payments в соответствии с типизацией компонента PaymentsTable
    payments = {
      items: partUserPayments,
      page,
      pageSize,
      pagesCount,
      totalCount,
    }
  }

  const onPageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1)
  }

  return (
    <>
      <UserInfo userId={userId} />
      <TabBar baseUrl={baseUrl} t={t} titleList={adminUserTabData} />
      {payments?.items && (
        <StyledTable>
          <PaymentsTable language={language} payments={payments} t={t} />
          {payments && (
            <PagesNavigation
              pageNumber={payments.page}
              pagesCount={payments.pagesCount}
              pageSize={payments.pageSize}
              t={t}
              onPageChange={setPage}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </StyledTable>
      )}
    </>
  )
}

AdminUserPayments.getLayout = getLayout
export default AdminUserPayments

const StyledTable = styled.div`
  width: 100%;
  display: flex;
  max-width: 1027px;
  flex-direction: column;
  min-height: 76vh;
`

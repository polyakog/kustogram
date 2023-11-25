import { useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminLayout'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { useTranslation } from 'react-i18next'

import { GET_ALL_PAYMENTS, GET_TOTAL_COUNT_PAYMENTS } from '../../../assets/apollo/users'
import { UniversalTable } from '../../../common/components/Table/UniversalTable/UniversalTable'
import { useClient } from '../../../common/hooks/useClients'
import { useDebounce } from '../../../common/hooks/useDebounce'
import {
  SearchAdmin,
  SearchBarAdmin,
  SearchIconAdmin,
  WrapperAdmin,
} from '../../../features/admin/Admin.styled'
import PagesNavigation from '../../../features/settings/Pagination'
import search from '../../../public/img/icons/search.svg'
import {
  FormatDataTableType,
  TableHeaderType,
} from '../../../common/components/Table/UniversalTable/types'
import {
  CheckBoxPay,
  CheckBoxPayWrapper,
  CheckBoxTitle,
} from '../../../common/components/Table/UniversalTable/UniversalTable.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const PaymentsAdmin = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const client = useClient()

  const getSearchValue = () => {
    return inputRef.current?.value
  }
  const initialPageSize = 10
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [isAutoubdate, setIsAutoubdate] = useState(false)

  const [getCountPayments, { data: countPayments }] = useLazyQuery(GET_TOTAL_COUNT_PAYMENTS, {
    variables: {
      sortBy,
      sortDirection,
      pageNumber: page,
      pageSize,
      searchName: getSearchValue() || '',
    },
  })

  const pagesCount = countPayments ? Math.ceil(countPayments.totalCountPayments / 10) : 0

  const [getPayments, { data: payments }] = useLazyQuery(GET_ALL_PAYMENTS, {
    variables: {
      sortBy,
      sortDirection,
      pageNumber: page,
      pageSize,
      searchName: '',
    },
  })

  const formatTableData: FormatDataTableType[] | undefined = payments?.allPayments.map(payment => ({
    createdAt: payment.createdAt,
    endDateOfSubscription: payment.endDateOfSubscription,
    paymentStatus: payment.paymentStatus,
    paymentSystem: payment.paymentSystem,
    paymentsId: payment.paymentsId,
    price: payment.price,
    subscriptionType: payment.subscriptionType,
    updatedAt: payment.updatedAt,
    login: payment.user?.profiles?.login ? payment.user.profiles.login : '',
    photo: payment.user?.profiles?.photo ? payment.user.profiles.photo : '',
  }))

  const tableHeadingData: TableHeaderType[] = [
    { tableTitle: 'Username', back: '', sort: false, text: 'login', avatar: 'photo' },
    { tableTitle: 'Date Added', back: 'createdAt', sort: true },
    { tableTitle: 'Amount, $', back: 'price', sort: true },
    { tableTitle: 'Subscription', back: 'subscriptionType', sort: true },
    { tableTitle: 'Payment Method', back: 'paymentSystem', sort: true },
  ]

  const debouncedSearch = useDebounce(getPayments, 500)

  useEffect(() => {
    getCountPayments()
    getPayments()
  }, [])

  useEffect(() => {
    const input = document.getElementById('search')

    input?.addEventListener('keydown', debouncedSearch)

    return () => input?.removeEventListener('keydown', debouncedSearch)
  }, [getSearchValue])

  const selectedSort = (sortType: string): void => {
    setSortBy(sortType)

    if (sortDirection === 'desc') {
      setSortDirection('asc')
    } else {
      setSortDirection('desc')
    }
  }

  return (
    <>
      {client && (
        <>
          <CheckBoxPayWrapper>
            <CheckBoxPay
              checked={isAutoubdate}
              type="checkbox"
              onChange={() => {
                setIsAutoubdate(prev => !prev)
              }}
            />
            <CheckBoxTitle>Autoubdate</CheckBoxTitle>
          </CheckBoxPayWrapper>
          {isAutoubdate && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                color: 'red',
                fontSize: '20px',
              }}
            >
              Надо сделать АВТОАБДЕЙТ
            </div>
          )}

          <WrapperAdmin>
            <SearchBarAdmin>
              <SearchIconAdmin alt="search" src={search} />
              <SearchAdmin ref={inputRef} />
            </SearchBarAdmin>
          </WrapperAdmin>
          <UniversalTable
            formatTableData={payments?.allPayments ? formatTableData : []}
            selectedSort={selectedSort}
            tableHeadingData={tableHeadingData}
          />
          {payments && (
            <PagesNavigation
              pageNumber={page}
              pagesCount={pagesCount}
              pageSize={pageSize}
              t={t}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </>
      )}
    </>
  )
}

export default PaymentsAdmin
PaymentsAdmin.getLayout = getLayout

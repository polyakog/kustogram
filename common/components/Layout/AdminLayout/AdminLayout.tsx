import { PropsWithChildren, ReactElement } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdminLogin } from 'common/components/AdminLogin/AdminLogin'
import { AdminNavbar } from 'common/components/AdminNavbar/AdminNavbar'
import Header from 'common/components/Header/Header'
import { useClient } from 'common/hooks/useClients'
import { useIsAdmin } from 'common/hooks/useIsAdmin'
import { NextPage } from 'next'

import { Main, Page, StyledWrapper } from '../../AdminLogin/AdminLogin.styled'

export const AdminLayout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props
  const isAdmin = useIsAdmin()
  const client = useClient()

  return isAdmin && client ? (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Page>
          <Header isAdmin />
          <AdminNavbar />
          <Main>{children}</Main>
        </Page>
      </LocalizationProvider>
    </StyledWrapper>
  ) : (
    <AdminLogin />
  )
}

export const getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

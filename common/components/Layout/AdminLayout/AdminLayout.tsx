import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'
import Header from 'common/components/Header/Header'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'
import { AdminNavbar } from 'common/components/AdminNavbar/AdminNavbar'

export const AdminLayout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  return (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Page>
          <Header isAdmin />
          <AdminNavbar />
          <Main>{children}</Main>
        </Page>
      </LocalizationProvider>
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export const Main = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-left: 220px;
  padding: 20px;
`

const Page = styled.div`
  display: flex;
  max-width: 1310px;
  width: 100%;
  height: 3000px;
`

const StyledWrapper = styled.div`
  margin: 0 auto;

  width: 100%;
  min-height: 100vh;
  max-width: 1310px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark['700']};
  color: ${baseTheme.colors.light[100]};
`

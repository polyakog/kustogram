import { PropsWithChildren, ReactElement } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdminNavbar } from 'common/components/AdminNavbar/AdminNavbar'
import Header from 'common/components/Header/Header'
import { NextPage } from 'next'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

export const AdminUserLayout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  return (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Page>
          <Header isAdmin />
          <Main>{children}</Main>
        </Page>
      </LocalizationProvider>
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <AdminUserLayout>{page}</AdminUserLayout>
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

import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import styled from 'styled-components'

import { baseTheme } from '../../../styles/styledComponents/theme'
import Header from '../Header/Header'

export const Layout: NextPage<PropsWithChildren> = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  return (
    <StyledWrapper>
      <Header />
      <Main>{children}</Main>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark['700']};
  color: ${baseTheme.colors.light[100]};
`

const Main = styled.div``

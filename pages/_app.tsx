/* eslint-disable import/order */
import React, { ReactElement, ReactNode } from 'react'

import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { store } from '../assets/store/store'
import { useLoader } from '../common/hooks/useLoader'

import 'styles/nprogress.css'
import { LocalizationProvider } from '@mui/x-date-pickers' // for mui calendar
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs' // for mui calendar

// import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute'

export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  useLoader()

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <Provider store={store}>
      <PrivateRoute>
        {getLayout(
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        )}
      </PrivateRoute>
    </Provider>
  )
}

export default appWithTranslation(App as React.FC)

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  html{
    height:100vh;
    background:black;
    &::-webkit-scrollbar {
  width: 10px;
  }
  &::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
}

&::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
  border-radius: 10px;
  background-color: black;
}
  }
`

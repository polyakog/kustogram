import React, { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { store } from '../assets/store/store'
import { useLoader } from '../common/hooks/useLoader'

import 'styles/nprogress.css'

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

  return getLayout(
    <Provider store={store}>
      <GlobalStyle />
      {/* <PrivateRoute> */}
      <Component {...pageProps} />
      {/* </PrivateRoute> */}
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
`

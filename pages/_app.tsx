import type {AppProps} from 'next/app';
import {ReactElement, ReactNode, useState} from 'react';
import {NextPage} from 'next';
import {useLoader} from 'assets/hooks/useLoader';
import 'styles/nprogress.css'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { appWithTranslation } from 'next-i18next'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({Component, pageProps}: AppPropsWithLayout) => {

useLoader()

  const getLayout = Component.getLayout ?? ((page) => page);

return getLayout(
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);
}

export default appWithTranslation(App as React.FC)

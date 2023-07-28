import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { useLoader } from "../common/hooks/useLoader";
import "styles/nprogress.css";
import { Provider } from "react-redux";
import { store } from "../assets/store/store";
import { appWithTranslation } from "next-i18next";
import { createGlobalStyle } from "styled-components";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps: {session, ...pageProps} }: AppPropsWithLayout) => {
  useLoader();

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App as React.FC);

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

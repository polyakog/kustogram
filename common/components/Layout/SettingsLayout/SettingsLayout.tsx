import { NextPage } from "next";
import { PropsWithChildren, ReactElement } from "react";
import Header from "../../Header/Header";
import styled from "styled-components";
import { baseTheme } from "../../../../styles/styledComponents/theme";
import { store } from "../../../../assets/store/store";
import { Provider } from "react-redux";

export const SettingsLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <StyledWrapper>
      <Provider store={store}>
        <Header />
        <Page>{children}</Page>
      </Provider>
    </StyledWrapper>
  );
};

export const getLayout = (page: ReactElement) => {
  return <SettingsLayout>{page}</SettingsLayout>;
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${baseTheme.colors.dark["700"]};
  color: ${baseTheme.colors.light[100]};
`;

const Page = styled.div`
  max-width: 1310px;
  width: 100%;
  padding: 0 15px;
  margin: auto;
`;

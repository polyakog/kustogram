import { NextPage } from "next";
import { PropsWithChildren, ReactElement } from "react";
import Header from "../../Header/Header";
import { Navbar } from "../../Navbar/Navbar";
import styled from "styled-components";
import { baseTheme } from "../../../../styles/styledComponents/theme";
import { store } from "../../../../assets/store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { mediaSizes } from "common/constants/Profile/mediaSizes";

const media = mediaSizes.media;

export const PageLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { profile } = router.query;
  return (
    <StyledWrapper>
      {/*__________<Provider store={store}>_______*/}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Page>
          {/*______<Navbar/>________*/}
          <NavbarWrapper>
            <Navbar showNavbar={profile} />
          </NavbarWrapper>
          <Main>{children}</Main>
        </Page>
        {/*__________</Provider>_______*/}
      </LocalizationProvider>
    </StyledWrapper>
  );
};

export const getLayout = (page: ReactElement) => {
  return <PageLayout>{page}</PageLayout>;
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  background: ${baseTheme.colors.dark["700"]};
  color: ${baseTheme.colors.light[100]};
`;

const Page = styled.div`
  display: flex;
  max-width: 1310px;
  width: 100%;
  gap: 72px;

  padding: 0 10px;
  margin: auto;
`;

export const Main = styled.div`
  padding-top: 36px;
  padding-left: 26px;
  flex-grow: 1;
`;

export const NavbarWrapper = styled.div`
  height: 660px;
  width: 17vw;
  min-width: 150px;
  max-width: 220px;
  align-items: start;
  font-family: Inter;

  @media (max-width: ${media}) {
    display: none;
  }
`;

import { NextPage } from "next";
import { PropsWithChildren, ReactElement, useState } from "react";
import Header from "../../Header/Header";
import { Navbar } from "../../Navbar/Navbar";
import styled from "styled-components";
import { baseTheme } from "../../../../styles/styledComponents/theme";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import { CreatePost } from "common/components/Navbar/CreatePost/CreatePost";

const media = mediaSizes.media;
const sidebar = mediaSizes.sidebarMedia;

export const PageLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { profile } = router.query;

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsOpenModalEdit(true);
  };

  return (
    <StyledWrapper>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Page>
          <CreatePost isOpenModalEdit={isOpenModalEdit} setIsOpenModalEdit={setIsOpenModalEdit} />
          <NavbarWrapper>
            <Navbar showNavbar={profile} openModalHandler={openModalHandler} />
          </NavbarWrapper>
          <Main>{children}</Main>
        </Page>
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

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark["700"]};
  color: ${baseTheme.colors.light[100]};
`;

const Page = styled.div`
  display: flex;
  max-width: 1310px;
  width: 100%;
  /* gap: 16px; */

  padding: 0 0px;
  /* margin: auto; */
`;

export const Main = styled.div`
  /* padding-top: 36px; */
  padding-left: 0px;
  flex-grow: 1;
  max-width: 80vw;

  @media (max-width: ${"1400px"}) {
    padding-left: 0px;
  }
`;

export const NavbarWrapper = styled.div`
  height: 660px;
  width: 220px;
  /* min-width: 150px; */
  max-width: 220px;
  align-items: start;
  font-family: Inter;

  @media (max-width: ${media}) {
    display: none;
  }
`;

import { ReactNode } from "react";
import { TabBar } from "./TabBar";
import styled from "styled-components";
import { Navbar } from "../../common/components/Navbar/Navbar";
import { StyleProps } from "./types";
import { useRouter } from "next/router";

type SettingsPageWrapperType = {
  children: ReactNode;
};

export const SettingsPageWrapper = ({ children }: SettingsPageWrapperType) => {
  const router = useRouter();
  const { profile } = router.query;

  return (
    <SettingsWrapper isVisit={!profile}>
      <NavbarWrapper isVisit={!profile}>{!profile && <Navbar />}</NavbarWrapper>
      <StyledContainerSettings>
        <TabBar />
        <StyledContent>{children}</StyledContent>
      </StyledContainerSettings>
    </SettingsWrapper>
  );
};

const SettingsWrapper = styled.div<StyleProps>`
  min-height: 90vh;
  display: flex;
  gap: 24px;

  @media (max-width: 1000px) {
    justify-content: ${(props) => (props.isVisit ? "inherit" : "center")};
  }
`;

const NavbarWrapper = styled.div<StyleProps>`
  height: 660px;
  width: 17vw;
  min-width: ${(props) => (props.isVisit ? "150px" : "0px")};
  max-width: 220px;
  align-items: start;

  @media (max-width: 1000px) {
    display: ${(props) => (props.isVisit ? "block" : "none")};
  }
  @media (max-width: 790px) {
    display: none;
  }
`;

const StyledContainerSettings = styled.div`
  max-width: 726px;
  width: 100%;
  padding-top: 36px;
`;

const StyledContent = styled.div`
  margin-top: 25px;
`;

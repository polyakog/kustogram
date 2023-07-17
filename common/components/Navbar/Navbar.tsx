import React from "react";
import styled from "styled-components";
import { ITEM_LINK } from "./constant";
import { MainLink } from "../MainLink/MainLink";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { LogoutLink } from "../LogoutLink/logoutLink";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const location = usePathname();
  const isActive = (name: string) => location === name;

  const items = ITEM_LINK.map((item) => (
    <MainLink
      key={item.name}
      src={isActive(item.href) ? item.selectIcon : item.icon}
      name={item.name}
      href={item.href}
      isActive={isActive(item.href)}
    />
  ));

  return (
    <StyledSidebar>
      <StyledItemBlock>{items}</StyledItemBlock>
      <StyledLogout>
        <LogoutLink />
      </StyledLogout>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  position: relative;
  max-width: 220px;
  min-width: 160px;
  height: 660px;
  width: 17vw;
  border-right: 1px solid ${baseTheme.colors.dark[300]};
`;

const StyledItemBlock = styled.div`
  margin-left: 45px;
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  > * {
    &:last-child {
      margin-top: 84px;
    }
  }

  @media (max-width: 940px) {
    margin-left: 20px;
  }
`;

const StyledLogout = styled.div`
  position: absolute;
  bottom: 36px;
  left: 45px;

  @media (max-width: 940px) {
    left: 20px;
  }
`;

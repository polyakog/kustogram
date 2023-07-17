import React from "react";
import styled from "styled-components";
import { baseTheme } from "../../styles/styledComponents/theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabBar = () => {
  const location = usePathname();
  const linkClass = (name: string) => (location.includes(name) ? "active" : "");
  return (
    <StyledNavigation>
      <StyledItem
        href={"/profile/settings"}
        className={location === "/profile/settings" ? "active" : ""}
      >
        General information
      </StyledItem>
      <StyledItem href={"/profile/settings/devices"} className={linkClass("devices")}>
        Devices
      </StyledItem>
      <StyledItem href={"/profile/settings/acc_management"} className={linkClass("acc_management")}>
        Account Management
      </StyledItem>
      <StyledItem href={"/profile/settings/payments"} className={linkClass("payments")}>
        My payments
      </StyledItem>
    </StyledNavigation>
  );
};

const StyledNavigation = styled.header`
  transition: all;
  width: 100%;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledItem = styled(Link)`
  display: inline-block;
  width: 100%;
  max-width: 726px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${baseTheme.colors.dark[100]};
  text-align: center;
  white-space: nowrap;

  padding: 5px 15px;
  border-bottom: 2px solid ${baseTheme.colors.dark[100]};

  &:hover {
    color: ${baseTheme.colors.dark[300]};
    border-bottom: 2px solid ${baseTheme.colors.dark[300]};
  }

  &.active {
    color: ${baseTheme.colors.accent[500]};
    border-bottom: 2px solid ${baseTheme.colors.accent[500]};
  }
`;

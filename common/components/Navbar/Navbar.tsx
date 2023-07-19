import React from "react";
import { ITEM_LINK } from "./constant";
import { usePathname } from "next/navigation";
import { MainLink } from "./MainLink/MainLink";
import { StyledItemBlock, StyledLogout, StyledSidebar } from "./Navbar.styled";
import { LogoutLink } from "./LogoutLink/logoutLink";

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

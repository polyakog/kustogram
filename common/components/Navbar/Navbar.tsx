import React from "react";
import { ITEM_LINK } from "./constant";
import { usePathname } from "next/navigation";
import { MainLink } from "./MainLink/MainLink";
import {
  StyledCreate,
  StyledDiv,
  StyledItemBlock,
  StyledLogout,
  StyledSidebar
} from "./Navbar.styled";
import { LogoutLink } from "./LogoutLink/logoutLink";
import { CreatePost } from "./CreatePost/CreatePost";
import { AppLink } from "./AppLink/AppLink";
import Image from "next/image";

export type NavbarPropsType = {
  showNavbar: string | string[] | undefined;
  openModalHandler: () => void;
};
export const Navbar = ({ showNavbar, openModalHandler }: NavbarPropsType) => {
  const location = usePathname();
  const isActive = (name: string) => (location === name ? "active" : "");

  const items = ITEM_LINK.map((item) => (
    <MainLink
      key={item.name}
      src={isActive(item.href) ? item.selectIcon : item.icon}
      name={item.name}
      href={item.href}
      isactive={isActive(item.href)}
    />
  ));

  return (
    <>
      <StyledSidebar showNavbar={showNavbar}>
        <StyledCreate onClick={openModalHandler}>
          <StyledDiv style={{ cursor: "pointer" }}>
            <Image src={"/img/icons/plus-square.svg"} alt={"CreatePost"} width={24} height={24} />
            <p>Create</p>
          </StyledDiv>
        </StyledCreate>
        <StyledItemBlock>{items}</StyledItemBlock>
        <StyledLogout>
          <LogoutLink />
        </StyledLogout>
      </StyledSidebar>
    </>
  );
};

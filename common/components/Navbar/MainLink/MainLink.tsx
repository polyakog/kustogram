import { FC } from "react";
import Image from "next/image";
import { AppLink } from "../AppLink/AppLink";
import { StyledDiv, StyledText } from "../Navbar.styled";

interface SidebarLinkProps {
  src: string;
  name: string;
  href: string;
  isactive: string;
}

export const MainLink: FC<SidebarLinkProps> = ({ name, src, href, isactive }) => {
  return (
    <AppLink href={href}>
      <StyledDiv>
        {src ? (
          <Image src={src} alt={"some icon"} width={24} height={24} />
        ) : (
          <div style={{ width: "24px", height: "24px" }}></div>
        )}{" "}
        <StyledText isactive={isactive}>{name}</StyledText>
      </StyledDiv>
    </AppLink>
  );
};

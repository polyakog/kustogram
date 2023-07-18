import { FC } from "react";
import Image from "next/image";
import { AppLink } from "../AppLink/AppLink";
import { StyledDiv, StyledText } from "../Navbar.styled";

interface SidebarLinkProps {
  className?: string;
  src: string;
  name: string;
  href: string;
  isActive: boolean;
}

export const MainLink: FC<SidebarLinkProps> = ({ name, src, href, isActive }) => {
  return (
    <AppLink href={href}>
      {/*<StyledDiv className={classNames('', {}, [className])}>*/}
      <StyledDiv>
        <Image src={src} alt={"some icon"} width={24} height={24} />
        <StyledText isActive={isActive}>{name}</StyledText>
      </StyledDiv>
    </AppLink>
  );
};

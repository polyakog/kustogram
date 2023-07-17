import { FC } from "react";
import Image from "next/image";
import styled from "styled-components";
import classNames from "../../../assets/lib/classNames/classNames";
import { AppLink } from "../AppLink/AppLink";
import { baseTheme } from "../../../styles/styledComponents/theme";

interface SidebarLinkProps {
  className?: string;
  src: string;
  name: string;
  href: string;
  isActive: boolean;
}

export const MainLink: FC<SidebarLinkProps> = ({ className, name, src, href, isActive }) => {
  return (
    <AppLink href={href}>
      <StyledDiv className={classNames("", {}, [className])}>
        <Image src={src} alt={"some icon"} width={24} height={24} />
        <Text isActive={isActive}>{name}</Text>
      </StyledDiv>
    </AppLink>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? 700 : 500)};
  line-height: 24px;
  color: ${(props) =>
    props.isActive ? baseTheme.colors.accent[500] : baseTheme.colors.light[100]};
`;

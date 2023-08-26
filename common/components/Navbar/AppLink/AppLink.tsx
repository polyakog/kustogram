import { FC, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import styled from "styled-components";
import { baseTheme } from "../../../../styles/styledComponents/theme";

export enum ThemeAppLink {
  PRIMARY = "primary"
}

interface AppLinkProps extends LinkProps {
  theme?: ThemeAppLink;
  children: ReactNode;
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { href, children, ...otherProps } = props;

  return (
    <StyledLink href={href} {...otherProps}>
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;

  // &:visited{
  //   color: ${baseTheme.colors.accent["500"]};
  // }
`;
